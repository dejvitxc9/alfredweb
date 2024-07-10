import "./ItemFilm.css";
import star from "../../../pictures/star.png";

function ItemFilm(props) {
  return (
    <div className="item-film">
      <section>
        <p>{props.filmData.id}</p>
      </section>
      <section>
        <img
          className="item-poster"
          src={props.filmData.plakat}
          alt={props.filmData.tytul}
        ></img>
      </section>
      <section>
        {" "}
        <h1>{props.filmData.tytul}</h1>
        <h3>{props.filmData.rezyser}{" : "}{props.filmData.rok}</h3>
        <h4>Gatunek:{" "}{props.filmData.gatunek.map((gatunek)=>gatunek+", ")}</h4>
      </section>
      <section>
        <img src={star} className="gwiazdka" alt="ocena"></img>
        <p className="ocena-tekst">{props.filmData.ocena}</p>
      </section>
    </div>
  );
}

export default ItemFilm;
