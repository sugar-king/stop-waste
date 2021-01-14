import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AuthService from "../services/auth.service";
import AdsService from "../services/ads.service";
import {basicCheckAd} from "./SoldAds";
import {Link} from "react-router-dom";
import {formatDateTime} from "./Conversation";


export default class Home extends Component {


    constructor(props) {
        super(props);

        this.setState = this.setState.bind(this);
        this.searching = this.searching.bind(this);
        this.searchX = this.searchX.bind(this);


        this.state = {
            elements: "",
            message: "",
            searched: "",
            filtered: ""
        }
    }

    componentDidMount() {
        AdsService.getActiveAds().then(response => {
            this.setState({
                elements: response.data,
            });
            this.sortElements();
        }, error => {
            this.setState({
                message: "Dohvat nije uspio",
            });
        })
    }


    checkAd(ad) {
        if (!basicCheckAd(ad, this.state.searched)) {
            return false;
        }

        if (AuthService.getCurrentUser() && ad.userSeller == AuthService.getCurrentUser().username) {
            return false;
        }
        return true;
    }


    searching() {
        var searchValue = document.getElementById("search").value;
        this.setState({searched: searchValue});
    }

    searchX() {
        this.setState({searched: ""})
    }

    reserveAd(id) {
        AdsService.reserveAd(id).then(response => {
                this.setState({message: response.data.message});
                window.location.reload();
            }
            , error => {
                this.setState({message: "Rezervacija nije uspjesna"})
            })
    }

    sortElements() {
        if (AuthService.getCurrentUser()) {
            var sorted = [];
            var userCategories = AuthService.getCurrentUser().categories;
            for (var ad of this.state.elements) {
                if (ad.category) {
                    if (userCategories.includes(ad.category)) {
                        sorted.unshift(ad);
                    } else {
                        sorted.push(ad);
                    }
                } else {
                    sorted.push(ad);
                }
            }
            this.state.elements = sorted;
        }
        this.setState({filtered: true});
    }


    render() {

        var items = [];
        if (!this.state.elements) {
            items = <h2>Dohvaćanje oglasa...</h2>;
        }

        var dodajOglas = "";
        if (AuthService.getCurrentUser() != null) {
            if (AuthService.getCurrentUser().roles.includes("ROLE_SELLER")) {
                dodajOglas = <a href="./novioglas">
                    <button className="gumb1">Dodaj oglas</button>
                </a>;
            }
        }
        var firstPreferred = true;
        var firstOtherBool = true;

        for (var ad of this.state.elements) {
            var firstCategory = "";
            var firstOther = "";
            if (!this.checkAd(ad)) {
                continue;
            }
            if (firstPreferred && ad.category && AuthService.getCurrentUser()) {
                if (!AuthService.getCurrentUser().categories.includes(ad.category)) {
                    firstPreferred = false;
                }
            }
            if (ad.category != null && firstPreferred && AuthService.getCurrentUser()) {
                firstCategory = <h2>Preferirani oglasi</h2>;
                firstPreferred = false;
            } else if (firstOtherBool && AuthService.getCurrentUser()) {
                firstOtherBool = false;
                firstOther = <h2>Ostali oglasi</h2>
            }


            var reserve = '';
            var message = '';
            if (AuthService.getCurrentUser() != null) {
                var id = ad.idAd;
                reserve = <button value={id} onClick={this.reserveAd.bind(this, id)}
                                  className="razmak gumb">Rezerviraj</button>;

                message = <Link to={{
                    pathname: "poruke/" + ad.userSeller
                }}>
                    <button className="razmak gumb">Poruka prodavaču</button>
                </Link>;
            }


            var categoryRender = "";
            if (ad.category != null) {
                categoryRender =
                    <p style={{'fontSize': '15px'}}><b>Kategorija :</b> {ad.category}</p>
            }

            let address
            if (!ad.sellerAddress) {
                address = `-`;
            } else {
                address = `${ad.sellerAddress.street} ${ad.sellerAddress.number}, ${ad.sellerAddress.city.postalCode} ${ad.sellerAddress.city.cityName}`;
            }
            var base64Image = `data:image/png;base64,${ad.image}`;


            items.push(
                <div>
                    {firstCategory}
                    {firstOther}
                    <div className="card-oglas">
                        <div>
                            <img className="slika" src={base64Image}
                                 alt=""/>

                        </div>

                        <div className="NaslovIOpis">

                            <h2>{ad.caption}</h2>
                            <p><b>Lokacija :</b> {address}</p>
                            {categoryRender}
                            <p className="opis">{ad.description}</p>

                        </div>

                        <div className="width">

                            <p><b>Vrijeme isteka :</b><br/>{formatDateTime(ad.timeOfExpiration)}<br/></p>

                            <p><b>Izvorna cijena i popust :</b> <br/> {ad.price}kn, {ad.discount}%</p>
                            <h3><b>Nova cijena :</b> {ad.price * (100 - ad.discount) / 100}kn</h3>

                            {reserve}
                            {message}

                        </div>

                    </div>
                </div>
            )


        }

        if (this.state.filtered && items.length == 0) {
            items = <h2>Nema oglasa koji zadovoljavalju uvjete.</h2>
        }
        var searchLabel = '';
        var x = '';
        var word = this.state.searched;
        if (word) {
            if (word.length != 0) {
                searchLabel = <h2>Pretraga za : {this.state.searched}
                    <button onClick={this.searchX}> x</button>
                </h2>

            }
        }


        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <div className="flex">
                        <div className="vertikalno">

                            <button htmlFor="search" className="gumb1" onClick={this.searching}>Pretraži</button>
                            <br/>
                            <input type="search" id="search" name="search"/>

                        </div>


                        {dodajOglas}


                    </div>
                    <div className="flex">
                        {searchLabel}
                        {x}
                    </div>

                    {items}
                </div>

            </div>

        )

    }
}