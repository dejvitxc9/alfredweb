import "./ItemFilm.css";
import star from "../../../pictures/star.png";

function ItemFilm({ movieData, index }) {
  return (
    <div className="item-film">
      <section>
        <p>{index + 1}</p>
      </section>
      <section>
        <img
          className="item-poster"
          src={movieData.poster}
          alt={movieData.title}
        ></img>
      </section>
      <section>
        {" "}
        <h1>{movieData.title}</h1>
        <h3>
          {movieData.director}
          {" : "}
          {movieData.year}
        </h3>
        <h4>Gatunek: {movieData.genre.map((genre) => genre + ", ")}</h4>
      </section>
      <section>
        <img src={star} className="gwiazdka" alt="ocena"></img>
        <p className="ocena-tekst">{movieData.rates}</p>
      </section>
    </div>
  );
}

export default ItemFilm;
