import { useState } from "react";
import PropTypes from "prop-types";
import {
  validateLoginField,
  validateLoginForm,
} from "../../utils/authValidations";
import "./LoginForm.css";

const initialFormData = {
  email: "",
  password: "",
};

/**
 * Formulario de autenticación desacoplado del transporte.
 * onSubmit debe devolver una promesa cuando se conecta a un backend.
 */
export default function LoginForm({ onSubmit, isDisabled = false }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = Object.keys(validateLoginForm(formData)).length === 0;
  const controlsDisabled = isDisabled || isLoading;

  const updateFieldError = (name, value) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateLoginField(name, value),
    }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setGeneralError("");

    if (touched[name]) {
      updateFieldError(name, value);
    }
  };

  const handleBlur = ({ target: { name, value } }) => {
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }));
    updateFieldError(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (controlsDisabled) return;

    const validationErrors = validateLoginForm(formData);
    setTouched({ email: true, password: true });
    setErrors(validationErrors);
    setGeneralError("");

    if (Object.keys(validationErrors).length > 0) {
      setGeneralError("Revisá los campos marcados antes de continuar.");
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit({
        email: formData.email.trim(),
        password: formData.password,
      });
    } catch (error) {
      setGeneralError(error?.message || "No pudimos iniciar sesión. Intentá nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (name) => (
    errors[name] ? "login-form__input login-form__input--error" : "login-form__input"
  );

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
      {generalError && (
        <div className="login-form__alert" role="alert" id="login-form-error">
          {generalError}
        </div>
      )}

      <fieldset className="login-form__fields" disabled={controlsDisabled}>
        <div className="login-form__group">
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="usuario@consulir.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
          />
          {errors.email && <small id="login-email-error" className="login-form__field-error">{errors.email}</small>}
        </div>

        <div className="login-form__group">
          <label htmlFor="login-password">Contraseña</label>
          <div className="login-form__password-wrapper">
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Ingresá tu contraseña"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName("password")}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "login-password-error" : undefined}
            />
            <button
              type="button"
              className="login-form__password-toggle"
              onClick={() => setShowPassword((currentValue) => !currentValue)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>
          {errors.password && <small id="login-password-error" className="login-form__field-error">{errors.password}</small>}
        </div>

        <button type="submit" className="login-form__submit" disabled={controlsDisabled || !isFormValid}>
          {isLoading ? (
            <span className="login-form__loading">
              <span className="login-form__spinner" aria-hidden="true" />
              Ingresando…
            </span>
          ) : "Ingresar"}
        </button>
      </fieldset>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  isDisabled: PropTypes.bool,
};

LoginForm.defaultProps = {
  onSubmit: () => Promise.resolve(),
};
