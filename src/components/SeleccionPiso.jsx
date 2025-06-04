import { useNavigate, useParams } from 'react-router-dom';
import '../styles/SeleccionPiso.scss';

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

  return (
    <div className="seleccion-piso-container">
      <div className="top-bar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h1>{mostrarNombreSede()}</h1>
      </div>

      <p className="subtitulo">Seleccioná el piso</p>

      <div className="pisos-grid">
        {pisos.map((piso) => (
          <button key={piso} onClick={() => handleIrAPiso(piso)} className="piso-button">
            Piso {piso}
          </button>
        ))}
      </div>
    </div>
  );
}
