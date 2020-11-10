import '../css_files/Registracija.css';
import logo_stopwaste from "../logo_stopwaste.jpg";
import { Link } from "react-router-dom";

function Registracija() {
    return (

        <div className="sve">

                    <div className="nav">
                        <img alt="logo" src="/logo_stopwaste.jpg" className="navLogo" />
                        <Link to="/">
                        <span className="navName">StopWaste</span>
                        </Link>
                        <div className="navContainer">

                               <a className="navButton" href="../">
                                     <input type="button" value="Početna" />
                               </a>

                               <a className="navButton" href="../prijava">
                                      <input type="button" value="Prijava" />
                               </a>

                               <a className="navButton" href="../registracija">
                                       <input type="button" value="Registracija" />
                               </a>

                        </div>
                    </div>

        <div className="Registracija">


            <h2>Registracija</h2>
            <form>
                <div className="Redak">
                    <label>Ime</label>
                    <input name="Ime"/>
                </div>

                <div className="Redak">
                    <label>Prezime</label>
                    <input name="Prezime"/>
                </div>

                <div className="Redak">
                    <label>Korisničko ime</label>
                    <input name="Korisničko ime"/>
                </div>

                <div className="Redak">
                    <label>Lozinka</label>
                    <input name="Lozinka"/>
                </div>

                <div className="Redak">
                    <label>Ponovljena lozinka</label>
                    <input name="Ponovljena lozinka"/>
                </div>

                <div className="Redak">
                    <label>E-mail</label>
                    <input name="E-mail"/>
                </div>


                <div className="Redak">
                    <label>Lokacija</label>
                    <input name="Lokacija"/>
                </div>

                <div className="Redak">
                <button>Registracija</button>

                    <label>Imate račun?</label>

                <a className="gumb" href="../prijava">
                    <input type="button" value="Prijava" />
                </a>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Registracija;