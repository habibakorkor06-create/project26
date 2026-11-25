import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';
import { useAuth } from '../AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await registerUser(form);
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
        <p>Join to rescue surprise bags or to sell yours.</p>
      </div>
      <div className="auth-side">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Create account</h2>
          {error && <p className="error">{error}</p>}
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="customer">I'm a customer</option>
            <option value="store">I'm a store</option>
          </select>
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}