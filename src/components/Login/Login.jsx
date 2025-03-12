import React from 'react';
import './Login.css';
import { useState, useContext, useEffect } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

function Login() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let { loginUser, isLogin } = useContext(userLoginContext);
  let navigate = useNavigate();
  let [userCredErr, setUserCredErr] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  async function onLogin(userCred) {
    console.log(userCred);
    let res = await loginUser(userCred);
    if (!isLogin)
      setUserCredErr('Invalid username or password');
  }

  useEffect(() => {
    if (isLogin === true) {
      // navigate('/profile');
    }
  }, [isLogin]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="login-container d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <div className="login-card shadow-lg rounded">
          <h1 className="text-center mb-4 text-primary">Login</h1>

          {isLogin === false && userCredErr.length !== 0 && (
            <p className="fs-5 text-danger text-center">{userCredErr}</p>
          )}

          <form onSubmit={handleSubmit(onLogin)} className="login-form p-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                {...register('username', { required: true })}
                className="form-control"
              />
              {errors.username?.type === 'required' && (
                <p className="text-danger">Username is required</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', { required: true })}
                  className="form-control"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="btn btn-outline-secondary"
                >
                  {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </button>
              </div>
              {errors.password?.type === 'required' && (
                <p className="text-danger">Password is required</p>
              )}
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </div>

            <p className="text-center mt-3 text-white">
              New User? <Link to="/register" className="text-primary">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
