import '../css_files/Prijava.css';
import react from 'react'
import '../css_files/NavigationBar.css';
import logo_stopwaste from "../logo_stopwaste.jpg";
import { Link } from "react-router-dom";

function Prijava() {
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
            <div className="Prijava">




            <h2>Prijava</h2>
            <form>

                <div className="Redak">
                    <label>Korisničko ime</label>
                    <input name="Korisničko ime"/>
                </div>

                <div className="Redak">
                    <label>Lozinka</label>
                    <input name="Lozinka"/>
                </div>

                <div className="Redak">
                    <button>Prijava</button>

                    <label>Nemate račun?</label>

                    <a className="gumb" href="../registracija">
                        <input type="button" value="Registracija" />
                    </a>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Prijava;