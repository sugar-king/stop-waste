import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AuthService from "../services/auth.service";
import AdsService from "../services/ads.service";


export default class Home extends Component {


    constructor (props) {
        super(props);

        this.setState = this.setState.bind(this);


        this.state = {
            elements: "",
            message:""
        }
    }

    componentDidMount() {
        AdsService.getActiveAds().then(response => {
            this.setState({elements: response.data,
                                })
        }, error => {
            this.setState({elements: "Dohvat nije uspio"})
        })
    }

    formatDateTime(dateTime) {

        if (dateTime === undefined)
            return;

        const year = dateTime.substring(0, 4)
        const month = dateTime.substring(5, 7)
        const day = dateTime.substring(8, 10)
        const time = dateTime.substring(11, dateTime.length)

        return `${day}.${month}.${year}. ${time}h`
    }


    checkAd(ad){
        if(localStorage.getItem('za')!== undefined){
            var search = localStorage.getItem('za');
            console.log("u provjeri");
            console.log(search);

            if(!search =="") {
                if (!ad.caption.toLowerCase().includes(search.toLowerCase())
                    && !ad.description.toLowerCase().includes(search.toLowerCase())) return false;
            }
        }

        if (AuthService.getCurrentUser()){
            if (ad.userSeller.includes(AuthService.getCurrentUser().username)) return false;
        }
        console.log("prije true");
        console.log(search);
        return true;
    }


    pretrazivanje(){
        var searchValue = document.getElementById("search").value ;
        localStorage.setItem('search',searchValue);
        localStorage.setItem('za',searchValue);
        //document.getElementById("search").value = searchValue;
        if(searchValue!="")window.location.reload();
    }

    rezervirajOglas(id){
        console.log("reserve id");
        console.log(id);
        AdsService.reserveAd(id).then(response =>{
            this.setState({message : response.data.message})}
            ,error => {
            this.setState({message : "Rezervacija nije uspjesna"})
            })
        //window.location.reload();
    }


    render() {

        var items = [];




        var dodajOglas ="";


        if (AuthService.getCurrentUser() != null) {
            if(AuthService.getCurrentUser().roles.includes("ROLE_SELLER")){
            dodajOglas = <a href="./novioglas"><button className="gumb1" >Dodaj oglas</button></a>;
        }}



        for (var ad of this.state.elements) {

            //checkAd -> true ako zadovoljava sve uvjete filtra na frontendu
            var rezerviraj = '';

            if (AuthService.getCurrentUser() != null) {

                rezerviraj = <button onClick={() => this.rezervirajOglas(ad.idAd)} className="razmak gumb">Rezerviraj</button>;

            }


            if(localStorage.getItem('search')!== undefined){
                if(ad == this.state.elements[this.state.elements.length-1]) {
                    var search = localStorage.getItem('search');
                    localStorage.setItem("search", "");
                    localStorage.setItem("za",search);
                }
            }
            if(!this.checkAd(ad))continue;


            let addres
            if(ad.sellerAddress == undefined)
                addres = `-`;
            else
                addres = `${ad.sellerAddress.street} ${ad.sellerAddress.number}, ${ad.sellerAddress.city.postalCode} ${ad.sellerAddress.city.cityName}`

            var base64Image = `data:image/png;base64,${ad.image}`;

            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika" src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis">

                        <h2>{ad.caption}</h2>
                        <p><b>Lokacija :</b> {addres}</p>
                        <p className="opis">{ad.description}</p>
                    </div>

                    <div>

                        <p><b>Vrijeme do kraja :</b><br/>{this.formatDateTime(ad.timeOfExpiration)}<br/></p>

                        <p><b>Cijena i popust :</b><br/> {ad.price}, {ad.discount}%</p>

                        {rezerviraj}

                    </div>

                </div>
            )


        }


        function searchX() {

            localStorage.setItem('search',"");
            localStorage.setItem('za',"");
            window.location.reload();
        }


        var pretraga='';
        var x ='';
        var rijec= localStorage.getItem('za');
        if(rijec !== undefined  ) {
            if (rijec.length !=0) {
                pretraga = <h2>Pretraga za : {localStorage.getItem('za')} <button onClick={searchX}>x</button></h2>


            }
        }



        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <div className="flex">
                        <div className="vertikalno">

                            <button for="search" className="gumb1" onClick={this.pretrazivanje}>Pretraži</button>
                            <br></br>
                            <input type="text" id="search" name="search"></input>

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