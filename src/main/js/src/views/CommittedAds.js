import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service"


export default class CommittedAds extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.pretrazivanje = this.pretrazivanje.bind(this);
        this.searchX = this.searchX.bind(this);

        this.state = {
            elements: ""
        }
    }

    componentDidMount() {
        AdsService.getPostedAds().then(response => {
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

    render() {
        var items = [];

        for (var a of this.state.elements) {

            var base64Image = `data:image/png;base64,${a.image}`;
            var stanje;
            if (a.condition.includes("RESERVED")) {
                stanje = "da"
            } else {
                stanje = "ne";
            }


            if(!this.checkAd(a))continue;

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

                        <p><b>Izvorna cijena i popust :</b> <br/> {a.price}kn, {a.discount}%</p>
                        <h3><b>Nova cijena :</b><br/> {a.price * (100 - a.discount) / 100}kn</h3>
                        <p><b>Rezerviran : </b>{stanje}</p>


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
                    <button onClick={this.searchX}>x</button>
                </h2>

            }
        }

        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Predani oglasi</h1>
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
