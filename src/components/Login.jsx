import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss'; // asegurate de que login.scss exista

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Debes completar todos los campos.');
            return;
        }

        // Guardar el usuario (falso por ahora)
        localStorage.setItem('user', username);

        // Redireccionar al Home
        navigate('/');
    };

    const handleMicrosoftLogin = () => {
        alert('Login con Microsoft (en construcción 🍆💦)');
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Usuario"
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
                <button type="submit">Ingresar</button>
            </form>

            {/* Mostrar error si hay */}
            {error && <div className="error">{error}</div>}

            <hr />

            {/* Botón futuro login con Microsoft */}
            <button className="microsoft-button" onClick={handleMicrosoftLogin}>
                Login con Microsoft
            </button>
        </div>
    );
}

export default Login;

