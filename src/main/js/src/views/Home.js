import '../css_files/Home.css';
import react from 'react'
import '../css_files/NavigationBar.css';
import logo_stopwaste from '../logo_stopwaste.jpg';
import { Link } from "react-router-dom";

function Home() {
    return (
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







    );
}

export default Home;