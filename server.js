const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const swaggerUI = require('swagger-ui-express');

const property = require('./routes/property.js');
const review = require('./routes/review.js');
const user = require('./routes/user.js');
const dm = require('./routes/dm.js');
const swaggerFile = require('./swagger-output.json');

const errorHandler = require('./middleware/error.js');
const { getme } = require('./middleware/auth.js');

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

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://real-estate-space.herokuapp.com'
        : 'http://localhost:3000',
  })
);

// add express json middleware
app.use(express.json());

app.use(morgan('dev'));

app.use(getme);

app.use('/api/v1/property', property);
app.use('/api/v1/user', user);
app.use('/api/v1/review', review);
app.use('/api/v1/dm', dm);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(errorHandler);

// const __dirname = path.resolve();

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
