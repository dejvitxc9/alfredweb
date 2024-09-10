import "./ListaFilmow.css";
import { Link } from "react-router-dom";
import ItemFilm from "./itemfilm/ItemFilm";

function ListaFilmow({ moviesData }) {
  return (
    <div className="lista-page">
      <main className="lista-main">
        {moviesData.length > 0 ? (
          moviesData.map((movieData, index) => (
            <Link className="item-nie-link" key={index} to={movieData.id}>
              <ItemFilm movieData={movieData} index={index} />
            </Link>
          ))
        ) : (
          <p>W bazie danych nie ma jeszce żadnych filmów.</p>
        )}
      </main>
    </div>
  );
}

export default ListaFilmow;
