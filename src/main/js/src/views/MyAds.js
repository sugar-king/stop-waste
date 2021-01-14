import '../css_files/MojiOglasi.css'
import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service";
import {basicCheckAd} from "./SoldAds";

export default class MyAds extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.searching = this.searching.bind(this);
        this.searchX = this.searchX.bind(this);

        this.state = {
            elements: "",
            searched: ""
        }
    }

    componentDidMount() {
        AdsService.getMyAds().then(response => {
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio."})
        });
    }


    searching() {
        var searchValue = document.getElementById("search").value;
        this.setState({searched: searchValue});
    }

    searchX() {
        this.setState({searched: ""})
    }


    render() {

        var items = [];
        if (!this.state.elements) {
            items = <h2>Dohvaćanje oglasa...</h2>;
        }
        for (var ad of this.state.elements) {
            var base64Image = `data:image/png;base64,${ad.image}`;

            if (!basicCheckAd(ad, this.state.searched)) {
                continue;
            }

            var rezerviran = '';
            if (ad.condition.includes("RESERVED")) {
                rezerviran = "Da";
            } else {
                rezerviran = "Ne";
            }

            let address
            if (!ad.sellerAddress) {
                address = `-`;
            } else {
                address = `${ad.sellerAddress.street} ${ad.sellerAddress.number}, ${ad.sellerAddress.city.postalCode} ${ad.sellerAddress.city.cityName}`
            }


            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika"
                             src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis">

                        <h2>{ad.caption}</h2>
                        <p><b>Lokacija :</b> {address}</p>
                        <p className="opis">{ad.description}</p>
                    </div>

                    <div className="width">

                        <p><b>Izvorna cijena i popust :</b> <br/> {ad.price}kn, {ad.discount}%</p>
                        <h3><b>Nova cijena :</b><br/> {ad.price * (100 - ad.discount) / 100}kn</h3>
                    </div>
                </div>
            )
        }

        if (items.length == 0) {
            items = <h2>Nema oglasa koji zadovoljavalju uvjete.</h2>
        }

        var searchLabel = '';
        var word = this.state.searched;
        if (word !== undefined) {
            if (word.length !== 0) {
                searchLabel = <h2>Pretraga za : {this.state.searched}
                    <button onClick={this.searchX}>x</button>
                </h2>
            }
        }

        return (
            <div>
                <NavBar/>
                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Moji oglasi</h1>
                    <div className="flex">
                        <div className="vertikalno">

                            <button htmlFor="search" className="gumb1" onClick={this.searching}>Pretraži</button>
                            <br></br>
                            <input type="search" id="search" name="search"></input>

                            {searchLabel}
                        </div>
                    </div>
                    {items}
                </div>

            </div>

        )
    }
}
