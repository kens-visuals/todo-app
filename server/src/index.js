const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();
const port = 8080;

dotenv.config();

app.use(cors());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(express.json());
app.use(router);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose connected!');
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  });
