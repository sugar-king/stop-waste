import react from 'react'
import { Link } from "react-router-dom";
import React, { Component } from "react";
import NavBarPrijavljen from "../components/NavBar/NavBarPrijavljen";

import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import UserService from "../services/user.service";

const API_URL = "http://localhost:8080/api/";
export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            user: UserService.getUserData()


        };
    }


  render() {
    const { currentUser } = this.state;

    return (
          <div className="container">
            <NavBarPrijavljen></NavBarPrijavljen>
              <h3>
                <strong>{currentUser.username}</strong> prijavljen si!
              </h3>
          </div>
          );
          }

}

