import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/aula.scss';
import { Lock } from 'lucide-react';

const mockData = [
  {
    nombre: "2ºA",
    clases: [
      { estado: "Abierta", horario: "08:00 - 10:00", modalidad: "Presencial", color: "green" },
      { estado: "Pendiente", horario: "08:00 - 10:00", modalidad: "Presencial", color: "yellow" },
    ],
  },
  {
    nombre: "2ºB",
    clases: [
      { estado: "Abierta", horario: "08:00 - 10:00", modalidad: "Presencial", color: "green" },
      { estado: "Pendiente", horario: "08:00 - 10:00", modalidad: "Presencial", color: "yellow" },
    ],
  },
  {
    nombre: "2ºC",
    clases: [],
  },
];

export default function Aula() {
  const navigate = useNavigate();
  const { sede, pisoId } = useParams();

  const mostrarNombreSede = () => {
    if (sede === 'central') return 'CÓRDOBA 374 / RECONQUISTA 775';
    if (sede === 'alem') return 'SEDE ALEM';
    if (sede === 'cordoba') return 'CÓRDOBA 637';
    return sede.toUpperCase();
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
              <Lock size={16} className="lock-icon" />
            </div>

            {aula.clases.length > 0 ? (
              <div className="aula-detalle">
                {aula.clases.map((clase, idx) => (
                  <div key={idx} className="detalle-row">
                    <div className="estado-circle" style={{ backgroundColor: clase.color }}></div>
                    <span>{aula.nombre}</span>
                    <span>{clase.horario}</span>
                    <span className="modalidad">{clase.modalidad}</span>
                  </div>
                ))}
                <button className="ver-mas">Ver más</button>
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
