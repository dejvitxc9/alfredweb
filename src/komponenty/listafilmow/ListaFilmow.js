import "./ListaFilmow.css";
import { Link, Outlet } from "react-router-dom";
import ItemFilm from "./itemfilm/ItemFilm";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../../firebaseConfig.js";
import { useEffect, useState } from "react";

function ListaFilmow({moviesData}) {
  

  return (
    <div className="lista-page">
      <main className="lista-main">
        {moviesData.map((movieData, index) => (
          <Link className="item-nie-link" key={index} to={movieData.id}>
            <ItemFilm movieData={movieData} index={index} />
          </Link>
        ))}
      </main>
    </div>
  );
}

export default ListaFilmow;
