import "./InfoFilm.css";
import star from "../../pictures/star.png";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc, addDoc, where ,query, getDocs, collection} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { useEffect, useState } from "react";

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

  const [commenterName, setCommenterName] = useState();
  const [commenterContent, setCommenterContent] = useState();
  const [commenterRating, setCommenterRating] = useState();
  const [comments, setComments] = useState([]);

  const fetchAllCommentsAndFilter = async () => {
    try {
      const collCommentRef = collection(firestore, "comments");
      const q = query(collCommentRef, where("movieId", "==", movieId));
      const queryCommentSnapchot = await getDocs(q);

      const allcommetsData = queryCommentSnapchot.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(allcommetsData);

      setComments(allcommetsData);
    } catch (error) {
      alert("Jakieś gówno");
    }
  };

  const addCommentHandle = async (e) => {
    e.preventDefault();

    const newComment = {
      movieId: movieId,
      name: commenterName,
      content: commenterContent,
      rating: commenterRating,
    };
    try {
      const collCommentRef = collection(firestore, "comments");
      const addCommentToFirestore = await addDoc(collCommentRef, newComment);
      fetchAllCommentsAndFilter();
    } catch (error) {
      console.error("Błąd przy dodawaniu dokumentu: ", error);
      alert("Wystąpił błąd przy dodawaniu komentarza.");
    }

    setCommenterName("");
    setCommenterContent("");
    setCommenterRating("");
  };

  useEffect(() => {
    fetchAllCommentsAndFilter();
  }, []);

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
            <section className="movie-data-grid">
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
      <section className="movie-describtion-container">
        <p className="movie-describtion">{movieData.describtion}</p>
        <code className="id-describe">ID:{movieId}</code>
      </section>
      <section className="comment-section">
        <h2>Komentarze:</h2>
        <div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div className="comment-body" key={index}>
                <p className="comment-author">
                  <span>{comment.name}</span> przyznał ocenę{" "}
                  <span>{comment.rating}/10</span>
                </p>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          ) : (
            <p>Nie ma jeszcze komentarzy, bądź pierwszy</p>
          )}
        </div>
        <h3>Dodaj komentarz:</h3>
        <form
          method="post"
          name="commenterAdder"
          id="commenterAdder"
          onSubmit={addCommentHandle}
        >
          <div className="row mb-4">
            <div className="col-md-3">
              <label htmlFor="commenterName" className="form-label">
                Nazwa:
              </label>
              <input
                type="text"
                id="commenterName"
                name="commenterName"
                className="form-control"
                placeholder="Nazwa użytkownika"
                value={commenterName}
                maxLength={31}
                onChange={(e) => setCommenterName(e.target.value)}
                required
              ></input>
              <label htmlFor="commenterRating" className="form-label">
                Ocena:
              </label>
              <input
                type="number"
                id="commenterRating"
                name="commenterRating"
                min={1}
                max={10}
                step={1}
                className="form-control"
                placeholder="Ocena filmu"
                value={commenterRating}
                onChange={(e) => setCommenterRating(e.target.value)}
                required
              ></input>
            </div>

            <div className="col-md-8">
              <label htmlFor="commenterContent" className="form-label">
                Komentarz:
              </label>
              <textarea
                id="commenterContent"
                name="commenterContent"
                className="form-control"
                placeholder="Twój komentarz, recenzja, ocena filmu"
                value={commenterContent}
                onChange={(e) => setCommenterContent(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="col-mb-1">
            <button type="submit" className="btn btn-success">
              Dodaj komentarz
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default InfoFilm;
