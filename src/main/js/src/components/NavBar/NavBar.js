import React from "react";
import "./NavBar.css"
import { NavLink } from 'react-router-dom'

function removeUser(){
    localStorage.removeItem("user");
}



function NavBar() {

    if (localStorage.getItem('user')) {
        return <div className="pocetak">
        <div className="nav">

            <a className="image" href="/">
                <img alt="logo" src="/logo_stopwaste_transparent.png" className="navLogo" />
            </a>

    <div className="title"><h1 className="naslov">Stop waste</h1></div>

            <div className="korisnickoime"> korisničko ime: {JSON.parse(localStorage.getItem('user')).username} </div>



        </div>

        <div className="topnav">

            <NavLink to="/" exact to='' activeClassName=" active">Početna</NavLink>

            <NavLink to="/profil" exact to='/profil' activeClassName=" active">Profil</NavLink>

            <NavLink to="/poruke" exact to='/poruke' activeClassName=" active">Poruke</NavLink>


            <NavLink to="/mojioglasi" exact to='/mojioglasi' activeClassName=" active">Moji oglasi</NavLink>


            <a  href="/prijava" onClick={removeUser}>
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
          <div className="image">
              <img alt="logo" src="/logo_stopwaste_transparent.png" className="navLogo" />
          </div>

          <div className="title"><h1>Stop waste</h1></div>

          <div className="navContainer">


                <a className="navButton" href="../">
                   <input type="button" value="Početna" />
                </a>

            <div className="title naslov"><h3>Stop waste</h3></div>


            <div className="topnav1">
                <a href="/prijava">
                    Prijava
                </a>

                <a href="/registracija">
                    Registracija
                </a>
                </div>

        </div>
    </div>
    );

}

export default NavBar;
