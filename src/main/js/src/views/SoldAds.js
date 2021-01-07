import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service";




export default class SoldAds extends Component{

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);

        this.state = {
            elements: ""
        }
    }

    componentDidMount() {
        AdsService.getSoldAds().then(response => {
            console.log(response.data);
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio."})
        });
    }



    render(){

        var items = [];




        for (var ad of this.state.elements) {


            var base64Image = `data:image/png;base64,${ad.image}`;

            items.push(

                <div className="card-oglas">
                    <div>
                        <img className="slika"
                             src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis sirina">

                        <h2>{ad.caption}</h2>
                        <p><b>Lokacija :</b> Požega</p>
                        <p className="opis">{ad.description}</p>

                    </div>

                    <div>

                        <p><b>Cijena i popust :</b> {ad.price}kn, {ad.discount}%</p>

                    </div>

                </div>
            )
        }

        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Prodani oglasi</h1>
                    <div className="flex">
                        <div>
                            <label for="search"><b>Pretraži : </b></label>
                            <input type="text" id="search"name="search"></input>
                        </div>


                    </div>
                    {items}
                </div>

            </div>

        )
    }
}