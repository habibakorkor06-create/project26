import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StoreDashboard from './pages/StoreDashboard';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from './AuthContext';

function Header() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <header className="app-header">
      <span className="brand">Waffra</span>
      <span className="hello">Hello, {user.name}</span>
      <button onClick={logout}>Log out</button>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/store"
          element={
            <ProtectedRoute role="store">
              <StoreDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse"
          element={
            <ProtectedRoute role="customer">
              <div className="container">
                <h2>Customer browse page</h2>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}