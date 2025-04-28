import { useParams, useNavigate } from 'react-router-dom';
import '../styles/sede.scss';

const sedesData = {
    central: {
        nombre: 'CENTRAL',
        edificios: [
            {
                nombre: 'Córdoba 374',
                pisos: {
                    '2°': ['A', 'B', 'C'],
                    '3°': ['A', 'B', 'C'],
                    '4°': ['A', 'B', 'C'],
                    '5°': ['A', 'B', 'C']
                }
            },
            {
                nombre: 'Reconquista 775',
                pisos: {
                    '2°': ['D', 'E'],
                    '3°': ['D', 'E'],
                    '4°': ['D', 'E'],
                    '5°': ['D', 'E'],
                    '8°': ['D', 'E']
                }
            }
        ]
    },
    alem: {
        nombre: 'ALEM',
        edificios: [
            {
                nombre: '',
                pisos: {
                    '2°': ['K', 'L', 'M', 'N', 'O', 'P', 'Q']
                }
            }
        ]
    },
    cordoba: {
        nombre: 'CÓRDOBA',
        edificios: [
            {
                nombre: 'Sede 637',
                pisos: {
                    '1°': ['F', 'G', 'H'],
                    '2°': ['F', 'G', 'H'],
                    '3°': ['F', 'G', 'H'],
                    '4°': ['F', 'G', 'H']
                }
            }
        ]
    }
};

function Sede() {
    const { sedeId } = useParams();
    const navigate = useNavigate();
    const sede = sedesData[sedeId];

    if (!sede) {
        return <h2>Sede no encontrada</h2>;
    }

    return (
        <div className="sede-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate('/')}><span className="material-icons">arrow_back</span></button>
                <h1>{sede.nombre}</h1>
                <span className="material-icons">info</span>
            </div>

            {sede.edificios.map((edificio, idx) => (
                <div key={idx} className="edificio">
                    {edificio.nombre && <h2>{edificio.nombre}</h2>}
                    {Object.entries(edificio.pisos).map(([piso, aulas], idx2) => (
                        <div key={idx2} className="piso">
                            <h3>{piso}</h3>
                            <div className="aulas">
                                {aulas.map((aula, idx3) => (
                                    <div
                                        key={idx3}
                                        className="aula"
                                        onClick={() => navigate(`/aula/${piso.replace('°', '')}${aula}`)}
                                    >
                                        {aula}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {sedeId === 'cordoba' && (
                <div className="seminarios">
                    <button className="seminarios-button">Cenem</button>
                    <span className="material-icons info-icon">info</span>
                </div>
            )}
        </div>
    );
}

export default Sede;
