import "./Powitalny.css";

function Powitalny() {
  const zalety = [
    "Nasza platforma filmowa umożliwia dodawanie, edycję i usuwanie filmów z rankungu.",
    "Dostarczamy szczegółowe informacje o filmach, takie jak opis fabuły, resyserie, oceny, gatunki.",
    "Możesz przeglądać rankingi filmów, zarówno ogólne, jak i tematyczne, aby dowiedzieć się, które filmy cieszą się największym uznaniem.",
    "Nasza społeczność składa się z pasjonatów filmowych, którzy dzielą się swoimi opiniami i dyskutują na temat różnych filmów.",
    "Bez względu na to, czy jesteś kinomanem, filmowym entuzjastą czy po prostu szukasz dobrego filmu do obejrzenia, nasza strona służy jako centralne źródło wiedzy i rozrywki filmowej.",
  ];

  return (
    <div className="powitalny-page">
      <header className="powitalny-header">
        <img src="images/alfred_image.png" ale="Logo AlfredWeb" className="duzy-alfred_image"></img>
        <h1>Witaj na AlfredWeb!</h1>
      </header>
      <main className="powitalny-main">
        <h2>Witamy na naszym serwisie AlfredWeb. Cieszymy się, że tu jesteś!</h2>
        <p>
          Znajdziesz tutaj wiele interesujących treści i funkcji takich jak:
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
