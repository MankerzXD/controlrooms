import '../styles/ModalComentario.scss';

export default function ModalComentario({ profesor, materia, aula, horario, comentario, setComentario, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-comentario" onClick={(e) => e.stopPropagation()}>
        <div className='header-modal'>
            <h2 className="modal-titulo">{profesor} - {materia}</h2>
            <p className="modal-subtitulo">{aula} {horario}</p>
        </div>

        <button className="cerrar-btn" onClick={onClose}>×</button>
        <div className="prioridades">
          <button className="prioridad">Urgente</button>
          <button className="prioridad">Alta</button>
          <button className="prioridad">Media</button>
        </div>

        <textarea className='comentario-textarea'
          placeholder="Escribí tu comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <div className='Container-send'>
            <button className="enviar-btn" onClick={onClose}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
