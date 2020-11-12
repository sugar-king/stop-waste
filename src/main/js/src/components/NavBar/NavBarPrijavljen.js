import React, {useContext} from "react";
import { Link } from "react-router-dom";




function NavBarPrijavljen() {


    return (
        <div className="nav">

            <div className="image">
                <img alt="logo" src="/logo_stopwaste.jpg" className="navLogo" />
            </div>

            <div className="title"><h1>Stop waste</h1></div>


            <div className="navContainer">

                <a className="navButton" href="./Profile">
                    <input type="button" value="Profile" />
                </a>
                <a className="navButton" href="./prijava">
                    <input type="button" onClick={
                        localStorage.removeItem("user")
                    } value="Odjava" />
                </a>


            </div>
        </div>

    );

}

export default NavBarPrijavljen;