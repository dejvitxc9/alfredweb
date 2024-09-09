import "./InfoFilm.css";
import star from "../../pictures/star.png";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

function InfoFilm({ movieId, movieData, fetchAndDisplayAllMovieData }) {
  const navigate = useNavigate();

  const docRef = doc(firestore, "movie", movieId);

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
    <div className="info-film-page">
      <main className="film-main">
        <section className="blok-tytulu">
          <img
            className="film-poster"
            src={movieData.poster}
            alt={movieData.title}
          ></img>
          <h1 className="tytul-filmu">{movieData.title}</h1>
          <h2>{movieData.year}</h2>
          <section className="dane-filmu">
            <section className="ocena-filmu">
              <img src={star} className="gwiazdka" alt="ocena"></img>
              <p className="ocena-tekst">{movieData.rates}</p>
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
        <section className="opis-filmu">
          <p>{movieData.describtion}</p>
          <p>ID:{movieId}</p>
        </section>

        <section className="guziki-administracyjne">
          <Link to={`/filmy/${movieId}/edycja`} className="guzik-nie-link">
            <div className="btn btn-success guzik-edycja">Edytuj</div>
          </Link>
          <div className="btn btn-danger guzik-edycja" onClick={usuniecieFilmu}>
            Usuń
          </div>
        </section>
      </main>
    </div>
  );
}

export default InfoFilm;
