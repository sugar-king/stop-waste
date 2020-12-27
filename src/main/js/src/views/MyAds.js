import '../css_files/Home.css';
import '../css_files/MojiOglasi.css'
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AuthService from "../services/auth.service";

export default class MyAds extends Component {


    render() {

        let buttons = [];
        console.log(AuthService.getCurrentUser());
        if (AuthService.getCurrentUser().roles.includes("ROLE_SELLER")) {
            buttons.push(
                <a href="./mojioglasi/predani">
                    <button className="gumb1">
                        Predani
                    </button>
                </a>);
            buttons.push(
                <a href="./mojioglasi/prodani">
                    <button className="gumb1">
                        Prodani
                    </button>
                </a>);
        }
        return (
            <div>
                <NavBar/>
                <div className=" card-svioglasi flex">
                    <a href="./mojioglasi/rezervirani">
                        <button className="gumb1">
                            Rezervirani
                        </button>
                    </a>


                    <a href="./mojioglasi/kupljeni">
                        <button className="gumb1">
                            Kupljeni
                        </button>
                    </a>
                    {buttons}
                </div>

            </div>

        )
    }
}
