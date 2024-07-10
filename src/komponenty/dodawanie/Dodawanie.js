import { useState, useEffect } from "react";
import "./Dodawanie.css";
import { useNavigate } from "react-router-dom";

function Dodawanie(props) {
  const navigate = useNavigate();
  const [tytul, setTytul] = useState("");
  const [rok, setRok] = useState("");
  const [ocena, setOcena] = useState("");
  const [opis, setOpis] = useState("");
  const [gatunek, setGatunek] = useState([]);
  const [rezyser, setRezyser] = useState("");
  const [plakatURL, setPlakatURL] = useState(
    "https://cdn-icons-png.flaticon.com/128/5762/5762943.png"
  );
  const [tekstGuzika, setTekstGuzika] = useState("Dodaj film");

  useEffect(() => {
    if (!props.adding) {
      setTekstGuzika("Zatwierdź");
      setTytul(props.aktualneDaneFilmu.tytul);
      setRok(props.aktualneDaneFilmu.rok);
      setOcena(props.aktualneDaneFilmu.ocena);
      setOpis(props.aktualneDaneFilmu.opis);
      setRezyser(props.aktualneDaneFilmu.rezyser);
      setGatunek(props.aktualneDaneFilmu.gatunek);
      setPlakatURL(props.aktualneDaneFilmu.plakat);
      const gatunki = document.formularz.gatunek;
      for (let i = 0; i < gatunki.length; i++) {
        if (props.aktualneDaneFilmu.gatunek.includes(gatunki[i].value)) {
          gatunki[i].checked = true;
        }
      }
      console.log(gatunek);
    }
  }, [props.adding, props.aktualneDaneFilmu]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const gatunki = document.formularz.gatunek;
    const zaznaczoneGatunki = [];

    for (let i = 0; i < gatunki.length; i++) {
      if (gatunki[i].checked) {
        zaznaczoneGatunki.push(gatunki[i].value);
      }
    }
    setGatunek(zaznaczoneGatunki);

    if (props.adding) {
      const nowyFilm = {
        id: props.idNowego + 1,
        tytul: tytul,
        rok: rok,
        ocena: ocena,
        opis: opis,
        gatunek: zaznaczoneGatunki,
        rezyser: rezyser,
        plakat: plakatURL,
      };

      console.log(nowyFilm);
      props.addFilm(nowyFilm);
    }

    if (!props.adding) {
      const zaktualizowanyFilm = {
        id: props.aktualneDaneFilmu.id,
        tytul: tytul,
        rok: rok,
        ocena: ocena,
        opis: opis,
        gatunek: zaznaczoneGatunki,
        rezyser: rezyser,
        plakat: plakatURL,
      };
      props.editFilm(zaktualizowanyFilm);

      navigate("/filmy");
    }
    setTytul("");
    setRok("");
    setOcena("");
    setOpis("");
    setRezyser("");
    setPlakatURL("https://cdn-icons-png.flaticon.com/128/5762/5762943.png");
  };
  return (
    <>
      <img
        src={plakatURL}
        alt="podgląd zdjęcia"
        className="plakat-showcase"
      ></img>
      <form onSubmit={handleSubmit} name="formularz" className="formularz">
        <label>
          Tytuł:
          <input
            type="text"
            name="tytul"
            className="input-bootstrap"
            value={tytul}
            onChange={(e) => setTytul(e.target.value)}
            placeholder="Tytuł filmu"
            required
          />
        </label>

        <div>
          <label className="liczby">
            Rok:
            <input
              type="number"
              name="rok"
              className="input-bootstrap"
              value={rok}
              min={1920}
              max={2030}
              onChange={(e) => setRok(e.target.value)}
              placeholder="Rok produkcji"
              required
            />
          </label>

          <label className="liczby">
            Ocena:
            <input
              type="number"
              name="ocena"
              className="input-bootstrap"
              value={ocena}
              min={0}
              max={10}
              step={0.1}
              placeholder="Ocena filmu"
              onChange={(e) => setOcena(e.target.value)}
            />
          </label>
        </div>

        <label htmlFor="opis">Opis:</label>
        <textarea
          id="opis"
          name="opis"
          className="opis-bootstrap"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          placeholder="Opis filmu, zarys fabuły lub ciekawostki na temat powstawania"
        />

        <div>Gatunek:</div>
        <div class="gatunek-container">
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Dramat" /> Dramat
          </label>
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Komedia" /> Komedia
          </label>
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Akcja" /> Akcja
          </label>
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Thriller" /> Thriller
          </label>
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Sci-Fi" /> Sci-Fi
          </label>
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Przygodowy" />{" "}
            Przygodowy
          </label>
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Romans" /> Romans
          </label>
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Fantasy" /> Fantasy
          </label>
          <label class="gatunek-item">
            <input type="checkbox" name="gatunek" value="Animowany" /> Animowany
          </label>
        </div>

        <label>
          Reżyser:
          <input
            type="text"
            name="rezyser"
            className="input-bootstrap"
            value={rezyser}
            onChange={(e) => setRezyser(e.target.value)}
            placeholder="Imie i nazwisko reżysera/reżyserów"
          />
        </label>

        <label>
          Plakat:
          <input
            type="url"
            name="plakat"
            placeholder="Adres URL do plakatu"
            className="input-bootstrap"
            value={plakatURL}
            onChange={(e) => setPlakatURL(e.target.value)}
          />
        </label>

        <button type="submit" className="btn-gr">
          {tekstGuzika}
        </button>
      </form>
    </>
  );
}

export default Dodawanie;
