import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.scss';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!validarFormulario()) return;

    setCargando(true);

    const BASE_URL = window.location.origin;

    try {
      const res = await fetch(`http://10.33.0.22:5000/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          contraseña: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`✅ Registro exitoso: ${data.mensaje}`);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(`❌ Error: ${data.error || 'Algo salió mal'}`);
      }
    } catch (err) {
      setError('❌ Error al conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Registro de Soportistas</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña (mín. 6 caracteres)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      {mensaje && <div className="success">{mensaje}</div>}
      {error && <div className="error">{error}</div>}
      <div className="registro-link">
        <p>¿Ya estás registrado? <Link to="/login">Inicia sesión acá</Link></p>
      </div>
    </div>
  );
}

export default Register;
