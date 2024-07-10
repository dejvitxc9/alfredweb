import "./StronaGlowna.css";
import { Link, Outlet } from "react-router-dom";
import pepe from "../../pictures/pepe.png";

function StronaGlowna() {
  return (
    <div className="App">
      <header className="app-header">
        <section>
          <Link to={"/"} className="link">
            <div className="item-menu">
            <img src={pepe} ale="Logo pepeweb" className="app-logo"></img>
              <h2>PEPEWEB</h2>
            </div>
          </Link>
          <Link to={"/"} className="link">
            <div className="item-menu">Głowna</div>
          </Link>
          <Link to={"/filmy"} className="link">
            <div className="item-menu">Filmy</div>
          </Link>
          <Link to={"/dodawanie"} className="link">
            <div className="item-menu">Dodawanie</div>
          </Link>
        </section>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
export default StronaGlowna;
