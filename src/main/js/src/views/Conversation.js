import React, {Component} from 'react';
import NavBar from "../components/NavBar/NavBar";
import MessagesService from "../services/messages.service";
import AuthService from "../services/auth.service";
import {Redirect} from "react-router-dom";


export default class Conversation extends Component {


    formatDateTime(dateTime) {

        if (dateTime === undefined)
            return;

        const year = dateTime.substring(0, 4)
        const month = dateTime.substring(5, 7)
        const day = dateTime.substring(8, 10)
        const time = dateTime.substring(11, 16)

        return `${day}.${month}.${year}. ${time}`
    }

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);

        this.state = {
            elements: [],
            name: "",
            received: ""
        }
    }

    handleNewMessage(e) {
        e.preventDefault();

        if (this.state.text === "" || this.state.text.trim() === "") {
            this.setState({text: ""});
            return;
        }

        this.setState({
            message: "",
            successful: false
        });
        console.log("ja");
        MessagesService.newMessage(this.props.match.params.user, this.state.text
        ).then(
            () => {
                window.location.reload(false);
            },
            error => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                this.setState({
                    successful: false,
                    message: "Neuspjelo slanje poruke."
                });
            }
        );

    }

    onChangeMessage(e) {
        this.setState({
            text: e.target.value
        });
    }

    componentDidMount() {
        MessagesService.getMessagesWithUser(this.props.match.params.user).then(response => {
            this.setState({elements: response.data, received: true})

        }, error => {
            this.setState({elements: "Dohvat nije uspio."});
        });
    }

    //u local storage je osoba sa kojoj se dopisujemo sa ovog accounta
    render() {
        if (this.state.received && this.state.elements.length === 0) {
            return <Redirect to={"/poruke"}/>
        }
        var items = []
        var i = 0;
        for (var a of this.state.elements) {

            i++;
            a = this.state.elements[this.state.elements.length - i];
            var ja = AuthService.getCurrentUser().username;

            var on = this.props.match.params.user;
            if (!((ja === a.usernameReceived && on === a.usernameSent)
                || (ja === a.usernameSent && on === a.usernameReceived))) continue;

            var primljena = '';
            var poslana = '';
            if (AuthService.getCurrentUser().username === a.usernameReceived) {
                primljena = <div className="poslana">{a.text}</div>
            } else {
                poslana = <div className="primljena">{a.text}</div>
            }

            items.push(
                <div className="">
                    <br></br>
                    <p><small>{this.formatDateTime(a.time)}</small></p>
                    {primljena}
                    {poslana}

                </div>
            )

        }


        return (
            <div>

                <NavBar/>
                <div className="conversation ">
                    <h2>Razgovor sa : {this.props.match.params.user}</h2>
                    <hr></hr>
                    {items}
                    <br></br>
                    <br></br>
                    <hr></hr>
                    <br></br>

                    <div className="form-group">
                        <textarea
                            className="form-control opis"
                            name="message"
                            value={this.state.text}
                            rows="4"
                            onChange={this.onChangeMessage}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <button
                            className="gumb1"
                            onClick={this.handleNewMessage}
                        >Pošalji poruku
                        </button>
                    </div>

                </div>

            </div>)
    }
}
