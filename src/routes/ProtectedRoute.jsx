// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // TODO: reemplazar por la lógica real de autenticación
  const isAuthenticated = true; // placeholder temporal

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;