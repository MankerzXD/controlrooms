import { useNavigate } from 'react-router-dom';
import '../styles/home.scss'; // asegurate que esté el SCSS también

function Home() {
    const navigate = useNavigate();
    const username = localStorage.getItem('user'); // leemos el nombre del usuario

    // Usuarios autorizados para ver el botón especial
    const autorizados = ['ajgarcia', 'mjsanchez', 'aquiroga'];

    const handleSede = (sede) => {
        navigate(`/sede/${sede}`);
    };

    const handleEventos = () => {
        navigate('/eventos');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };
    const handleDescargarSemana = () => {
        navigate('/adolfo');
    };

    return (
        <div className="home-container">
            {/* Topbar con usuario y logout */}
            <div className="top-bar">
                <div className="user-info">
                    <span className="material-icons">person</span>
                    <span>{username}</span>
                </div>
                <div className="logout-icon" onClick={handleLogout}>
                    <span className="material-icons">logout</span>
                </div>
            </div>

            {/* Título principal */}
            <h1>UCEMA Control de Aulas</h1>
            <p>Selecciona la Sede correspondiente</p>

            {/* Botones de las sedes */}
            <div className="buttons-container">
                <button onClick={() => handleSede('central')}>CENTRAL</button>
                <button onClick={() => handleSede('alem')}>ALEM</button>
                <button onClick={() => handleSede('cordoba')}>CÓRDOBA</button>
                <button onClick={handleEventos}>EVENTOS</button>
                {/* Botón solo si está autorizado */}
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


