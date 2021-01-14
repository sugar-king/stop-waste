import React from "react";
import "./NavBar.css"
import {NavLink} from 'react-router-dom';
import AuthService from '../../services/auth.service';


function NavBar() {

    if (AuthService.getCurrentUser() != null) {
        return <div className="pocetak">
            <div className="nav">

                <a className="image" href="/">
                    <img alt="logo" src="/logo_stopwaste_transparent.png" className="navLogo" />
                </a>

                <div className="title"><h1 className="naslov">Stop waste</h1></div>

                <div className="korisnickoime"> korisničko ime: {AuthService.getCurrentUser().username} </div>



            </div>

            <div className="topnav">

                <NavLink to="/" exact to='' activeClassName=" active">Početna</NavLink>

                <NavLink to="/profil" exact to='/profil' activeClassName=" active">Profil</NavLink>

                <NavLink to="/poruke" exact to='/poruke' activeClassName=" active">Poruke</NavLink>


                <NavLink to="/mojioglasi" exact to='/mojioglasi' activeClassName=" active">Moji oglasi</NavLink>


                <a  href="/" onClick={AuthService.removeUser}>
                    Odjava
                </a>

            </div>

        </div>
    }
    return(
        <div className="pocetak">
            <div className="nav">

                <a className="image" href="/">
                    <img alt="logo" src="/logo_stopwaste_transparent.png" className="navLogo" />
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
