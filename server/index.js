const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const EmployeeModel = require('./models/Employees');

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

  app.post('/login', (req, res) => {
    const{ email, password } = req.body;
    EmployeeModel.findOne({ email: email })
    .then(user=>{
      if(user){
        if(password === user.password){
          res.json("Login successful");
        }else{
          res.json("Incorrect password");
        } 
    }else{
      res.json("User not found");
    }
    })

  });



app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.status(500).json(err));  
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});