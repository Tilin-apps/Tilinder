// server.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Importa el modelo de usuario
require('dotenv').config();

const app = express();

app.use(express.json()); // Para poder parsear el cuerpo de las solicitudes POST

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

app.post('/profile', async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));