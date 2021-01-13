import React from "react";
import AuthService from '../../services/auth.service';

function AdsNavBar(){
    var predani='';
    var prodani='';
    if (AuthService.getCurrentUser().roles.includes("ROLE_SELLER")) {

             predani = <a href="/mojioglasi/objavljeni">
                <button className="gumb1">
                    Objavljeni
                </button>
            </a> ;

            prodani =<a href="/mojioglasi/prodani">
                <button className="gumb1">
                    Prodani
                </button>
            </a> ;
    }

return (
    <div className="flex">

        {predani}

        {prodani}

            <a href="/mojioglasi/rezervirani">
                <button className="gumb1">
                    Rezervirani
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