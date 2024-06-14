const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/financeManager', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const incomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
});

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
});

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  amount: Number,
});

const User = mongoose.model('User', userSchema);
const Income = mongoose.model('Income', incomeSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Budget = mongoose.model('Budget', budgetSchema);

const secretKey = 'your_secret_key';


const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};


app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.post('/api/income', authenticateUser, async (req, res) => {
  try {
    const { amount, category } = req.body;
    const income = new Income({ userId: req.userId, amount, category });
    await income.save();
    res.status(201).json({ message: 'Income added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding income' });
  }
});

app.post('/api/expense', authenticateUser, async (req, res) => {
  try {
    const { amount, category } = req.body;
    const expense = new Expense({ userId: req.userId, amount, category });
    await expense.save();
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense' });
  }
});

app.post('/api/budget', authenticateUser, async (req, res) => {
  try {
    const { category, amount } = req.body;
    const budget = new Budget({ userId: req.userId, category, amount });
    await budget.save();
    res.status(201).json({ message: 'Budget added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding budget' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
