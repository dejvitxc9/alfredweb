import "./InfoFilm.css";
import star from "../../pictures/star.png";
import { Link, useNavigate } from "react-router-dom";

function InfoFilm(props) {
  const navigate = useNavigate();
  const usuniecieFilmu = () => {
    props.usuniecieFilmu(props.filmData.id);
    navigate("/filmy");
  };

  return (
    <div className="info-film-page">
      <main className="film-main">
        <section className="blok-tytulu">
          <img
            className="film-poster"
            src={props.filmData.plakat}
            alt={props.filmData.tytul}
          ></img>
          <h1 className="tytul-filmu">{props.filmData.tytul}</h1>
          <h2>{props.filmData.rok}</h2>
          <p>ID:{props.filmData.id}</p>
          <section className="dane-filmu">
            <section className="ocena-filmu">
              <img src={star} className="gwiazdka" alt="ocena"></img>
              <p className="ocena-tekst">{props.filmData.ocena}</p>
            </section>
            <section className="parametry-filmu">
              <div class="grid-item">Reżyser:</div>
              <div class="grid-item">{props.filmData.rezyser}</div>
              <div class="grid-item">Gatunek:</div>
              <div class="grid-item">
                {props.filmData.gatunek.map((gatunek) => gatunek + ", ")}
              </div>
            </section>
          </section>
        </section>
        <section className="opis-filmu">
          <p>{props.filmData.opis}</p>
        </section>

        <section className="guziki-administracyjne">
          <Link
            to={
              "/filmy/" +
              props.filmData.id +
              props.filmData.tytul +
              props.filmData.rok +
              "/edycja"
            }
            className="guzik-nie-link"
          >
            <div className="btn-gr guzik-edycja">Edytuj</div>
          </Link>
          <div className="btn-red guzik-edycja" onClick={usuniecieFilmu}>
            Usuń
          </div>
        </section>
      </main>
    </div>
  );
}

export default InfoFilm;
