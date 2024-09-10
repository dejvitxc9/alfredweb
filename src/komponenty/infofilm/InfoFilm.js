import "./InfoFilm.css";
import star from "../../pictures/star.png";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

function InfoFilm({ movieId, movieData, fetchAndDisplayAllMovieData }) {
  const navigate = useNavigate();

  const docRef = doc(firestore, "movies", movieId);

  const usuniecieFilmu = async () => {
    const verifyDelete = window.prompt(
      "Aby usunąć wprowadź nazwę filmu: " + movieData.title
    );
    if (verifyDelete == movieData.title) {
      deleteDoc(docRef);
      fetchAndDisplayAllMovieData();
      navigate("/filmy");
    }
  };

  return (
    <div className="film-container">
      <section className="admin-buttons">
        <Link to={`/filmy/${movieId}/edycja`}>
          <div className="btn btn-success">Edytuj</div>
        </Link>
        <div className="btn btn-danger" onClick={usuniecieFilmu}>
          Usuń
        </div>
      </section>
      <section className="title-container">
        <img
          className="movie-poster"
          src={movieData.poster}
          alt={movieData.title}
        ></img>
        <section>
          <h1>{movieData.title}</h1>
          <h2>{movieData.year}</h2>
        </section>

        <section className="movie-data-container">
          <section className="data-container">
            <section className="rating-container">
              <img src={star} className="star-image" alt="ocena"></img>
              <p className="ocena-tekst">{movieData.rating}</p>
            </section>
            <section className="parametry-filmu">
              <div className="grid-item">Reżyser:</div>
              <div className="grid-item">{movieData.director}</div>
              <div className="grid-item">Gatunek:</div>
              <div className="grid-item">
                {movieData.genre.map((gatunek) => gatunek + ", ")}
              </div>
            </section>
          </section>
        </section>
      </section>
      <section className="opis-filmu">
        <p>{movieData.describtion}</p>
        <code className="id-describe">ID:{movieId}</code>
      </section>
    </div>
  );
}

export default InfoFilm;
