import React from "react";


function removeUser() {
    localStorage.removeItem("user");
}

function NavBarSignedIn() {


    return (
        <div className="nav">

            <div className="image">
                <img alt="logo" src="/logo_stopwaste.jpg" className="navLogo" />
            </div>

            <div className="title"><h1>Stop waste</h1></div>


            <div className="navContainer">

                <a className="navButton" href="./profil">
                    <input type="button" value="Profile" />
                </a>
                <a className="navButton" href="./prijava">
                    <input type="button" onClick={removeUser} value="Odjava" />
                </a>


            </div>
        </div>

    );

}

export default NavBarSignedIn;