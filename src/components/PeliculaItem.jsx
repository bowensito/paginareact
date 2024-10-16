import React from 'react';

const PeliculaItem = ({ pelicula, editarPelicula, eliminarPelicula }) => {
  return (
    <div className="pelicula-item card" style={{ width: '18rem' }}>
      <img
        src={pelicula.portada}
        alt={`Portada de ${pelicula.titulo}`}
        className="card-img-top"
      />
      <div className="card-body">
        <h3 className="card-title">{pelicula.titulo}</h3>
        <p className="card-text">Fecha de Estreno: {pelicula.fechaEstreno}</p>
        <p className="card-text">Productor: {pelicula.productor}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={() => editarPelicula(pelicula)}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={() => eliminarPelicula(pelicula.id)}>
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeliculaItem;
