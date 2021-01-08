import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import MessagesService from "../services/messages.service";

export default class Messages extends Component {

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);

        this.state = {
            elements: []
        }
    }

    componentDidMount() {
        MessagesService.getAllMessages().then(response => {
            console.log(response.data);
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio."})
        });
    }


    render() {
        var items = []
        if (this.state.elements) {
            for (var a of this.state.elements) {
                let timeFormatted = new Intl.DateTimeFormat("hr-HR", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(new Date(a.time));

                console.log(timeFormatted);
                items.push(
                    <div className="card-oglas flex">
                        <div>
                            <p><b>Od: {a.usernameSent}</b></p>
                            <p><b>Za: {a.usernameReceived}</b></p>
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
                            <h3>Pošiljatelj</h3>
                            <h3>Primatelj</h3>
                        </div>

                        <h2>Poruka</h2>
                        <h2>Vrijeme slanja</h2>
                    </div>
                    {items}
                </div>

            </div>

        )
    }
}
