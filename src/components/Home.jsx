import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.scss';

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            setUsername(storedUser);
        }
    }, [navigate]);

    const autorizados = ['ajgarcia', 'mjsanchez', 'aquiroga'];

    const handleSede = (sede) => navigate(`/sede/${sede}`);
    const handleEventos = () => navigate('/eventos');
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };
    const handleDescargarSemana = () => navigate('/adolfo');

    return (
        <div className="home-container">
            <div className="top-bar">
                <div className="user-info">
                    <span className="material-icons">person</span>
                    <span>{username}</span>
                </div>
                <div className="logout-icon" onClick={handleLogout}>
                    <span className="material-icons">logout</span>
                </div>
            </div>

            <h1>UCEMA Control de Aulas</h1>
            <p>Selecciona la Sede correspondiente</p>

            <div className="buttons-container">
                <button onClick={() => handleSede('central')}>CENTRAL</button>
                <button onClick={() => handleSede('alem')}>ALEM</button>
                <button onClick={() => handleSede('cordoba')}>CÓRDOBA</button>
                <button onClick={handleEventos}>EVENTOS</button>
                {autorizados.includes(username) && (
                    <button onClick={handleDescargarSemana} className="admin-button">
                        Descargar Semana
                    </button>
                )}
            </div>
        </div>
    );
}

export default Home;

