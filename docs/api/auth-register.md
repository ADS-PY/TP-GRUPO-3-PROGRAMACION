# Endpoint: Registro de usuario

> **Estado:** Especificación técnica (contrato). Este documento es la única fuente de verdad
> para los equipos de backend y frontend respecto de la estructura de datos y el
> comportamiento del endpoint de registro. Referencia: issue T-9.

## `POST /auth/register`

Crea una nueva cuenta de usuario en Consulir.

### Headers

| Header         | Valor              | Obligatorio |
| -------------- | ------------------ | ----------- |
| `Content-Type` | `application/json` | Sí          |

### Request body

```json
{
  "nombre": "Juan Pérez",
  "email": "usuario@consulir.com",
  "password": "Passw0rd"
}
```

| Campo      | Tipo   | Obligatorio | Restricciones                                                                                                                              |
| ---------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `nombre`   | string | Sí          | Mínimo 3 caracteres (una vez recortados los espacios en los extremos).                                                                        |
| `email`    | string | Sí          | Debe tener formato de email válido (`usuario@dominio.tld`). Debe ser único en el sistema.                                                     |
| `password` | string | Sí          | Mínimo 8 caracteres. Debe incluir al menos una letra mayúscula, una letra minúscula y un número.                                              |

No se aceptan campos adicionales a los definidos en la tabla anterior.

### Respuesta exitosa — `201 Created`

Se retorna cuando el usuario fue creado correctamente. La contraseña **nunca** se
incluye en la respuesta.

```json
{
  "id": "b3f1c2a4-6e5d-4c9a-9b1a-8f2d3e4a5b6c",
  "nombre": "Juan Pérez",
  "email": "usuario@consulir.com",
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

| Campo       | Tipo   | Descripción                                     |
| ----------- | ------ | ------------------------------------------------ |
| `id`        | string | Identificador único del usuario (UUID).           |
| `nombre`    | string | Nombre completo registrado.                       |
| `email`     | string | Correo electrónico registrado.                    |
| `createdAt` | string | Fecha y hora de creación en formato ISO 8601.     |

### Estructura de errores

Toda respuesta de error sigue el mismo esquema, para que el frontend pueda
procesarla de forma consistente:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos enviados no son válidos.",
    "details": [
      {
        "field": "email",
        "message": "Ingresá un correo electrónico válido."
      }
    ]
  }
}
```

| Campo            | Tipo   | Descripción                                                                 |
| ----------------- | ------ | ---------------------------------------------------------------------------- |
| `error.code`      | string | Código de error interno, estable y legible por máquina (ver catálogo abajo). |
| `error.message`   | string | Mensaje legible para mostrar o loguear.                                     |
| `error.details`   | array  | Opcional. Lista de errores por campo, presente en errores de validación.    |
| `details[].field` | string | Nombre del campo con el error.                                              |
| `details[].message` | string | Descripción del error específico del campo.                              |

### Catálogo de respuestas fallidas

#### `400 Bad Request`

Se retorna cuando el cuerpo de la solicitud es inválido: faltan campos
obligatorios, o alguno de los campos no cumple con el formato/restricciones
descriptas en la sección de *Request body* (por ejemplo: email con formato
inválido, contraseña que no cumple con la complejidad requerida, nombre con
menos de 3 caracteres).

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos enviados no son válidos.",
    "details": [
      { "field": "nombre", "message": "El nombre debe tener al menos 3 caracteres." },
      { "field": "password", "message": "La contraseña debe incluir al menos una letra mayúscula." }
    ]
  }
}
```

#### `409 Conflict`

Se retorna cuando el `email` enviado ya está registrado en el sistema.

```json
{
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Ya existe una cuenta registrada con ese correo electrónico."
  }
}
```

#### `500 Internal Server Error`

Se retorna ante un error inesperado del servidor (por ejemplo, una falla de
conexión con la base de datos). No debe exponer detalles internos de
implementación.

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Ocurrió un error inesperado. Intentá nuevamente más tarde."
  }
}
```

### Resumen de códigos de estado

| Código | Significado           | Cuándo ocurre                                              |
| ------ | ---------------------- | ------------------------------------------------------------ |
| `201`  | Created                | El usuario fue creado exitosamente.                          |
| `400`  | Bad Request            | El payload no cumple con las validaciones de campos.         |
| `409`  | Conflict               | El email ya está registrado.                                 |
| `500`  | Internal Server Error  | Error inesperado en el servidor.                              |

### Referencia de implementación actual (frontend)

Las reglas de validación descriptas en este documento están implementadas en
[`src/utils/authValidations.js`](../../src/utils/authValidations.js) y
utilizadas por [`src/components/auth/RegisterForm.jsx`](../../src/components/auth/RegisterForm.jsx).
Al día de esta especificación, el frontend simula la llamada al backend; esta
documentación define el contrato que deberá cumplir la implementación real del
endpoint `POST /auth/register`.
