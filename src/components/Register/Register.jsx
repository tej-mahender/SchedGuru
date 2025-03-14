import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

function Register() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  let [userCredErr, setUserCredErr] = useState('');
  let [successMsg, setSuccessMsg] = useState('');
  let [showPassword, setShowPassword] = useState(false);

  async function onRegister(userData) {
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setUserCredErr(data.message || 'Registration failed, try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setUserCredErr('Server error, please try again later.');
    }
  }

  return (
    <div className="register-container d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
      <div className="register-card shadow-lg rounded p-4">
        <h1 className="text-center mb-4 text-success">Register</h1>

        {userCredErr && <p className="fs-5 text-danger text-center">{userCredErr}</p>}
        {successMsg && <p className="fs-5 text-success text-center">{successMsg}</p>}

        <form onSubmit={handleSubmit(onRegister)}>
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
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="form-control"
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
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
            <button type="submit" className="btn btn-success btn-block">Register</button>
          </div>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login" className="text-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
