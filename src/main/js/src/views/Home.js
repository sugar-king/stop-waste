import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AuthService from "../services/auth.service";
import AdsService from "../services/ads.service";


export default class Home extends Component {


    constructor(props) {
        super(props);

        this.setState = this.setState.bind(this);
        this.pretrazivanje = this.pretrazivanje.bind(this);
        this.searchX = this.searchX.bind(this);


        this.state = {
            elements: "",
            message: "",
            searched: "",
        }
    }

    componentDidMount() {
        AdsService.getActiveAds().then(response => {
            this.setState({
                elements: response.data,
            })
        }, error => {
            this.setState({
                message: "Dohvat nije uspio",
            });
        })
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


    checkAd(ad) {
        if (!ad.sellerAddress) {
            return false;
        }
        if (this.state.searched !== undefined) {
            var search = this.state.searched;
            if (!search == "") {
                if (!ad.caption.toLowerCase().includes(search.toLowerCase())
                    && !ad.description.toLowerCase().includes(search.toLowerCase())) return false;
            }
        }

        if (AuthService.getCurrentUser()) {
            if (ad.userSeller.includes(AuthService.getCurrentUser().username)) return false;
        }

        return true;
    }


    pretrazivanje() {
        var searchValue = document.getElementById("search").value;
        this.setState({searched: searchValue});
    }

    searchX () {
        this.setState({searched: ""})
    }

    rezervirajOglas(id) {
        AdsService.reserveAd(id).then(response => {
                this.setState({message: response.data.message});
                window.location.reload();
            }
            , error => {
                this.setState({message: "Rezervacija nije uspjesna"})
            })
    }

    sortElements(){

        if (AuthService.getCurrentUser()) {
            var sorted = [];
            var userCategories = AuthService.getCurrentUser().categories;
            for (var ad of this.state.elements) {
                if (ad.category != null) {
                    if (userCategories.includes(ad.category.categoryName)) {
                        sorted.unshift(ad);
                    }
                } else {
                    sorted.push(ad);
                }
            }
            this.state.elements = sorted;
        }
    }


    render() {

        var items = [];
        var dodajOglas = "";
        if (AuthService.getCurrentUser() != null) {
            if (AuthService.getCurrentUser().roles.includes("ROLE_SELLER")) {
                dodajOglas = <a href="./novioglas">
                    <button className="gumb1">Dodaj oglas</button>
                </a>;
            }
        }


        this.sortElements();


        var firstPreferred = true;
        var firstOtherBool = true;

        for (var ad of this.state.elements) {

            var firstCategory = "";
            var firstOther = "";
            if (!this.checkAd(ad)) continue;

            if (ad.category!= null && firstPreferred && AuthService.getCurrentUser()){
                firstCategory= <h2>Preferirani oglasi</h2>
                firstPreferred = false;
            }
            if (ad.category == null && firstOtherBool && AuthService.getCurrentUser()){
                firstOtherBool = false;
                firstOther = <h2>Ostali oglasi</h2>
            }


            var rezerviraj = '';
            if (AuthService.getCurrentUser() != null) {
                var id = ad.idAd;
                rezerviraj = <button value={id} onClick={this.rezervirajOglas.bind(this, id)}
                                     className="razmak gumb">Rezerviraj</button>;
            }


            var categoryRender = "";
            if (ad.category!=null)categoryRender = <p style={{'fontSize' : '15px'}}><b>Kategorija :</b> {ad.category.categoryName}</p>


            let addres
            if (!ad.sellerAddress)
                addres = `-`;
            else
                addres = `${ad.sellerAddress.street} ${ad.sellerAddress.number}, ${ad.sellerAddress.city.postalCode} ${ad.sellerAddress.city.cityName}`;

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
                        <p><b>Lokacija :</b> {addres}</p>
                        {categoryRender}
                        <p className="opis">{ad.description}</p>

                    </div>

                    <div className="width">

                        <p><b>Vrijeme do kraja :</b><br/>{this.formatDateTime(ad.timeOfExpiration)}<br/></p>

                        <p><b>Izvorna cijena i popust :</b> <br/> {ad.price}kn, {ad.discount}%</p>
                        <h3><b>Nova cijena :</b> {ad.price * (100 - ad.discount) / 100}kn</h3>

                        {rezerviraj}

                    </div>

                </div>
                </div>
            )


        }



        var pretraga='';
        var x ='';
        var rijec = this.state.searched;
        if(rijec !== undefined  ) {
            if (rijec.length !=0) {
                pretraga = <h2>Pretraga za : {this.state.searched}
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

                            <button htmlFor="search" className="gumb1" onClick={this.pretrazivanje}>Pretraži</button>
                            <br/>
                            <input type="search" id="search" name="search"/>

                        </div>


                        {dodajOglas}


                    </div>
                    <div className="flex">
                        {pretraga}
                        {x}
                    </div>

                    {items}
                </div>

            </div>

        )

    }
}