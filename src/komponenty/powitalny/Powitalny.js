import "./Powitalny.css";
import pepe from "../../pictures/pepe.png";

function Powitalny() {
  const zalety = [
    "Nasza strona to platforma filmowa, która umożliwia użytkownikom odkrywanie i przeglądanie szerokiej gamy filmów.",
    "Dostarczamy szczegółowe informacje o filmach, takie jak opis fabuły, obsada aktorska, oceny, recenzje i wiele innych.",
    "Możesz przeszukiwać naszą bazę filmową według różnych kategorii, takich jak gatunek, rok produkcji, reżyser, aktor czy ocena.",
    "Możesz przeglądać rankingi filmów, zarówno ogólne, jak i tematyczne, aby dowiedzieć się, które filmy cieszą się największym uznaniem.",
    "Nasza społeczność składa się z pasjonatów filmowych, którzy dzielą się swoimi opiniami i dyskutują na temat różnych filmów.",
    "Staramy się zapewnić jak najbardziej kompleksowe informacje o filmach, aby pomóc użytkownikom podjąć decyzję, co chcą obejrzeć.",
    "Bez względu na to, czy jesteś kinomanem, filmowym entuzjastą czy po prostu szukasz dobrego filmu do obejrzenia, nasza strona służy jako centralne źródło wiedzy i rozrywki filmowej.",
  ];

  return (
    <div className="powitalny-page">
      <header className="powitalny-header">
        <img src={pepe} ale="Logo pepeweb" className="duzy-pepe"></img>
        <h1>Witaj na Pepeweb!</h1>
      </header>
      <main className="powitalny-main">
        <h2>Witamy na naszym serwisie Pepeweb. Cieszymy się, że tu jesteś!</h2>
        <p>
          Tutaj znajdziesz wiele interesujących treści i funkcji takich jak:
        </p>
        <ul className="powitalny-zalety">
          {zalety.map((zaleta, index) => (
            <li key={index}>{zaleta}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Powitalny;
