import NavBar from "../NavBar/NavBar";
import React from "react";


function AdsNavBar(){
return (
    <div className="flex">

            <a href="/mojioglasi/predani">
                <button className="gumb1">
                    Predani
                </button>
            </a>

            <a href="/mojioglasi/rezervirani">
                <button className="gumb1">
                    Rezervirani
                </button>
            </a>

            <a href="/mojioglasi/prodani">
                <button className="gumb1">
                    Prodani
                </button>
            </a>

            <a href="/mojioglasi/kupljeni">
                <button className="gumb1">
                    Kupljeni
                </button>
            </a>

        </div>


)}

export default AdsNavBar;