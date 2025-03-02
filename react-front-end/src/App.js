import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx'; // Ensure correct file extensions
import LoginPage from './pages/LoginPage.jsx';

const rootUrl = 'http://localhost:5000';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // ✅ Now this works because BrowserRouter is in main.jsx

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    const user = { email, password };

    try {
      const response = await fetch(`${rootUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail('');
        setPassword('');
        navigate('/'); // ✅ Redirects properly
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      console.log(error);
      setError('There was an error during the login. Try again.');
    }
  };

  const fetchLogout = async () => {
    try {
      const response = await fetch(`${rootUrl}/api/v1/auth/logout`);
      if (response.ok) {
        alert('Logout successful!');
        navigate('/login');
      } else {
        alert('Logout failure!');
      }
    } catch (error) {
      console.log(error);
      alert('Logout failure!');
    }
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <button className="btn logout-btn" onClick={fetchLogout}>Logout</button>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Login Successful</div>}
      <form className="form" onSubmit={handleSubmit}>
        <h4>Login Form</h4>
        <div className="form-row">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-input email-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-input password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block submit-btn">Submit</button>
      </form>
    </>
  );
}

export default App;
