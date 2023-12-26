const mongoose = require('mongoose');
const webpush = require('web-push');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

const router = require('./router');

const app = express();
const port = 8080;

dotenv.config();

app.use(cors());
// app.use((error, req, res, next) => {
//   console.log(req.headers);

//   next();
// });
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(express.json());
app.use(router);

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'Hello World',
    body: 'This is your first push notification',
  });

  webpush.sendNotification(subscription, payload).catch(console.log);
});

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
