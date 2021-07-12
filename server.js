const express = require('express');
const cors = require('cors');
const axios = require('axios').default;
const mongoose = require('mongoose');
const {
  queryKeyExists,
  deleteSearch,
  queryAllSearchKeys,
  createNewSearchTerm,
  querySearchTerm,
  updateSearch,
  getDate,
  updateDate,
} = require('./mongoDBconnect');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Deezer API Routes
app.get('/api/server/:id', (req, res) => {
  axios
    .get('https://api.deezer.com/search/artist?q=' + req.params.id)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.send({ data: 'error' });
    });
});

app.get('/api/server/top/:id', (req, res) => {
  axios
    .get('https://api.deezer.com/artist/' + req.params.id + '/top')
    .then((response) => res.send(response.data))
    .catch(() => {
      res.send({ data: 'error' });
    });
});

app.get('/api/server/albums/:id', (req, res) => {
  axios
    .get('https://api.deezer.com/artist/' + req.params.id + '/albums')
    .then((response) => res.send(response.data))
    .catch(() => {
      res.send({ data: 'error' });
    });
});

// MongoDB API Routes
app.get('/api/mongoose/get-keys', async (req, res) => {
  let searchKeys = await queryAllSearchKeys();
  res.send(searchKeys);
});

app.get('/api/mongoose/get-search/:id', async (req, res) => {
  let response = await querySearchTerm(req.params.id);
  res.send(response);
});

app.get('/api/mongoose/key-exists/:id', async (req, res) => {
  let response = await queryKeyExists(req.params.id);
  res.send(response);
});

app.post('/api/mongoose/create', async (req, res) => {
  createNewSearchTerm(req.body.searchTerm, req.body.data);
});

app.delete('/api/mongoose/delete/:id', async (req, res) => {
  deleteSearch(req.params.id);
});

// Date query
app.get('/api/mongoose/date', async (req, res) => {
  let response = await getDate();
  res.send(response);
});

app.put('/api/mongoose/update', async (req, res) => {
  let searchArr = req.body;
  searchArr.forEach(async (el) => {
    let response = await axios.get('https://api.deezer.com/search/artist?q=' + el);
    updateSearch(el, response.data);
  });
  updateDate();
});

// App
app.listen(4000, (error) => {
  if (error) throw error;
  console.log('Server running...');
  mongooseConnect();
});

// MongoDB connection
function mongooseConnect() {
  connectionString =
    'mongodb+srv://wyzetalk:wyzetalk1234@cluster0.xd1jb.mongodb.net/wyzetalkdb?retryWrites=true&w=majority';

  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.error(err);
    });
}
// Mongoose instance
const db = mongoose.connection;

db.on('connected', async () => {
  console.log('MongoDB connected...');
  // updateDate();
});

db.on('reconnected', async () => {
  console.log('Reconnecting');
});
