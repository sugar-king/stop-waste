import react from 'react'
import { Link } from "react-router-dom";
export default class Profile extends Component {
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

