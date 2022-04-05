const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose
    .connect(process.env.DB_URL, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected...'))
    .catch((err) => console.log('DB connection error: ', err));
};

module.exports = async () => {
  try {
    global.__MONGO_DB__ = connectDB();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
