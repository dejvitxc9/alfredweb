import "./ListaFilmow.css";
import { Link, Outlet } from "react-router-dom";
import ItemFilm from "./itemfilm/ItemFilm";

function ListaFilmow(props) {
  return (
    <div className="lista-page">
      <main className="lista-main">
        {props.moviesDataBase.map((uniFilmData) => (
          <Link
            className="item-nie-link"
            to={uniFilmData.id + uniFilmData.tytul + uniFilmData.rok}
          >
            <ItemFilm filmData={uniFilmData} />
          </Link>
        ))}
      </main>
    </div>
  );
}

export default ListaFilmow;
