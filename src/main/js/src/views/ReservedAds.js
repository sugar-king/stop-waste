import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";




export default class ReservedAds extends Component{



    render(){
        const elements = ['Prvi', 'Drugi', 'Treci'];

        var items = [];

        var ponudi;

        if (localStorage.getItem('user')){
            ponudi=<button className="gumb">Ponudi</button>;
        }
        else {

            ponudi='';
        }



        for (const [index, value] of elements.entries()) {

            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika" src="https://www.arenacentar.hr/wp-content/uploads/reserved.png" alt=""></img>
                    </div>

                    <div className="NaslovIOpis">

                        <h2>Naslov oglasa</h2>
                        <p><b>Lokacija :</b> Požega</p>
                        <p className="opis">Kratki opis o ovom oglasu , nez sto bi pisao
                            ,treba mi rijeci da vidim kako bi ovo izgledalo.</p>
                    </div>

                    <div>

                        <p><b>Cijena i popust :</b> 1555kn, 25%</p>
                        <p><b>Rezerviran : </b> (koliko jos)</p>

                        {ponudi}
                    </div>

                </div>

            )
        }

        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Rezervirani oglasi</h1>
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