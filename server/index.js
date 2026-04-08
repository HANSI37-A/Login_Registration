import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import EmployeeModel from './models/Employees.js';
import verifyToken from './middleware/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/employee2')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


// ✅ LOGIN (FIXED)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email: email });

    if (!user) {
      return res.json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // ✅ FIXED CONDITION
    if (!isMatch) {
      return res.json("Wrong password");
    }

    // ✅ Generate token
 const token = jwt.sign(
  { id: user._id },
  "secretkey",   // ✅ SAME
  { expiresIn: "1d" }
);

    res.json({ token });

  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ REGISTER
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await EmployeeModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    res.json(user);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ PROTECTED ROUTE
app.get("/home", verifyToken, (req, res) => {
  res.json("Welcome to Home Page 🔥");
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});