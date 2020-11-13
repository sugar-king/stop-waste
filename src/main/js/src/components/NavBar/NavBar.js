import React from "react";
import "./NavBar.css"

function removeUser() {
    localStorage.removeItem("user");
}

function NavBar() {

    if (localStorage.getItem('user')) {
        return <div className="nav">

            <a className="image" href="/">
                <img alt="logo" src="/logo_stopwaste_transparent.png" className="navLogo" />
            </a>

    <div className="title"><h1>Stop waste</h1></div>



            <div className="navContainer">

                <a className="navButton" href="./profil">
                    <input type="button" value="Profil" />
                </a>
                <a className="navButton" href="./prijava">
                    <input type="button" onClick={removeUser} value="Odjava" />
                </a>


            </div>
        </div>
    }
    return (


      <div className="nav">

          <div className="image">
              <img alt="logo" src="/logo_stopwaste_transparent.png" className="navLogo" />
          </div>

          <div className="title"><h1>Stop waste</h1></div>

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
