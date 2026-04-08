import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // hadle validatiomn email and empty input and password length

  function validate(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      alert("All fields are required.");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    return true;

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    axios.post("http://localhost:5000/register", { name, email, password })
      .then(result => {
        console.log(result);
        navigate("/login"); 
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-4 rounded shadow w-50'>
        <h2 className='text-center mb-3'>Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Name</label>
            <input
              type='text'
              className='form-control'
              id='name'
              placeholder='Enter your name'
              autoComplete='name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter your email'
              autoComplete='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              autoComplete='new-password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

        
          <div className='d-grid mt-2'>
            <button type="submit" className='btn btn-success'>
              Register
            </button>
          </div>
        </form>

        <p className='text-center mt-3'>
          Already have an account?{" "}
          <Link to="/login" className='text-decoration-none'>
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;