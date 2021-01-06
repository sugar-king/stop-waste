import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";


export default class BoughtAds extends Component{



    render(){
        const elements = ['Prvi', 'Drugi', 'Treci'];

        let items = [];


        for (const [index, value] of elements.entries()) {

            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika" src="https://pbs.twimg.com/profile_images/378800000386663723/06b8273d1eb3bc9a5b943dacf19267e1_400x400.png" alt=""></img>
                    </div>

                    <div className="NaslovIOpis">

                        <h2>Naslov oglasa</h2>
                        <p><b>Lokacija :</b> Požega</p>
                        <p className="opis">Kratki opis o ovom oglasu , nez sto bi pisao
                            ,treba mi rijeci da vidim kako bi ovo izgledalo.</p>
                    </div>

                    <div>

                        <p><b>Cijena i popust :</b> 1555kn, 25%</p>



                    </div>

                </div>

            )
        }

        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Kupljeni oglasi</h1>
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