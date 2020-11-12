import React, {useContext} from "react";
import { Link } from "react-router-dom";




function NavBar() {


    return (
      <div className="nav">
          <img alt="logo" src="/logo_stopwaste.jpg" className="navLogo" />


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

export default NavBar;
