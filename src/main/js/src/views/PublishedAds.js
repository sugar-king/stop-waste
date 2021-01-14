import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service"
import AuthService from "../services/auth.service";
import {basicCheckAd} from "./SoldAds";


export default class PublishedAds extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.searching = this.searching.bind(this);
        this.searchX = this.searchX.bind(this);

        this.state = {
            elements: ""
        }
    }

    sellAd(id) {
        AdsService.adSold(id).then(response => {
            this.setState({message: response.data.message});
            window.location.reload();
        });
    }


    componentDidMount() {
        AdsService.getPostedAds().then(response => {
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

    deleteAd(id) {
        AdsService.deleteAd(id).then(response => {
                this.setState({message: response.data.message});
                window.location.reload();
            }
            , error => {
                this.setState({message: "Brisanje oglasa nije uspjelo"})
            })
    }


    render() {
        var items = [];
        if (!this.state.elements) {
            items = <h2>Dohvaćanje oglasa...</h2>;
        }

        for (var a of this.state.elements) {
            if (!basicCheckAd(a, this.state.searched)) {
                continue;
            }

            var base64Image = `data:image/png;base64,${a.image}`;
            var stanje;
            var markSold = '';
            var id = a.idAd;
            if (a.condition.includes("RESERVED")) {

                if (AuthService.getCurrentUser() != null) {

                    markSold = <button value={id} onClick={this.sellAd.bind(this, id)}
                                       className="razmak gumb">Označi prodanim</button>;
                }
                stanje = "da"
            } else {
                stanje = "ne";
            }

            let address;
            if (!a.sellerAddress) {
                address = `-`;
            } else {
                address = `${a.sellerAddress.street} ${a.sellerAddress.number}, ${a.sellerAddress.city.postalCode} ${a.sellerAddress.city.cityName}`
            }

            var deleteAd = <button value={id} onClick={this.deleteAd.bind(this, id)}
                              className="razmak gumb">Obriši</button>;


            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika"
                             src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis">
                        <h2>{a.caption}</h2>
                        <p><b>Lokacija :</b> {address}</p>
                        <p className="opis">{a.description}</p>
                    </div>

                    <div className="width">

                        <p><b>Izvorna cijena i popust :</b> <br/> {a.price}kn, {a.discount}%</p>
                        <h3><b>Nova cijena :</b><br/> {a.price * (100 - a.discount) / 100}kn</h3>
                        <p><b>Rezerviran : </b>{stanje}</p>
                        {markSold}
                        {deleteAd}

                    </div>

                </div>
            )
        }

        if (items.length == 0) {
            items = <h2>Nema oglasa koji zadovoljavalju uvjete.</h2>
        }

        var searchLabel = '';
        var x = '';
        var word = this.state.searched;
        if (word !== undefined) {
            if (word.length != 0) {
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
                    <h1>Objavljeni oglasi</h1>
                    <div className="flex">
                        <div className="vertikalno">

                            <button for="search" className="gumb1" onClick={this.searching}>Pretraži</button>
                            <br/>
                            <input type="search" id="search" name="search"/>

                            {searchLabel}
                            {x}
                        </div>


                    </div>
                    {items}
                </div>

            </div>

        )
    }
}
