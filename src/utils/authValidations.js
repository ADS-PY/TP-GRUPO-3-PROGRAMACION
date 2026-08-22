export const validateName = (name) => {
  const cleanName = name.trim();

  if (!cleanName) {
    return "El nombre es obligatorio.";
  }

  if (cleanName.length < 3) {
    return "El nombre debe tener al menos 3 caracteres.";
  }

  return "";
};

export const validateEmail = (email) => {
  const cleanEmail = email.trim();

  if (!cleanEmail) {
    return "El correo electrónico es obligatorio.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {
    return "Ingresá un correo electrónico válido.";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "La contraseña es obligatoria.";
  }

  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe incluir al menos una letra mayúscula.";
  }

  if (!/[a-z]/.test(password)) {
    return "La contraseña debe incluir al menos una letra minúscula.";
  }

  if (!/[0-9]/.test(password)) {
    return "La contraseña debe incluir al menos un número.";
  }

  return "";
};

export const validateRegisterField = (fieldName, value) => {
  if (fieldName === "nombre") {
    return validateName(value);
  }

  if (fieldName === "email") {
    return validateEmail(value);
  }

  if (fieldName === "password") {
    return validatePassword(value);
  }

  return "";
};

export const validateRegisterForm = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((fieldName) => {
    const error = validateRegisterField(fieldName, formData[fieldName]);

    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

export const validateLoginField = (fieldName, value) => {
  if (fieldName === "email") return validateEmail(value);

  if (fieldName === "password" && !value) {
    return "La contraseña es obligatoria.";
  }

  return "";
};

export const validateLoginForm = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((fieldName) => {
    const error = validateLoginField(fieldName, formData[fieldName]);
    if (error) errors[fieldName] = error;
  });

  return errors;
};

export const hasValidationErrors = (errors) => {
  return Object.values(errors).some(Boolean);
};
