import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

   axios.post("http://localhost:5000/login", { email, password })
  .then(result => {
    console.log(result);

    // ✅ FIX HERE
    if (result.data.token) {
      localStorage.setItem("token", result.data.token);
      navigate("/home");
    }
  })
      .catch(err => console.error(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-4 rounded shadow w-50'>
        <h2 className='text-center mb-3'>Login</h2>

        <form onSubmit={handleSubmit}>

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
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='d-grid mt-2'>
            <button type="submit" className='btn btn-success'>
              Login
            </button>
          </div>
        </form>

        
        <p className='text-center mt-3'>
          Do not have an account?{" "}
          <Link to="/register" className='text-decoration-none'>
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;