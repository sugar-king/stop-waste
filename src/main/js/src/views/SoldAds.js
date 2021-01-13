import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service";




export default class SoldAds extends Component{

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.pretrazivanje = this.pretrazivanje.bind(this);
        this.searchX = this.searchX.bind(this);

        this.state = {
            elements: "",
            search: ""
        }
    }

    componentDidMount() {
        AdsService.getSoldAds().then(response => {
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio."})
        });
    }

    checkAd(ad){
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
        return true;
    }


    pretrazivanje() {
        var searchValue = document.getElementById("search").value;
        this.setState({searched: searchValue});
    }

    searchX () {
        this.setState({searched: ""})
    }




    render(){

        var items = [];




        for (var ad of this.state.elements) {


            var base64Image = `data:image/png;base64,${ad.image}`;


            if(!this.checkAd(ad))continue;

            let addres
            if (!ad.sellerAddress)
                addres = `-`;
            else
                addres = `${ad.sellerAddress.street} ${ad.sellerAddress.number}, ${ad.sellerAddress.city.postalCode} ${ad.sellerAddress.city.cityName}`


            items.push(

                <div className="card-oglas">
                    <div>
                        <img className="slika"
                             src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis sirina">

                        <h2>{ad.caption}</h2>
                        <p><b>Lokacija :</b> {addres}</p>
                        <p className="opis">{ad.description}</p>

                    </div>

                    <div className="width">

                        <p><b>Izvorna cijena i popust :</b> <br/> {ad.price}kn, {ad.discount}%</p>
                        <h3><b>Nova cijena :</b><br/> {ad.price * (100 - ad.discount) / 100}kn</h3>

                    </div>

                </div>
            )
        }



        var pretraga = '';
        var x = '';
        var rijec = this.state.searched;
        if (rijec !== undefined) {
            if (rijec.length != 0) {

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
                    <h1>Prodani oglasi</h1>
                    <div className="flex">
                        <div className="vertikalno">

                            <button htmlFor="search" className="gumb1" onClick={this.pretrazivanje}>Pretraži</button>
                            <br/>
                            <input type="search" id="search" name="search"/>

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