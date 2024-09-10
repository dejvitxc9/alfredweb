import "./App.css";
import "bootstrap/dist/css//bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Powitalny from "./komponenty/powitalny/Powitalny";
import StronaGlowna from "./komponenty/stronaglowna/StronaGlowna";
import Dodawanie from "./komponenty/dodawanie/Dodawanie";
import ListaFilmow from "./komponenty/listafilmow/ListaFilmow";
import InfoFilm from "./komponenty/infofilm/InfoFilm";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

function App() {
  const [moviesData, setMoviesData] = useState([]);

  async function fetchAndDisplayAllMovieData() {
    try {
      const collectionRef = collection(firestore, "movies");
      const querySnapchot = await getDocs(collectionRef);

      const queryData = querySnapchot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMoviesData(queryData);
    } catch (error) {
      console.log("Podczas ładowania danych wystąpił błąd: ", error);
    }
  }

  useEffect(() => {
    fetchAndDisplayAllMovieData();
  }, []);

  // function edytuj(zedytowany) {
  //   const updatedFilmy = dbfilmy.map((film) => {
  //     if (film.id === zedytowany.id) {
  //       return { ...film, ...zedytowany };
  //     }
  //     return film;
  //   });

  //   setdbfilmy(updatedFilmy);
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StronaGlowna />}>
          <Route index element={<Powitalny />}></Route>
          <Route path={"/home"} element={<Powitalny />}></Route>
          <Route
            path={"/filmy"}
            element={<ListaFilmow moviesData={moviesData} />}
          ></Route>
          <Route
            path={"/dodawanie"}
            element={
              <Dodawanie
                editing={false}
                fetchAndDisplayAllMovieData={fetchAndDisplayAllMovieData}
              />
            }
          ></Route>

          {moviesData.map((unitFilmData, index) => (
            <>
              <Route
                key={index}
                path={"/filmy/" + unitFilmData.id}
                element={
                  <InfoFilm
                    movieId={unitFilmData.id}
                    movieData={unitFilmData}
                    fetchAndDisplayAllMovieData={fetchAndDisplayAllMovieData}
                  />
                }
              ></Route>
              <Route
                key={index + "edycja"}
                path={`/filmy/${unitFilmData.id}/edycja`}
                element={
                  <Dodawanie
                    editing={true}
                    movieId={unitFilmData.id}
                    movieData={unitFilmData}
                    fetchAndDisplayAllMovieData={fetchAndDisplayAllMovieData}
                  />
                }
              ></Route>
            </>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
