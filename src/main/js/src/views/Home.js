import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AuthService from "../services/auth.service";


export default class Home extends Component {


    render() {
        const elements = ['Prvi', 'Drugi', 'Treci'];

        var items = [];

        var rezerviraj;
        var ponudi;

        if (AuthService.getCurrentUser() != null) {
            rezerviraj = <button className="razmak gumb">Rezerviraj</button>;
            ponudi = <button className="gumb">Ponudi</button>;
        } else {
            rezerviraj = '';
            ponudi = '';
        }

        var dodajOglas;
        /*treba napravit u ovom ifu ispod da uloga bude seller , a ja nez */
        if (AuthService.getCurrentUser() != null) {
            dodajOglas = <button className="gumb1">Dodaj oglas</button>;
        } else {
            dodajOglas = '';
        }

        for (const [index, value] of elements.entries()) {

            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika" src="https://i1.sndcdn.com/artworks-000579164183-xovxgo-t500x500.jpg"
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis">

                        <h2>Naslov oglasa</h2>
                        <p><b>Lokacija :</b> Požega</p>
                        <p className="opis">Kratki opis o ovom oglasu , nez sto bi pisao
                            ,treba mi rijeci da vidim kako bi ovo izgledalo.</p>
                    </div>

                    <div>

                        <p><b>Vrijeme do kraja :</b> 15h<br/></p>

                        <p><b>Cijena i popust :</b> 1555kn, 25%</p>

                        {rezerviraj}
                        {ponudi}
                    </div>

                </div>
            )
        }

        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <div className="flex">
                        <div>
                            <label for="search"><b>Pretraži : </b></label>
                            <input type="text" id="search" name="search"></input>
                        </div>

                        <a href="./novioglas">
                            {dodajOglas}
                        </a>


                    </div>
                    {items}
                </div>

            </div>

        )
    }
}