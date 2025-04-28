import { useNavigate, useParams } from 'react-router-dom';
import '../styles/aula.scss';

function Aula() {
    const navigate = useNavigate();
    const { aulaId } = useParams(); // Ejemplo: 2A, 3C, etc.

    // Simulación de horarios (después lo podrías hacer dinámico por aulaId)
    const horarios = [
        { inicio: '08:00', fin: '12:00', modalidad: 'Presencial', estado: 'Finalizado', profesor: 'Juan Pérez', materia: 'Matemática' },
        { inicio: '15:00', fin: '17:00', modalidad: 'Presencial', estado: 'Abierta', profesor: 'Mauro Loma', materia: 'Trap N Export' },
        { inicio: '19:00', fin: '22:00', modalidad: 'Híbrida', estado: 'Pendiente', profesor: '', materia: '' },
    ];

    // Definir color de fondo según estado
    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Finalizado':
                return '#d3d3d3'; // gris
            case 'Abierta':
                return '#90ee90'; // verde claro
            case 'Pendiente':
                return '#fff176'; // amarillo claro
            default:
                return '#ffffff'; // blanco
        }
    };

    return (
        <div className="aula-container">
            {/* Topbar con botón volver y título */}
            <div className="top-bar">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <span className="material-icons">arrow_back</span>
                </button>
                <h1>{aulaId}</h1>
            </div>

            {/* Lista de horarios */}
            <div className="horarios">
                {horarios.map((horario, index) => (
                    <div
                        key={index}
                        className="horario-block"
                        style={{ backgroundColor: getEstadoColor(horario.estado) }}
                    >
                        <div className="horario-info">
                            <span>{horario.inicio} - {horario.fin}</span>
                            <span>{horario.modalidad}</span>
                            <span>{horario.estado}</span>
                        </div>
                        {horario.profesor && horario.materia && (
                            <div className="profesor-info">
                                {horario.profesor} - {horario.materia}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Aula;
