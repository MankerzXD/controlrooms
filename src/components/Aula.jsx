import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/aula.scss';
import { Lock, Unlock, MessageSquare } from 'lucide-react';

const generarMockData = (sede, piso) => {
  const aulasPorSedeYPiso = {
    central: {
      2: ['2ºA', '2ºB', '2ºC', '2ºD', '2ºE'],
      3: ['3ºA', '3ºB', '3ºC', '3ºD', '3ºE'],
      4: ['4ºA', '4ºB', '4ºC', '4ºD', '4ºE'],
      5: ['5ºA', '5ºB', '5ºC', '5ºD', '5ºE']
    },
    cordoba: {
      1: ['1ºF', '1ºG', '1ºH'],
      2: ['2ºF', '2ºG', '2ºH'],
      3: ['3ºG', '3ºH'],
      4: ['4ºF', '4ºG', '4ºH', '4ºI']
    },
    alem: {
      2: ['K', 'L', 'M', 'N', 'O', 'P', 'Q']
    }
  };

  const horarios = [
    '08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00',
    '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00', '21:00 - 23:00'
  ];
  const modalidades = ['Presencial', 'Híbrida'];
  const estados = ['Abierta', 'Pendiente', 'Finalizado'];

  const aulas = (aulasPorSedeYPiso[sede] && aulasPorSedeYPiso[sede][piso]) || [];
  const data = aulas.map((aula) => {
    const cantidadClases = Math.floor(Math.random() * 6) + 2;
    const clases = Array.from({ length: cantidadClases }, (_, idx) => {
      const modalidad = modalidades[Math.floor(Math.random() * modalidades.length)];
      return {
        estado: estados[Math.floor(Math.random() * estados.length)],
        horario: horarios[idx % horarios.length],
        modalidad,
        modalidadCorta: modalidad.toLowerCase().startsWith('presencial') ? 'P' : 'H',
        color: ['green', 'yellow', 'gray'][Math.floor(Math.random() * 3)]
      };
    });
    return { nombre: aula, clases };
  });

  return data;
};

export default function Aula() {
  const navigate = useNavigate();
  const { sede, pisoId } = useParams();
  const piso = parseInt(pisoId);
  const [mockData, setMockData] = useState([]);
  const [expandir, setExpandir] = useState({});

  useEffect(() => {
    setMockData(generarMockData(sede, piso));
  }, [sede, piso]);

  const mostrarNombreSede = () => {
    if (sede === 'central') return 'CÓRDOBA 374 / RECONQUISTA 775';
    if (sede === 'alem') return 'SEDE ALEM';
    if (sede === 'cordoba') return 'CÓRDOBA 637';
    return sede.toUpperCase();
  };

  const toggleVerMas = (index) => {
    setExpandir((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="container-infoaulas">
      <div className="top-bar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="text-center text-red-800">
          {mostrarNombreSede()} - Piso {pisoId}
        </h1>
      </div>

      <div className="horarios">
        {mockData.map((aula, index) => (
          <div key={index} className="aula-card">
            <div className="aula-header">
              <h2>Aula {aula.nombre}</h2>
              {aula.clases.length > 0 ? (
                <Unlock size={16} className="lock-icon text-green-600" />
              ) : (
                <Lock size={16} className="lock-icon text-gray-400" />
              )}
            </div>

            {aula.clases.length > 0 ? (
              <div className="aula-detalle">
                {aula.clases.slice(0, expandir[index] ? aula.clases.length : 2).map((clase, idx) => (
                  <div key={idx} className="detalle-row">
                    <div className="estado-selector-wrapper">
                      <div className='ContainerState'>
                        <div className="estado-circle" style={{ backgroundColor: clase.color }}></div>
                        <select className="estado-selector">
                          <option value="Abierta">Abierta</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Finalizado">Finalizado</option>
                        </select>
                      </div>
                    </div>
                    <span>{clase.horario}</span>
                    <span className="modalidad">{clase.modalidadCorta}</span>
                  </div>
                ))}
                {aula.clases.length > 2 && (
                  <button className="ver-mas" onClick={() => toggleVerMas(index)}>
                    {expandir[index] ? 'Ver menos' : 'Ver más'}
                  </button>
                )}
              </div>
            ) : (
              <div className="sin-clases">
                <span>📭 Sin Clases Asignada</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}