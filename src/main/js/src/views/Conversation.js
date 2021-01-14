import React, {Component} from 'react';
import NavBar from "../components/NavBar/NavBar";
import MessagesService from "../services/messages.service";
import AuthService from "../services/auth.service";
import '../css_files/App.css';

export const formatDateTime = (dateTime) => {
    if (dateTime === undefined) {
        return;
    }
    const year = dateTime.substring(0, 4)
    const month = dateTime.substring(5, 7)
    const day = dateTime.substring(8, 10)
    const time = dateTime.substring(11, 16)

    return `${day}.${month}.${year}. ${time}`
}

export default class Conversation extends Component {


    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
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
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {

        var items = []
        var i = 0;
        for (var a of this.state.elements) {

            i++;
            a = this.state.elements[this.state.elements.length - i];
            var ja = AuthService.getCurrentUser().username;

            var on = this.props.match.params.user;
            if (!((ja === a.usernameReceived && on === a.usernameSent)
                || (ja === a.usernameSent && on === a.usernameReceived))) {
                continue;
            }

            var primljena = '';
            var poslana = '';
            if (AuthService.getCurrentUser().username === a.usernameReceived) {
                primljena = <div className="poruka poslana">{a.text}</div>
            } else {
                poslana = <div className="poruka primljena">{a.text}</div>
            }
            items.push(
                <div className="">
                    <br/>
                    <p><small>{formatDateTime(a.time)}</small></p>
                    {primljena}
                    {poslana}

                </div>
            )

        }


        return (
            <div>

                <NavBar/>
                <div className="conversation">
                    <h2>Razgovor sa : {this.props.match.params.user}</h2>
                    <hr/>
                    <div class="scroll">
                        {items}
                        <div ref={(el) => {
                            this.messagesEnd = el;
                        }}/>
                    </div>

                    <br/>
                    <br/>
                    <hr/>
                    <br/>

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
