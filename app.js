const express = require('express');
const app = express();

const db = require('./config/db');
const User = require('./models/User');

const port = 8000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'ok',
  });
});

db.authenticate().then(() => console.log('Berhasil terkoneksi database'));

app.post('/crud', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/crud', async (req, res) => {
  try {
    const getAllUser = await User.findAll({});

    res.json(getAllUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server eror');
  }
});

app.get('/crud/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const getUser = await User.findOne({
      where: {
        id: id,
      },
    });

    res.json(getUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server eror');
  }
});

app.delete('/crud/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUser = await User.destroy({
      where: {
        id: id,
      },
    });

    await deleteUser;
    res.json({ message: 'user berhasil dihapus' });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server eror');
  }
});

app.put('/crud/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, password } = req.body;

    const userUpdate = await User.update(
      { username, email, password },
      { where: { id: id } }
    );

    await userUpdate;

    res.json({ message: 'berhasil diupdate' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server eror');
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
