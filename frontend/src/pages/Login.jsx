import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(form);
      saveSession(data);
      navigate(data.user.role === 'store' ? '/store' : '/browse');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <h1>Waffra</h1>
        <p>Rescue surprise bags. Save food, save money.</p>
      </div>
      <div className="auth-side">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Welcome back</h2>
          {error && <p className="error">{error}</p>}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Log in</button>
          <p>
            No account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}