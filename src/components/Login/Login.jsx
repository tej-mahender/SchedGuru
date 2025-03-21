import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

function Login() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  let [userCredErr, setUserCredErr] = useState('');
  let [showPassword, setShowPassword] = useState(false);

  async function onLogin(userCred) {
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCred),
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token); // Assuming JWT Token is returned
        navigate('/profile'); // Redirect to profile after login
      } else {
        setUserCredErr(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setUserCredErr('Server error, please try again later.');
    }
  }

  return (
    <div className="login-container d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
      <div className="login-card shadow-lg rounded p-4">
        <h1 className="text-center mb-4 text-primary">Login</h1>

        {userCredErr && <p className="fs-5 text-danger text-center">{userCredErr}</p>}

        <form onSubmit={handleSubmit(onLogin)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Emp ID</label>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'Username is required' })}
              className="form-control"
            />
            {errors.username && <p className="text-danger">{errors.username.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', { required: 'Password is required' })}
                className="form-control"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-outline-secondary"
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </div>

          <p className="text-center mt-3">
            New User? <Link to="/register" className="text-primary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
