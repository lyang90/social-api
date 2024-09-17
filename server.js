const express = require('express');
const db = require('./connection');
const routes = require('./routes/api');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Social API server is running on port ${PORT}!`);
  });
});
