import { useNavigate, useParams } from 'react-router-dom';
import '../styles/SeleccionPiso.scss';
import { Clock, ArrowLeft } from 'lucide-react';

export default function SeleccionPiso() {
  const navigate = useNavigate();
  const { sede } = useParams();

  let pisos = [];
  if (sede === 'central') pisos = [2, 3, 4, 5];
  if (sede === 'alem') pisos = [2];
  if (sede === 'cordoba') pisos = [1, 2, 3, 4];

  const handleIrAPiso = (piso) => {
    navigate(`/piso/${sede}/${piso}`);
  };

  const mostrarNombreSede = () => {
    if (sede === 'central') return 'CÓRDOBA 374 / RECONQUISTA 775';
    if (sede === 'alem') return 'SEDE ALEM';
    if (sede === 'cordoba') return 'CÓRDOBA 637';
    return sede.toUpperCase();
  };

  const ultimaSync = '14:22 hs'; // Esto se puede hacer dinámico si querés después

  return (
    <div className="seleccion-piso-container">
      <div className="top-bar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="titulo">{mostrarNombreSede()}</h1>
      </div>

      <p className="subtitulo">Pisos disponibles para esta sede:</p>

      <div className="pisos-grid">
        {pisos.map((piso) => (
          <button
            key={piso}
            onClick={() => handleIrAPiso(piso)}
            className="piso-button"
          >
            Piso {piso}
          </button>
        ))}
      </div>

      <div className="sync-info">
        <Clock size={16} /> <span>Última sincronización: {ultimaSync}</span>
      </div>
    </div>
  );
}
