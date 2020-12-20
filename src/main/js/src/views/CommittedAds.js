import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";




export default class CommittedAds extends Component{



    render(){
        const elements = ['Prvi', 'Drugi', 'Treci'];

        var items = [];



        for (const [index, value] of elements.entries()) {

            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika" src="data:image/png;base64,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" alt=""/>
                    </div>

                    <div className="NaslovIOpis">

                        <h2>Naslov oglasa</h2>
                        <p><b>Lokacija :</b> Požega</p>
                        <p className="opis">Kratki opis o ovom oglasu , nez sto bi pisao
                            ,treba mi rijeci da vidim kako bi ovo izgledalo.</p>
                    </div>

                    <div>

                        <p><b>Cijena i popust :</b> 1555kn, 25%</p>
                        <p><b>Rezerviran : </b> (Ako je koliko jos , inace --)</p>


                    </div>

                </div>

            )
        }

        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Predani oglasi</h1>
                    <div className="flex">
                        <div>
                            <label for="search"><b>Pretraži : </b></label>
                            <input type="text" id="search"name="search"></input>
                        </div>


                    </div>
                    {items}
                </div>

            </div>

        )
    }
}