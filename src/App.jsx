import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [nuevaPelicula, setNuevaPelicula] = useState({
    titulo: '',
    fechaEstreno: '',
    productor: '',
    portada: ''
  });
  const [peliculaEditando, setPeliculaEditando] = useState(null);

  // URL de MockAPI
  const URL_PELICULAS = 'https://66fd5e87699369308954eeed.mockapi.io/api/v1/Pelicula';

  // Obtener la lista de película
  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const respuesta = await axios.get(URL_PELICULAS);
        setPeliculas(respuesta.data);
      } catch (error) {
        console.error('Error al obtener las películas', error);
      }
    };
    obtenerPeliculas();
  }, []);

  // Manejar los cambios en el form
  const Cambio = (e) => {
    setNuevaPelicula({
      ...nuevaPelicula,
      [e.target.name]: e.target.value,
    });
  };

  // Agregar una nueva película
  const AgregarPelicula = async () => {
    try {
      const respuesta = await axios.post(URL_PELICULAS, nuevaPelicula);
      setPeliculas([...peliculas, respuesta.data]);
      setNuevaPelicula({ titulo: '', fechaEstreno: '', productor: '', portada: '' });
    } catch (error) {
      console.error('Error al agregar la película', error);
    }
  };

  // Manejar la edición
  const EditarPelicula = (pelicula) => {
    setPeliculaEditando(pelicula);
    setNuevaPelicula(pelicula);
  };

  // Actualizar una película existente
  const ActualizarPelicula = async () => {
    try {
      const respuesta = await axios.put(`${URL_PELICULAS}/${peliculaEditando.id}`, nuevaPelicula);
      setPeliculas(peliculas.map((pelicula) =>
        pelicula.id === peliculaEditando.id ? respuesta.data : pelicula
      ));
      setPeliculaEditando(null);
      setNuevaPelicula({ titulo: '', fechaEstreno: '', productor: '', portada: '' });
    } catch (error) {
      console.error('Error al actualizar la película', error);
    }
  };

  // Eliminar una película
  const EliminarPelicula = async (id) => {
    try {
      await axios.delete(`${URL_PELICULAS}/${id}`);
      setPeliculas(peliculas.filter((pelicula) => pelicula.id !== id));
    } catch (error) {
      console.error('Error al eliminar la película', error);
    }
  };

  return (
    <div>
      <h1>Lista de películas vistas</h1>

      {/* Menú */}
      <div className="menu">
        <h2>{peliculaEditando ? 'Editar película' : 'Agregar película'}</h2>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={nuevaPelicula.titulo}
          onChange={Cambio}
        />
        <input
          type="text"
          name="fechaEstreno"
          placeholder="Fecha de Estreno"
          value={nuevaPelicula.fechaEstreno}
          onChange={Cambio}
        />
        <input
          type="text"
          name="productor"
          placeholder="Productor"
          value={nuevaPelicula.productor}
          onChange={Cambio}
        />
        <input
          type="text"
          name="portada"
          placeholder="URL de la portada"
          value={nuevaPelicula.portada}
          onChange={Cambio}
        />
        <button onClick={peliculaEditando ? ActualizarPelicula : AgregarPelicula}>
          {peliculaEditando ? 'Actualizar Película' : 'Agregar Película'}
        </button>
      </div>

      {/* Mostrar la lista de películas */}
      <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id}>
            {pelicula.portada && (
              <img
                src={pelicula.portada}
                alt={`Portada de ${pelicula.titulo}`}
                style={{ width: '100px', height: '150px' }}
              />
            )}
            <h3>{pelicula.titulo}</h3>
            <p>Fecha de estreno: {pelicula.fechaEstreno}</p>
            <p>Productor: {pelicula.productor}</p>
            <button onClick={() => EditarPelicula(pelicula)}>Editar</button>
            <button onClick={() => EliminarPelicula(pelicula.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
