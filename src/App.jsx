import AuthCard from "./components/auth/AuthCard";
import "./App.css";

function App() {
  const handleLogin = () => {
    console.log("Click en Ingresar");
  };

  const handleRegister = () => {
    console.log("Click en Registrar");
  };

  return (
    <main className="app-page">
      <AuthCard onLogin={handleLogin} onRegister={handleRegister} />
    </main>
  );
}

export default App;