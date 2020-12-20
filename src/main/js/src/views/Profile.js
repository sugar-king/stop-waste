import React, {Component} from "react";
import UserService from "../services/user.service";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import NavBar from "../components/NavBar/NavBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../css_files/Profile.css'
import {isEmail} from "validator";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Ovo nije ispravan mail.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Korisničko imemora biti duljine između 3 i 20 znakova.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Lozinka mora biti duljine između 6 i 40 znakova.
            </div>
        );
    }
};

const vname = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                Ime ne može biti prazno.
            </div>
        );
    }
};

const vsurname = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                Prezime ne može biti prazno.
            </div>
        );
    }
};

const vaddress = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                Adresa ne može biti prazna
            </div>
        );
    }
};

const vrole = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                The vrole must be bigger then 0.
            </div>
        );
    }
};


export default class Profile extends Component {




    constructor(props) {
        super(props);


        this.state = {
            redirect: null,
            content: {},
            username: "",
            email: "",
            password: "",
            name: "",
            surname: "",
            address: "",
            role: "",
            message: "",
            houseNumber: "",
            streetName: "",
            zipCode: "",
            city: ""
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
                <div className="form-group">
                    <NavBar/>


                    <Form
                        //NA OVU SHEMU ISPOD NAPRAVIT SE KAO PODACI U BAZI UREDE
                        /*onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}*/
                        className ="card card-container"
                    >
                        <h1>
                            Uredi profil
                        </h1>

                        {!this.state.successful && (
                            <div className="">




                                <div className="form-group">




                                    <label htmlFor="username">Korisničko ime</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder={user.username}
                                        value={user.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        placeholder={user.email}
                                        value={user.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="password">Nova lozinka</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"

                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>




                                <div className="form-group">
                                    <label htmlFor="name">Ime</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder={user.username}
                                        value={user.username}
                                        onChange={this.onChangeName}
                                        validations={[required, vname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="surname">Prezime</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="surname"
                                        placeholder={user.surname}
                                        value={user.surname}
                                        onChange={this.onChangeSurname}
                                        validations={[required, vsurname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="street">Adresa</label>
                                    <Input
                                        type="text"

                                        className="form-control"
                                        name="street"
                                        placeholder={user.address.street}
                                        value={user.address.street}
                                        onChange={this.onChangeStreetName}
                                        validations={[required, vaddress]}
                                    />

                                    <Input

                                        type="text"
                                        className="form-control"
                                        name="streetNumber"
                                        placeholder={user.address.number}
                                        value={user.address.number}
                                        onChange={this.onChangeHouseNumber}//napravit
                                        validations={[required, vaddress]}
                                    />

                                    <Input

                                        type="text"
                                        className="form-control"
                                        name="zipNumber"
                                        placeholder={user.address.city.postalCode}
                                        value ={user.address.city.postalCode}
                                        onChange={this.onChangeZipCode}
                                        validations={[required, vaddress]}
                                    />

                                    <Input

                                        type="text"
                                        className="form-control"
                                        name="city"
                                        placeholder={user.address.city.cityName}
                                        value={user.address.city.cityName}
                                        onChange={this.onChangeCity}
                                        validations={[required, vaddress]}
                                    />



                                </div>


                                <label htmlFor="role">Uloga:</label>
                                <select className="form-control" name="role" onChange={this.onChangeRole}
                                        validations={[required, vrole]}>
                                    <option value={user.role}>Admin</option>
                                    <option value={user.role}>Seller</option>
                                    <option value={user.role}>Buyer</option>
                                </select>


                                <div className="form-group">
                                    <br/>
                                    <button className="btn btn-primary btn-block gumb1">Uredi</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>



                </div>

            );

        }
        return "";
    }
}

