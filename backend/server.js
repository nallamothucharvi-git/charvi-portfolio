require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Profile = require('./models/profile');
const getReply = require('./chatbot');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
  res.json({
    message: 'Charvi portfolio backend is running!',
    databaseConnected: mongoose.connection.readyState === 1,
  });
});

app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      email: 'nallamothucharvi@gmail.com',
    }).select('-_id -__v');

    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found. Run the seed script first.',
      });
    }

    res.json(profile);
  } catch (error) {
    console.error('Profile error:', error.message);

    res.status(500).json({
      message: 'Unable to load profile.',
    });
  }
});

app.post('/api/chat', async (req, res) => {
  const message = req.body?.message;

  if (
    typeof message !== 'string' ||
    !message.trim() ||
    message.length > 500
  ) {
    return res.status(400).json({
      message: 'Please send a message between 1 and 500 characters.',
    });
  }

  try {
    const profile = await Profile.findOne({
      email: 'nallamothucharvi@gmail.com',
    });

    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found.',
      });
    }

    const response = await getReply(message.trim(), profile);

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error.message);

    res.status(500).json({
      message: 'Unable to answer right now. Please try again.',
    });
  }
});

async function startServer() {
  try {
    if (!process.env.MONGO_URI || !process.env.FRONTEND_URL) {
      throw new Error('Set MONGO_URI and FRONTEND_URL in your environment.');
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully!');

    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error('Unable to start backend:', error.message);
    process.exit(1);
  }
}

startServer();