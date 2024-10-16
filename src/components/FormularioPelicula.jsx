import React from 'react';

const FormularioPelicula = ({ peliculaEditar, nuevaPelicula, cambio, agregarPelicula, actualizarPelicula }) => {
  return (
    <div>
      <h2>{peliculaEditar ? 'Editar Película' : 'Agregar Película'}</h2>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={nuevaPelicula.titulo}
        onChange={cambio}
      />
      <input
        type="text"
        name="fechaEstreno"
        placeholder="Fecha de Estreno"
        value={nuevaPelicula.fechaEstreno}
        onChange={cambio}
      />
      <input
        type="text"
        name="productor"
        placeholder="Productor"
        value={nuevaPelicula.productor}
        onChange={cambio}
      />
      <input
        type="text"
        name="portada"
        placeholder="URL de la portada"
        value={nuevaPelicula.portada}
        onChange={cambio}
      />
      <button onClick={peliculaEditar ? actualizarPelicula : agregarPelicula}>
        {peliculaEditar ? 'Actualizar Película' : 'Agregar Película'}
      </button>
    </div>
  );
};

export default FormularioPelicula;
