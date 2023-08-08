const express = require('express');

const port = process.env.PORT || 14000;
const host = process.env.HOST || 'localhost';

const app = express();

app.use(express.static('out'));

app.listen(port, host, error => {
  if (error) throw error;
  console.log(`Server listening at ${host}:${port}.`);
});
