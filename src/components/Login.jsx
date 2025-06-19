import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>

      <form>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

<button
  type="button"
  onClick={async () => {
    if (!username.trim() || !password.trim()) {
      setError('Debes completar todos los campos.');
      return;
    }

    try {
      // 👇 Simulación interna (sin backend, sin archivos externos)
      const usuarios = [
        {
          email: 'soportista@ucema.edu.ar',
          password: '1234',
          nombre: 'Soportista Ale',
          rol: 'soportista',
        },
        {
          email: 'coordinador@ucema.edu.ar',
          password: '1234',
          nombre: 'Coordinador Juan',
          rol: 'coordinador',
        },
      ];

      const user = usuarios.find(
        (u) => u.email === username && u.password === password
      );

      if (!user) {
        setError('Credenciales incorrectas.');
        return;
      }

      // Guardamos token simulado y datos
      const fakeToken = btoa(`${username}:faketoken`);
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', user.nombre);
      localStorage.setItem('rol', user.rol);

      setTimeout(() => {
        navigate('/');
      }, 100);

      // 🔒 Código real comentado
      /*
      const res = await fetch('http://10.33.0.138:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          contraseña: password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.nombre);
        setTimeout(() => {
          navigate('/');
        }, 100);
      } else {
        setError(data.error || 'Credenciales incorrectas.');
      }
      */
    } catch (err) {
      console.error(err);
      setError('Error inesperado al simular el login.');
    }
  }}
>
  Ingresar
</button>

      </form>

      {/* Mostrar error si hay */}
      {error && <div className="error">{error}</div>}

      <hr />

      {/* Botón futuro login con Microsoft */}
      <button className="microsoft-button" onClick={() => alert('Login con Microsoft (en construcción 🍆💦)')}>
        Login con Microsoft
      </button>

      {/* Enlace para registrarse */}
      <p className="registro-link">
        ¿No estás registrado? <Link to="/register">Registrate</Link>
      </p>
    </div>
  );
}

export default Login;
