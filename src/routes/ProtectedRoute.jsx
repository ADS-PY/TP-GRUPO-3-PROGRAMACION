// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div role="status" aria-label="Verificando sesión" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <span className="spinner" aria-hidden="true" />
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
