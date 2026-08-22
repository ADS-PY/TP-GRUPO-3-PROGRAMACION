import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import RegisterForm from '../RegisterForm';

describe('Integración: navegación desde RegisterForm', () => {
  let assignMock;
  let originalLocation;

  beforeEach(() => {
    assignMock = vi.fn();
    originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: { ...originalLocation, assign: assignMock },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  it('el botón "Ingresar" navega a /dashboard', async () => {
    render(<RegisterForm />);

    const ingresarBtn = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(ingresarBtn);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(assignMock).toHaveBeenCalledWith('/dashboard');
  });

  it('el botón "Registrarse" muestra confirmación al completar el formulario', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Juan Pérez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'juan@consulir.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i, { selector: 'input' }), {
      target: { value: 'Segura123' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }).closest('form'));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(screen.getByText(/Cuenta creada correctamente/i)).toBeInTheDocument();
  });
});
