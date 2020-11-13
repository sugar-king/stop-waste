import React, {Component} from "react";
import UserService from "../services/user.service";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import NavBar from "../components/NavBar/NavBar";

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
                localStorage.removeItem('user');
                this.setState({redirect: "/prijava"});
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        const user = this.state.user;
        if (user) {
            return (
                <div className="container">
                    <NavBar/>
                    <h3>
                        <strong>{user.name + " " + user.surname}</strong> prijavljeni ste!
                    </h3>
                    {user.email} <br/>
                    <p>
                        {user.address.street} {user.address.number}
                    </p>
                </div>
            );
        }
        return "";
    }
}

