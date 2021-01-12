import '../css_files/MojiOglasi.css'
import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service";

export default class MyAds extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);

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

    searchX () {
        this.setState({searched: ""})
    }


    render() {

            var items = [];
        console.log(this.state.elements);
            for (var ad of this.state.elements) {
                var base64Image = `data:image/png;base64,${ad.image}`;

                if(!this.checkAd(ad))continue;
                items.push(
                    <div className="card-oglas">
                        <div>
                            <img className="slika"
                                 src={base64Image}
                                 alt=""/>
                        </div>

                        <div className="NaslovIOpis">

                            <h2>{ad.caption}</h2>
                            <p><b>Lokacija :</b> Požega</p>
                            <p className="opis">{ad.description}</p>
                        </div>

                        <div>

                            <p><b>Cijena i popust :</b> {ad.price}kn, {ad.discount}%</p>
                            <p><b>Rezerviran : </b> (Ako je koliko jos , inace --)</p>


                        </div>

                    </div>
                )
            }




        var pretraga='';
        var x ='';
        var rijec = this.state.searched;
        if(rijec !== undefined  ) {
            if (rijec.length !==0) {
                pretraga = <h2>Pretraga za : {this.state.searched} <button onClick={this.searchX}>x</button></h2>


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

                            <button htmlFor="search" className="gumb1" onClick={this.pretrazivanje}>Pretraži</button>
                            <br></br>
                            <input type="text" id="search" name="search"></input>

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
