import { useState } from "react";
import "./RegisterForm.css"; // Reutiliza los estilos existentes

const initialFormData = {
  monto: "",
  fecha: new Date().toISOString().split("T")[0],
  concepto: "",
};

export default function IncomeForm({ onSave }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");

  // Validaciones
  const validateField = (name, value) => {
    if (name === "monto") {
      if (!value) return "El monto es obligatorio.";
      if (Number(value) <= 0) return "El monto debe ser mayor a 0.";
    }
    if (name === "fecha") {
      if (!value) return "La fecha es obligatoria.";
    }
    if (name === "concepto") {
      if (!value.trim()) return "El concepto o descripción es obligatorio.";
      if (value.trim().length < 3) return "Debe tener al menos 3 caracteres.";
    }
    return "";
  };

  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const formErrors = validateForm(formData);
  const isFormValid = Object.keys(formErrors).length === 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage("");
    setGeneralError("");

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
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
    const validationErrors = validateForm(formData);

    setTouched({ monto: true, fecha: true, concepto: true });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setGeneralError("Revisá los campos marcados antes de continuar.");
      return;
    }

    try {
      setIsLoading(true);
      
      // Ejecución de callback o persistencia externa si se recibe por prop
      if (onSave) {
        await onSave(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSuccessMessage("Ingreso guardado correctamente.");
      setFormData(initialFormData);
      setTouched({});
      setErrors({});
    } catch {
      setGeneralError("Ocurrió un error al guardar el ingreso. Intentá nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="register-page">
      <div className="register-card">
        <div className="register-header">
          <p className="brand-label">Consulir</p>
          <h1>Registrar Ingreso</h1>
          <p>Completá la información para guardar tu nuevo ingreso.</p>
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
          {/* Campo Monto */}
          <div className="form-group">
            <label htmlFor="monto">Monto</label>
            <input
              id="monto"
              name="monto"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.monto}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={getInputClassName("monto")}
              aria-invalid={Boolean(errors.monto)}
              aria-describedby={errors.monto ? "monto-error" : undefined}
            />
            {errors.monto && (
              <small id="monto-error" className="field-error">
                {errors.monto}
              </small>
            )}
          </div>

          {/* Campo Fecha */}
          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input
              id="fecha"
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={getInputClassName("fecha")}
              aria-invalid={Boolean(errors.fecha)}
              aria-describedby={errors.fecha ? "fecha-error" : undefined}
            />
            {errors.fecha && (
              <small id="fecha-error" className="field-error">
                {errors.fecha}
              </small>
            )}
          </div>

          {/* Campo Concepto / Descripción */}
          <div className="form-group">
            <label htmlFor="concepto">Concepto / Descripción</label>
            <input
              id="concepto"
              name="concepto"
              type="text"
              placeholder="Ej. Honorarios de servicios"
              value={formData.concepto}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={getInputClassName("concepto")}
              aria-invalid={Boolean(errors.concepto)}
              aria-describedby={errors.concepto ? "concepto-error" : undefined}
            />
            {errors.concepto && (
              <small id="concepto-error" className="field-error">
                {errors.concepto}
              </small>
            )}
          </div>

          {/* Botón Guardar */}
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? (
              <span className="button-loading">
                <span className="spinner" aria-hidden="true"></span>
                Guardando...
              </span>
            ) : (
              "Guardar ingreso"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
