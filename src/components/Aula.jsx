import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/aula.scss';

function Aula() {
    const navigate = useNavigate();
    const { aulaId } = useParams();

    const [horarios, setHorarios] = useState([
        {
            inicio: '08:00',
            fin: '12:00',
            modalidad: 'Presencial',
            estado: 'Pendiente',
            profesor: 'Juan Pérez',
            materia: 'Matemática',
        },
        {
            inicio: '15:00',
            fin: '17:00',
            modalidad: 'Presencial',
            estado: 'Finalizado',
            profesor: 'Mauro Loma',
            materia: 'Trap N Export',
        },
        {
            inicio: '19:00',
            fin: '22:00',
            modalidad: 'Híbrida',
            estado: 'Pendiente',
            profesor: '',
            materia: '',
        },
    ]);

    const [abiertos, setAbiertos] = useState([]);
    const [comentarios, setComentarios] = useState(() => {
        const guardados = localStorage.getItem(`comentarios-${aulaId}`);
        return guardados ? JSON.parse(guardados) : Array(horarios.length).fill('');
    });
    const [mostrarComentario, setMostrarComentario] = useState([]);
    const [startX, setStartX] = useState(null);

    const handleEstadoChange = (index, nuevoEstado) => {
        const nuevosHorarios = [...horarios];
        nuevosHorarios[index].estado = nuevoEstado;
        setHorarios(nuevosHorarios);
    };

    const toggleDetalle = (index) => {
        setAbiertos((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (index, e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            setMostrarComentario((prev) => [...new Set([...prev, index])]);
        }
    };

    const handleMouseDown = (e) => {
        setStartX(e.clientX);
    };

    const handleMouseUp = (index, e) => {
        if (startX - e.clientX > 50) {
            setMostrarComentario((prev) => [...new Set([...prev, index])]);
        }
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Finalizado':
                return '#d3d3d3';
            case 'Abierta':
                return '#90ee90';
            case 'Pendiente':
                return '#fff176';
            default:
                return '#ffffff';
        }
    };

    // Guardar comentarios en localStorage
    useEffect(() => {
        localStorage.setItem(`comentarios-${aulaId}`, JSON.stringify(comentarios));
    }, [comentarios, aulaId]);

    return (
        <div className="aula-container">
            <div className="top-bar">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <span className="material-icons">arrow_back</span>
                </button>
                <h1>{aulaId}</h1>
            </div>

            <div className="horarios">
                {horarios.map((horario, index) => (
                    <div
                        key={index}
                        className="horario-block"
                        style={{ backgroundColor: getEstadoColor(horario.estado) }}
                        onClick={() => toggleDetalle(index)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => handleTouchEnd(index, e)}
                        onMouseDown={handleMouseDown}
                        onMouseUp={(e) => handleMouseUp(index, e)}
                    >
                        <div className="horario-info">
                            <span>{horario.inicio} - {horario.fin}</span>
                            <span> | </span>
                            <span>{horario.modalidad}</span>
                            <span> | </span>
                            <select
                                value={horario.estado}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleEstadoChange(index, e.target.value)}
                            >
                                <option value="Finalizado">Finalizado</option>
                                <option value="Abierta">Abierta</option>
                                <option value="Pendiente">Pendiente</option>
                            </select>
                        </div>

                        {abiertos.includes(index) && horario.profesor && horario.materia && (
                            <div className="profesor-info">
                                {horario.profesor} - {horario.materia}
                            </div>
                        )}

                        {mostrarComentario.includes(index) && (
                            <div className="comentario-popup">
                                <span className="material-icons">comment</span>
                                <input
                                    type="text"
                                    placeholder="Agregar comentario..."
                                    value={comentarios[index]}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        const nuevos = [...comentarios];
                                        nuevos[index] = e.target.value;
                                        setComentarios(nuevos);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Aula;
