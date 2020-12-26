import express from 'express';
import dotenv from 'dotenv';
import property from './routes/property';
import review from './routes/review';
import user from './routes/user';

// load enviroment variables
dotenv.config({ path: './env.env' });

//initialize express
const app = express();

// add express json middleware
app.use(express.json());

app.use('/api/v1/property', property);
app.use('/api/v1/user', user);
app.use('/api/v1/review', review);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
