import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../connection/connection.mjs';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide name, email, and password' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    const user = { id: result.insertId, name, email };
    const token = generateToken(user);

    return res.status(201).json({
      status: 'success',
      message: 'User created',
      data: { user: { id: user.id, name: user.name, email: user.email }, token },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ status: 'failed', message: 'Try again', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'failed', message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: { id: user.id, name: user.name, email: user.email, token },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ status: 'failed', message: 'Try again', error: error.message });
  }
};

export const logout = (req, res) => {
  return res.status(200).json({ message: 'User logged out successfully' });
};
