import React from "react";
import "./NavBar.css"

function removeUser() {
    localStorage.removeItem("user");
}



function NavBar() {

    if (localStorage.getItem('user')) {
        return <div className="pocetak">
        <div className="nav">

            <a className="image" href="/">
                <img alt="logo" src="/logo_stopwaste.jpg" className="navLogo" />
            </a>

    <div className="title"><h1 >Stop waste</h1></div>

            <div> korisničko ime: nez ubacit </div>


           
        </div>

        <div className="topnav">
            <a href="./" className="btn active">
               Početna
            </a>

            <a href="./profil" className="btn">
                Profil
            </a>

            <a href="./poruke" className="btn">
               Poruke
            </a>

            <a  href="./mojioglasi" className="btn">
                Moji oglasi
            </a>

            <a  href="./prijava" onClick={removeUser}>
                Odjava
            </a>

        </div>

        </div>
    }
    return(
    <div className="pocetak">
        <div className="nav">

            <a className="image" href="/">
                <img alt="logo" src="/logo_stopwaste.jpg" className="navLogo" />
            </a>

            <div className="title"><h1>Stop waste</h1></div>


            <div className="topnav1">
                <a href="./prijava">
                    Prijava
                </a>

                <a href="./registracija">
                    Registracija
                </a>
                </div>

        </div>










    </div>


    );

}

export default NavBar;
