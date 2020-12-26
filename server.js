import express from 'express';
import dotenv from 'dotenv';

// load enviroment variables
dotenv.config({ path: './env.env' });

//initialize express
const app = express();

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
