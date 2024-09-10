import "./ItemFilm.css";
import star from "../../../pictures/star.png";

function ItemFilm({ movieData, index }) {
  return (
    <div className="movie-item">
      <section className="index-sec">
        <p>{index + 1}</p>
      </section>
      <section className="poster-sec">
        <img
          className="item-poster"
          src={movieData.poster}
          alt={movieData.title}
        ></img>
      </section>
      <section className="desc-sec">
        {" "}
        <h1>{movieData.title}</h1>
        <h3>
          {movieData.director}
          {" : "}
          {movieData.year}
        </h3>
        <h4>Gatunek: {movieData.genre.map((genre) => genre + ", ")}</h4>
      </section>
      <section className="rating-sec">
        <img src={star} className="star-image" alt="ocena"></img>
        <p className="ocena-tekst">{movieData.rating}</p>
      </section>
    </div>
  );
}

export default ItemFilm;
