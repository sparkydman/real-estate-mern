import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import morgan from 'morgan';

import property from './routes/property';
import review from './routes/review';
import user from './routes/user';
import dm from './routes/dm';

import errorHandler from './middleware/error';
import { getme } from './middleware/auth';
// connect to db
mongoose
  .connect(config.get('MONGO_URI'), {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database connected...!'))
  .catch((err) => console.error(err));

//initialize express
const app = express();

// add express json middleware
app.use(express.json());

app.use(morgan('dev'));

app.use(getme);

app.use('/api/v1/property', property);
app.use('/api/v1/user', user);
app.use('/api/v1/review', review);
app.use('/api/v1/dm', dm);

app.use(errorHandler);

const PORT = config.get('PORT') || 5500;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
