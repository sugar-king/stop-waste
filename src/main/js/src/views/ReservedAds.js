import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service";


export default class ReservedAds extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.cancel = this.cancel.bind(this);
        this.pretrazivanje = this.pretrazivanje.bind(this);
        this.searchX = this.searchX.bind(this);
        this.state = {
            elements: "",
            searched: ""
        }
    }

    componentDidMount() {
        AdsService.getReservedAds().then(response => {
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio."})
        });

    }

    cancel(adId) {
        AdsService.cancelReservation(adId);

        window.location.reload();
    }

    checkAd(ad) {
        if (!ad.sellerAddress) {
            return false;
        }
        if (this.state.searched !== undefined) {
            var search = this.state.searched;
            if (!search === "") {
                if (!ad.caption.toLowerCase().includes(search.toLowerCase())
                    && !ad.description.toLowerCase().includes(search.toLowerCase())) return false;
            }
        }
        return true;
    }


    pretrazivanje() {
        var searchValue = document.getElementById("search").value;
        this.setState({searched: searchValue});
    }

    formatDateTime(dateTime) {

        if (dateTime == undefined)
            return;

        const year = dateTime.substring(0, 4)
        const month = dateTime.substring(5, 7)
        const day = dateTime.substring(8, 10)
        const time = dateTime.substring(11, dateTime.length)

        return `${day}.${month}.${year}. ${time}h`
    }

    searchX () {
        this.setState({searched: ""})
    }

    render() {
        var items = [];

        for (var a of this.state.elements) {
            var base64Image = `data:image/png;base64,${a.image}`;

            if (!this.checkAd(a)) continue;
            var makniRezervaciju = <button className="razmak gumb" onClick={this.cancel.bind(this, a.idAd)}>Otkaži
                rezervaciju</button>;

            let addres
            if (!a.sellerAddress)
                addres = `-`;
            else
                addres = `${a.sellerAddress.street} ${a.sellerAddress.number}, ${a.sellerAddress.city.postalCode} ${a.sellerAddress.city.cityName}`


            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika"
                             src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis">
                        <h2>{a.caption}</h2>
                        <p><b>Lokacija :</b> {addres}</p>
                        <p className="opis">{a.description}</p>
                    </div>

                    <div className="width">
                        <p><b>Vrijeme do kraja :</b><br/>{this.formatDateTime(a.timeOfExpiration)}<br/></p>
                        <p><b>Izvorna cijena i  popust:</b> <br/> {a.price}kn, {a.discount}%</p>
                        <h3><b>Nova cijena :</b><br/> {a.price * (100 - a.discount) / 100}kn</h3>

                        {makniRezervaciju}

                    </div>

                </div>
            )
        }




        var pretraga = '';
        var x = '';
        var rijec = this.state.searched;
        if (rijec !== undefined) {
            if (rijec.length !== 0) {

                pretraga = <h2>Pretraga za : {this.state.searched}
                    <button onClick={this.searchX}>x</button>
                </h2>


            }
        }

        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Rezervirani oglasi</h1>
                    <div className="flex">
                        <div className="vertikalno">

                            <button for="search" className="gumb1" onClick={this.pretrazivanje}>Pretraži</button>
                            <br/>
                            <input type="search" id="search"  name="search"/>

                            {pretraga}
                            {x}
                        </div>


                    </div>
                    {items}
                </div>

            </div>

        )
    }

}