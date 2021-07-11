const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
// Artist Search
app.get('/api/server/:id', (req, res) => {
  axios
    .get('https://api.deezer.com/search/artist?q=' + req.params.id)
    .then((response) => res.send(response.data))
    .catch((err) => {
      res.send({ data: 'error' });
    });
});

// Artist Songs Top 5
app.get('/api/server/top/:id', (req, res) => {
  console.log('https://api.deezer.com/' + req.params.id + '/top');
  axios
    .get('https://api.deezer.com/artist/' + req.params.id + '/top')
    .then((response) => res.send(response.data))
    .catch((err) => {
      res.send({ data: 'error' });
    });
});

// Artist Albums list
app.get('/api/server/albums/:id', (req, res) => {
  console.log('https://api.deezer.com/' + req.params.id + '/top');
  axios
    .get('https://api.deezer.com/artist/' + req.params.id + '/albums')
    .then((response) => res.send(response.data))
    .catch((err) => {
      res.send({ data: 'error' });
    });
});

// App
app.listen(4000, (error) => {
  if (error) throw error;
  console.log('Server running');
});
