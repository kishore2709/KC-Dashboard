const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(express.static('dist'));

app.post('/api/users/register', jsonParser, (req, res) => {
  console.log(req.body);
  const { firstName, lastName, username, password } = req.body;
  console.log(firstName, lastName, username, password);
  res.status(200);
  res.send({ status: 'okkkkkkkkkk' });
  res.end();
});
app.post('/api/users/authenticate', jsonParser, (req, res) => {
  console.log(req.body);
  const user = {
    id: 'id',
    username: req.body.username,
    lastName: req.body.username,
  };
  const responseJson = {
    id: 'user.id',
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token: 'fake-jwt-token',
  };
  res.status(200);
  res.send(responseJson);
  res.end();
});

app.get('/api/status', (req, res) => {
  res.send('ok');
});
app.listen(8081, () => console.log('Listening on port 8081!'));
