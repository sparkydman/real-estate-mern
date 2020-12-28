import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import property from './routes/property';
import review from './routes/review';
import user from './routes/user';

import errorHandler from './middleware/error';

// connect to db
mongoose
  .connect(config.get('MONGO_URI'), {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database connected...!'))
  .catch((err) => console.err(err));

//initialize express
const app = express();

// add express json middleware
app.use(express.json());

app.use('/api/v1/property', property);
app.use('/api/v1/user', user);
app.use('/api/v1/review', review);

app.use(errorHandler);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
