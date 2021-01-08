import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AuthService from "../services/auth.service";
import AdsService from "../services/ads.service";

export default class Home extends Component {

    constructor (props) {
        super(props);

        this.setState = this.setState.bind(this);

        this.state = {
            elements: ""
        }
    }

    componentDidMount() {
        AdsService.getActiveAds().then(response => {
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio"})
        })
    }

    formatDateTime(dateTime) {

        if (dateTime === undefined)
            return;

        const year = dateTime.substring(0, 4)
        const month = dateTime.substring(5, 7)
        const day = dateTime.substring(8, 10)
        const time = dateTime.substring(11, dateTime.length)

        return `${day}.${month}.${year}. ${time}h`
    }

    render() {
        //const elements = ['Prvi', 'Drugi', 'Treci'];

        var items = [];

        var rezerviraj;
        var ponudi;

        if (AuthService.getCurrentUser() != null) {
            rezerviraj = <button className="razmak gumb">Rezerviraj</button>;

        } else {
            rezerviraj = '';
        }

        var dodajOglas;
        /*treba napravit u ovom ifu ispod da uloga bude seller , a ja nez */
        if (AuthService.getCurrentUser() != null) {
            dodajOglas = <button className="gumb1">Dodaj oglas</button>;
        } else {
            dodajOglas = '';
        }

        for (var ad of this.state.elements) {

            if (!(ad.condition.conditionName.includes("ACTIVE"))) continue;

            if (AuthService.getCurrentUser()){
                if (ad.userSeller.includes(AuthService.getCurrentUser().username)) continue;
            }


            let addres
            if(ad.sellerAddress == undefined)
                addres = `-`;
            else
                addres = `${ad.sellerAddress.street} ${ad.sellerAddress.number}, ${ad.sellerAddress.city.postalCode} ${ad.sellerAddress.city.cityName}`

            var base64Image = `data:image/png;base64,${ad.image}`;

            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika" src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis">

                        <h2>{ad.caption}</h2>
                        <p><b>Lokacija :</b> {addres}</p>
                        <p className="opis">{ad.description}</p>
                    </div>

                    <div>

                        <p><b>Vrijeme do kraja :</b><br/>{this.formatDateTime(ad.timeOfExpiration)}<br/></p>

                        <p><b>Cijena i popust :</b><br/> {ad.price}, {ad.discount}%</p>

                        {rezerviraj}
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