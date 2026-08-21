import { useState } from "react";
import "./RegisterForm.css";

const initialFormData = {
  nombre: "",
  email: "",
  password: "",
};

export default function RegisterForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [activeAction, setActiveAction] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isRegisterLoading = activeAction === "register";
  const isLoginLoading = activeAction === "login";
  const isLoading = isRegisterLoading || isLoginLoading;

  const validateField = (name, value) => {
    const cleanValue = value.trim();

    if (name === "nombre") {
      if (!cleanValue) return "El nombre es obligatorio.";
      if (cleanValue.length < 3) return "El nombre debe tener al menos 3 caracteres.";
    }

    if (name === "email") {
      if (!cleanValue) return "El correo electrónico es obligatorio.";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanValue)) {
        return "Ingresá un correo electrónico válido.";
      }
    }

    if (name === "password") {
      if (!value) return "La contraseña es obligatoria.";
      if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
      if (!/[A-Z]/.test(value)) return "Debe incluir al menos una letra mayúscula.";
      if (!/[0-9]/.test(value)) return "Debe incluir al menos un número.";
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);

      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  };

  const formErrors = validateForm();
  const isFormValid = Object.keys(formErrors).length === 0;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setSuccessMessage("");
    setGeneralError("");

    if (touched[name]) {
      const fieldError = validateField(name, value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    const fieldError = validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const getInputClassName = (fieldName) => {
    if (errors[fieldName]) return "form-input input-error";
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return "form-input input-success";
    }

    return "form-input";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    setTouched({
      nombre: true,
      email: true,
      password: true,
    });

    setErrors(validationErrors);
    setSuccessMessage("");
    setGeneralError("");

    if (Object.keys(validationErrors).length > 0) {
      setGeneralError("Revisá los campos marcados antes de continuar.");
      return;
    }

    try {
      setActiveAction("register");

      /*
        Simulación de petición HTTP.
        Cuando exista backend, reemplazar este bloque por fetch o axios.

        Ejemplo:
        const response = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("No se pudo crear la cuenta.");
        }
      */

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage("Cuenta creada correctamente. Redirigiendo...");
      setFormData(initialFormData);
      setTouched({});
      setErrors({});
    } catch {
      setGeneralError("Ocurrió un error al crear la cuenta. Intentá nuevamente.");
    } finally {
      setActiveAction("");
    }
  };

  const handleLogin = async () => {
    setSuccessMessage("");
    setGeneralError("");

    try {
      setActiveAction("login");
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("Sin conexión");
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));
      window.location.assign("/dashboard");
    } catch {
      setGeneralError("No se pudo iniciar sesión en este momento. Intentá nuevamente.");
    } finally {
      setActiveAction("");
    }
  };

  return (
    <section className="register-page">
      <div className="register-card">
        <div className="register-header">
          <p className="brand-label">Consulir</p>
          <h1>Crea tu cuenta</h1>
          <p>Unite a Consulir y gestioná tus finanzas con precisión profesional.</p>
        </div>

        {generalError && (
          <div className="alert alert-error" role="alert">
            {generalError}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" role="status">
            {successMessage}
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>

            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej. Juan Pérez"
              value={formData.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={getInputClassName("nombre")}
              aria-invalid={Boolean(errors.nombre)}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />

            {errors.nombre && (
              <small id="nombre-error" className="field-error">
                {errors.nombre}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@consulir.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={getInputClassName("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />

            {errors.email && (
              <small id="email-error" className="field-error">
                {errors.email}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>

            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={getInputClassName("password")}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prevValue) => !prevValue)}
                disabled={isLoading}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>

            {errors.password ? (
              <small id="password-error" className="field-error">
                {errors.password}
              </small>
            ) : (
              touched.password &&
              formData.password && (
                <small className="field-success">Contraseña segura.</small>
              )
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading || !isFormValid}
          >
            {isRegisterLoading ? (
              <span className="button-loading">
                <span className="spinner" aria-hidden="true"></span>
                Registrando...
              </span>
            ) : (
              "Registrarse"
            )}
          </button>

          <button
            type="button"
            className="submit-button secondary-button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoginLoading ? (
              <span className="button-loading">
                <span className="spinner" aria-hidden="true"></span>
                Ingresando...
              </span>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}