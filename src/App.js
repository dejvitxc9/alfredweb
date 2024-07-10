import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Powitalny from "./komponenty/powitalny/Powitalny";
import StronaGlowna from "./komponenty/stronaglowna/StronaGlowna";
import Dodawanie from "./komponenty/dodawanie/Dodawanie";
import ListaFilmow from "./komponenty/listafilmow/ListaFilmow";
import InfoFilm from "./komponenty/infofilm/InfoFilm";


function App() {
  const bazaStartowa = [
    {
      id: 1,
      tytul: "Incepcja",
      rok: 2010,
      ocena: 8.8,
      opis: "Złodziej, który kradnie korporacyjne tajemnice za pomocą technologii dzielenia się snami, otrzymuje odwrotnie postawione zadanie zasadzenia pewnego pomysłu w umyśle dyrektora generalnego.",
      gatunek: ["Akcja", "Przygodowy", "Sci-Fi"],
      rezyser: "Christopher Nolan",
      plakat: "https://fwcdn.pl/fpo/08/91/500891/7503357.6.jpg",
    },
    {
      id: 2,
      tytul: "Matrix",
      rok: 1999,
      ocena: 8.7,
      opis: "Haker komputerowy dowiaduje się od tajemniczych buntowników o prawdziwej naturze swojej rzeczywistości i swojej roli w wojnie przeciwko jej kontrolerom.",
      gatunek: ["Akcja", "Sci-Fi"],
      rezyser: "Lana Wachowski, Lilly Wachowski",
      plakat: "https://fwcdn.pl/fpo/06/28/628/7685907.2.jpg",
    },
    {
      id: 3,
      tytul: "Forrest Gump",
      rok: 1994,
      ocena: 8.8,
      opis: "Prezydentury Kennedy'ego i Johnsona, wojna w Wietnamie, afera Watergate i inne historyczne wydarzenia ukazane z perspektywy człowieka z Alabamy o IQ 75, którego jedynym pragnieniem jest ponowne spotkanie z ukochaną z dzieciństwa.",
      gatunek: ["Dramat", "Romans"],
      rezyser: "Robert Zemeckis",
      plakat: "https://fwcdn.pl/cpo/04/87/487/412_1.3.jpg",
    },
    {
      id: 4,
      tytul: "Spider-Man: Poprzez multiwersum",
      rok: 2018,
      ocena: 8.4,
      opis: "Młody Miles Morales staje się Spider-Manem swojego wymiaru i musi połączyć siły z pięcioma innymi postaciami z innych wymiarów, które również posiadają moce pająka, aby powstrzymać zagrożenie dla wszystkich rzeczywistości.",
      gatunek: ["Animowany", "Akcja", "Przygodowy"],
      rezyser: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
      plakat: "https://fwcdn.pl/fpo/28/26/842826/8068847.6.jpg",
    },
  ];
  const [dbfilmy, setdbfilmy] = useState(bazaStartowa);

  function updateFilmy(newFilm) {
    setdbfilmy([...dbfilmy, newFilm]);
  }

  function edytuj(zedytowany) {
    const updatedFilmy = dbfilmy.map((film) => {
      if (film.id === zedytowany.id) {
        return { ...film, ...zedytowany };
      }
      return film;
    });

    setdbfilmy(updatedFilmy);
  }

  function usuniecieFilmu(idUsuniecia) {
    const updatedFilmy = dbfilmy.filter((film) => film.id !== idUsuniecia);
    setdbfilmy(updatedFilmy);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StronaGlowna />}>
          <Route index element={<Powitalny />}></Route>
          <Route path={"/home"} element={<Powitalny />}></Route>
          <Route
            path={"/filmy"}
            element={<ListaFilmow moviesDataBase={dbfilmy} />}
          ></Route>
          <Route
            path={"/dodawanie"}
            element={
              <Dodawanie
                addFilm={updateFilmy}
                idNowego={ dbfilmy[dbfilmy.length-1].id }
                adding={true}
              />
            }
          ></Route>

          {dbfilmy.map((unitFilmData) => (
            <>
              <Route
                key={unitFilmData.id + unitFilmData.tytul + unitFilmData.rok}
                path={
                  "/filmy/" +
                  unitFilmData.id +
                  unitFilmData.tytul +
                  unitFilmData.rok
                }
                element={
                  <InfoFilm
                    filmData={unitFilmData}
                    usuniecieFilmu={usuniecieFilmu}
                  />
                }
              ></Route>
              <Route
                key={unitFilmData.id + unitFilmData.tytul + unitFilmData.rok}
                path={
                  "/filmy/" +
                  unitFilmData.id +
                  unitFilmData.tytul +
                  unitFilmData.rok +
                  "/edycja"
                }
                element={
                  <Dodawanie
                    editFilm={edytuj}
                    aktualneDaneFilmu={unitFilmData}
                    adding={false}
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
