import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import MessagesService from "../services/messages.service";
import AuthService from "../services/auth.service";

export default class Messages extends Component {

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);

        this.state = {
            elements: []
        }
    }

    componentDidMount() {
        localStorage.setItem("razgovor","");
        MessagesService.getAllMessages().then(response => {
            console.log(response.data);
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio."})
        });
    }

    otvoriPoruku(id,name){
        console.log("Otvori poruku");
        console.log(id);

        localStorage.setItem("razgovor",name);
        window.location.href = "./poruke/razgovor";
        //window.location.reload();
    }


    render() {



        var items = []
        var usernames = [];
        //usernamove redom pojavljivanja
        if (this.state.elements) {
            for (var a of this.state.elements) {

                if(!usernames.includes(a.usernameReceived))usernames.push(a.usernameReceived);
                else if(!usernames.includes(a.usernameSent))usernames.push(a.usernameSent);
                else continue;

                let timeFormatted = new Intl.DateTimeFormat("hr-HR", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(new Date(a.time));

                console.log(a.idMessage);

                var osoba="";//sa kojoj se razgovara
                if(!a.usernameReceived.includes(AuthService.getCurrentUser().username))osoba=a.usernameReceived;
                if(!a.usernameSent.includes(AuthService.getCurrentUser().username))osoba=a.usernameSent;
                if(osoba.length==0)osoba=AuthService.getCurrentUser().username;
                console.log(osoba);



                items.push(
                    <div value={a.idMessage} className="card-oglas flex" onClick={() =>this.otvoriPoruku(a.idMessage,osoba)}>
                        <div>
                            <p><b>{osoba}</b></p>

                        </div>

                        <div>
                            <p>{a.text}</p>
                        </div>
                        <div>
                            <p><b>{timeFormatted}</b></p>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div>
                <NavBar/>
                <div className=" card-svioglasi">
                    <a href="novaporuka">
                        <button className="gumb1">Napiši novu poruku</button>
                    </a>

                    <div className="flex">
                        <div>
                            <h3>Razgovor sa:</h3>

                        </div>

                        <h3>Zadnja poruka</h3>
                        <h3>Vrijeme slanja</h3>
                    </div>
                    {items}
                </div>

            </div>

        )
    }
}
