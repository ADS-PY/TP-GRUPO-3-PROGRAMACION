// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // o un spinner de carga global
  }

  return user ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
