import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";




export default class SoldAds extends Component{



    render(){
        const elements = ['Prvi', 'Drugi', 'Treci'];

        var items = [];




        for (const [index, value] of elements.entries()) {

            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika" src="https://image.shutterstock.com/image-illustration/red-stamp-on-white-background-260nw-338053511.jpg" alt=""></img>
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
                    <h1>Prodani oglasi</h1>
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