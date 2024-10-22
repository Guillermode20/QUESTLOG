import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './app.css';
import { set } from 'mongoose';

function LoginForm({ onLogin, loginMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const result = await response.json();
  if (result.success) {
    localStorage.setItem('token', result.token);
    console.log('Token stored:', localStorage.getItem('token'));
    onLogin(result.user);
    setUsername('');
    setPassword('');
    setLoginError('');
  } else {
    setLoginError('Incorrect username or password. Please try again.');
  }
};

  return (
    <form className="" onSubmit={handleSubmit}>
      {loginError && <p className="has-text-danger">{loginError}</p>}
      {loginMessage && <p>{loginMessage}</p>}
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-primary" type="submit">Login</button>
        </div>
      </div>
    </form>
  );
}

function SignupForm({ onToggle }) {
  return (
    <form className="">
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input className="input" type="text" placeholder="Username" />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" placeholder="Password" />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="email" placeholder="Email" />
        </div>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-primary" type="submit">Sign Up</button>
        </div>
      </div>
    </form>
  );
}

const Login = ({ closeModal, onLogin }) => {
  const [loginMessage, setLoginMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (user) => {
    onLogin(user); // Call the onLogin prop to update the parent component's state
    closeModal(); // Close the modal on successful login
  };

  return (
    <div className="">
      {isLogin ? (
        <LoginForm onLogin={handleLogin} loginMessage={loginMessage} />
      ) : (
        <SignupForm onToggle={() => setIsLogin(true)} />
      )}
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <a className="button is-text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "No Account? Sign up to start logging your quests!" : "Already have an account? Login here!"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;