import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import property from './routes/property.js';
import review from './routes/review.js';
import user from './routes/user.js';
import dm from './routes/dm.js';

import errorHandler from './middleware/error.js';
import { getme } from './middleware/auth.js';

dotenv.config();

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database connected...!'))
  .catch((err) => console.error(err));

//initialize express
const app = express();

app.use(cors());

// add express json middleware
app.use(express.json());

app.use(morgan('dev'));

app.use(getme);

app.use('/api/v1/property', property);
app.use('/api/v1/user', user);
app.use('/api/v1/review', review);
app.use('/api/v1/dm', dm);

app.use(errorHandler);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
