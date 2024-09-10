import { useState, useEffect } from "react";
import "./Dodawanie.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore } from "../../firebaseConfig.js";

function Dodawanie({
  fetchAndDisplayAllMovieData,
  editing,
  movieId,
  movieData,
}) {
  const navigate = useNavigate();
  const [tytul, setTytul] = useState("");
  const [rok, setRok] = useState("");
  const [ocena, setOcena] = useState("");
  const [opis, setOpis] = useState("");
  const [rezyser, setRezyser] = useState("");
  const [tekstGuzika, setTekstGuzika] = useState("Dodaj film");
  const [moviePosterURL, setMoviePosterURL] = useState("");

  useEffect(() => {
    const genreButtons = document.formularz.gatunek;

    if (editing) {
      setTytul(movieData.title);
      setRok(movieData.year);
      setOcena(movieData.rating);
      setOpis(movieData.describtion);
      setRezyser(movieData.director);
      setTekstGuzika("Zakualizuj");
      setMoviePosterURL(movieData.poster);

      const choosenGenre = movieData.genre;

      for (let i = 0; i < choosenGenre.length; i++) {
        for (let l = 0; l < genreButtons.length; l++) {
          if (choosenGenre[i] === genreButtons[l].value) {
            genreButtons[l].checked = true;
            console.log(genreButtons[l].value);
          }
        }
      }
    } else {
      setTytul("");
      setRok("");
      setOcena("");
      setOpis("");
      setRezyser("");
      setTekstGuzika("Dodaj film");
      for (let l = 0; l < genreButtons.length; l++) {
        genreButtons[l].checked = false;
      }
    }
  }, [editing]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const gatunki = document.formularz.gatunek;
      const zaznaczoneGatunki = [];

      for (let i = 0; i < gatunki.length; i++) {
        if (gatunki[i].checked) {
          zaznaczoneGatunki.push(gatunki[i].value);
        }
      }

      if (zaznaczoneGatunki.length === 0) {
        alert("Nie wybrałeś gatunku filmu, zrób to teraz.");
        return 0;
      }

      const colRef = collection(firestore, "movies");

      if (editing) {
        const docRef = doc(firestore, "movies", movieId);
        await updateDoc(docRef, {
          title: tytul,
          year: rok,
          rating: ocena,
          describtion: opis,
          genre: zaznaczoneGatunki,
          poster: movieData.poster,
          director: rezyser,
        });
      } else {
        const storage = getStorage();
        const moviePoster = document.formularz.formFile.files[0];

        const storageRef = ref(storage, `posters/${moviePoster.name}`);
        await uploadBytes(storageRef, moviePoster);
        const downloadURL = await getDownloadURL(storageRef);
        await addDoc(colRef, {
          title: tytul,
          year: rok,
          rating: ocena,
          describtion: opis,
          genre: zaznaczoneGatunki,
          poster: downloadURL,
          director: rezyser,
        });
      }
      fetchAndDisplayAllMovieData();
      navigate("/filmy");
    } catch (error) {
      console.error("Błąd przy dodawaniu dokumentu: ", error);
      alert("Wystąpił błąd przy dodawaniu filmu.");
    }
  };

  return (
    <>
      {moviePosterURL ? (
        <img
          src={moviePosterURL}
          alt="podgląd zdjęcia"
          className="plakat-showcase"
        ></img>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit} name="formularz" className="formularz">
        <div className="mb-3">
          <label htmlFor="tytul" className="form-label">
            Tytuł:
          </label>
          <input
            type="text"
            id="tytul"
            name="tytul"
            className="form-control"
            value={tytul}
            onChange={(e) => setTytul(e.target.value)}
            placeholder="Tytuł filmu"
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="rok" className="form-label">
              Rok:
            </label>
            <input
              type="number"
              id="rok"
              name="rok"
              className="form-control"
              value={rok}
              min="1920"
              max="2030"
              onChange={(e) => setRok(e.target.value)}
              placeholder="Rok produkcji"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ocena" className="form-label">
              Ocena:
            </label>
            <input
              type="number"
              id="ocena"
              name="ocena"
              className="form-control"
              value={ocena}
              min="0"
              max="10"
              step="0.1"
              onChange={(e) => setOcena(e.target.value)}
              placeholder="Ocena filmu"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="opis" className="form-label">
            Opis:
          </label>
          <textarea
            id="opis"
            name="opis"
            className="form-control"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            placeholder="Opis filmu, zarys fabuły lub ciekawostki na temat powstawania"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Gatunek:</label>
          <div className="grid-3x3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Dramat"
                id="dramat"
              />
              <label className="form-check-label" htmlFor="dramat">
                Dramat
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Komedia"
                id="komedia"
              />
              <label className="form-check-label" htmlFor="komedia">
                Komedia
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Akcja"
                id="akcja"
              />
              <label className="form-check-label" htmlFor="akcja">
                Akcja
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Thriller"
                id="thriller"
              />
              <label className="form-check-label" htmlFor="thriller">
                Thriller
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Sci-Fi"
                id="sci-fi"
              />
              <label className="form-check-label" htmlFor="sci-fi">
                Sci-Fi
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Przygodowy"
                id="przygodowy"
              />
              <label className="form-check-label" htmlFor="przygodowy">
                Przygodowy
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Romans"
                id="romans"
              />
              <label className="form-check-label" htmlFor="romans">
                Romans
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Fantasy"
                id="fantasy"
              />
              <label className="form-check-label" htmlFor="fantasy">
                Fantasy
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="gatunek"
                value="Animowany"
                id="animowany"
              />
              <label className="form-check-label" htmlFor="animowany">
                Animowany
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="rezyser" className="form-label">
            Reżyser:
          </label>
          <input
            type="text"
            id="rezyser"
            name="rezyser"
            className="form-control"
            value={rezyser}
            onChange={(e) => setRezyser(e.target.value)}
            placeholder="Imie i nazwisko reżysera/reżyserów"
            required
          />
        </div>
        {editing ? (
          <></>
        ) : (
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Wgraj Plakat Filmu
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              required
            ></input>
          </div>
        )}

        <button type="submit" className="btn-gr">
          {tekstGuzika}
        </button>
      </form>
    </>
  );
}

export default Dodawanie;
