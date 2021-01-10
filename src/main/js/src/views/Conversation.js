import React, {Component} from 'react';
import NavBar from "../components/NavBar/NavBar";
import MessagesService from "../services/messages.service";
import AuthService from "../services/auth.service";

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

    //u local storage je osoba sa kojoj se dopisujemo sa ovog accounta
    render() {
        var items = []
        var i= 0;
        for (var a of this.state.elements) {

            i++;
            a=this.state.elements[this.state.elements.length-i];
            var ja = AuthService.getCurrentUser().username;
            var on = localStorage.getItem("razgovor");
            if (!(ja == a.usernameReceived && on==a.usernameSent
                || ja ==a.usernameSent && on ==a.usernameReceived))continue;

           var primljena ='';
           var poslana ='';
           if (AuthService.getCurrentUser().username.includes(a.usernameReceived)){
              primljena=  <div className="poslana">{a.text}</div>
           }
           else{
               poslana = <div className="primljena">{a.text}</div>
           }

            items.push(

                <div className="">
                <br></br>
                        <p><b> {this.formatDateTime(a.time)}</b></p>
                    {primljena}
                    {poslana}

                </div>



            )

        }


        return(
        <div>

            <NavBar/>
            <div className="conversation ">
                <h2>Razgovor sa : {localStorage.getItem("razgovor")}</h2>
                <hr></hr>
                        {items}
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <a href="novaporuka">

                    <button className="gumb1">Napiši novu poruku</button>
                </a>
            </div>

        </div>)
    }
}
