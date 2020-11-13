import React, {Component} from "react";
import NavBarSignedIn from "../components/NavBar/NavBarSignedIn";
import UserService from "../services/user.service";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            content: {}
        };
    }

    componentDidMount() {
        UserService.getUserData().then(
            response => {
                this.setState({
                    user: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/prijava"});
    }

    render() {
        if(this.state.redirect) {
            return  <Redirect to={this.state.redirect} />
        }
        const user = this.state.user;
        if(user){
            return (
                <div className="container">
                    <NavBarSignedIn/>
                    <h3>
                        <strong>{user.name + " " + user.surname}</strong> prijavljen/a si!
                    </h3>
                </div>
            );
        }
        return "";
    }
}

