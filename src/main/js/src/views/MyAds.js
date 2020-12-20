import '../css_files/Home.css';
import '../css_files/MojiOglasi.css'
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";

export default class MyAds extends Component{



    render(){


        return (
            <div>
                <NavBar/>
                <div className=" card-svioglasi flex">

                    <a href="./mojioglasi/predani">
                        <button className="gumb1">
                            Predani
                        </button>
                    </a>

                    <a href="./mojioglasi/rezervirani">
                        <button className="gumb1">
                            Rezervirani
                        </button>
                    </a>

                    <a href="./mojioglasi/prodani">
                        <button className="gumb1">
                            Prodani
                        </button>
                    </a>

                    <a href="./mojioglasi/kupljeni">
                        <button className="gumb1">
                            Kupljeni
                        </button>
                    </a>

                </div>

            </div>

        )
    }
}
