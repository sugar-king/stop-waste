import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service"


export default class CommittedAds extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);

        this.state = {
            elements: ""
        }
    }

    componentDidMount() {
        AdsService.getAllAds().then(response => {
            console.log(response.data);
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio."})
        });
    }

    render() {
        var items = [];

        for (var a of this.state.elements) {
            var base64Image = `data:image/png;base64,${a.image}`;
            console.log(base64Image);
            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika"
                             src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis">

                        <h2>{a.caption}</h2>
                        <p><b>Lokacija :</b> Požega</p>
                        <p className="opis">{a.description}</p>
                    </div>

                    <div>

                        <p><b>Cijena i popust :</b> {a.price}kn, {a.discount}%</p>
                        <p><b>Rezerviran : </b> (Ako je koliko jos , inace --)</p>


                    </div>

                </div>
            )
        }
        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Predani oglasi</h1>
                    <div className="flex">
                        <div>
                            <label for="search"><b>Pretraži : </b></label>
                            <input type="text" id="search" name="search"></input>
                        </div>


                    </div>
                    {items}
                </div>

            </div>

        )
    }
}
