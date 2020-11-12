import react from 'react'
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
export default class Profile{
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
          <div className="container">

              <h3>
                <strong>{currentUser}</strong> prijavljen si!
              </h3>
          </div>
          );
          }
          }

