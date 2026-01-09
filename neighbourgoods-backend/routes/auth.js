import express from 'express';
import admin from '../config/firebase.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify Firebase ID Token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).send('Access denied');
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send('Invalid or expired token');
  }
};

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  // Access user information via req.user
  res.status(200).send('Protected content');
});

// Route to handle user login
router.post('/login', verifyToken, async (req, res) => {
  try {
    const { email, name, photoURL } = req.body;
    let user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      user = new User({
        firebaseUid: req.user.uid,
        email,
        name,
        photoURL,
      });
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to handle user sign-up
router.post('/signup', verifyToken, async (req, res) => {
  try {
    const { email, name, photoURL } = req.body;
    let user = await User.findOne({ firebaseUid: req.user.uid });
    if (user) {
      return res.status(400).send('User already exists');
    }
    user = new User({
      firebaseUid: req.user.uid,
      email,
      name,
      photoURL,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
