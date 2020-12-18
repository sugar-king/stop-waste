import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import NavBar from "../components/NavBar/NavBar";

import AuthService from "../services/auth.service";

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

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
//dodao
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreetName = this.onChangeStreetName.bind(this);
        this.onChangeZipCode = this.onChangeZipCode.bind(this);
        this.onChangeHouseNumber = this.onChangeHouseNumber.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            name: "",
            surname: "",
            address: "",
            role: "",
            successful: false,
            message: "",
            houseNumber: "",
            streetName: "",
            zipCode: "",
            city: ""


        };

    }

//dodao prva 4
    onChangeStreetName(e) {
        this.setState({
            streetName: e.target.value
        });
    }

    onChangeZipCode(e) {
        this.setState({
            zipCode: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeHouseNumber(e) {
        this.setState({
            houseNumber: e.target.value
        });
    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSurname(e) {
        this.setState({
            surname: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }


    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();


        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.name,
                this.state.surname,
                {
                    city: {
                        cityName: this.state.city,
                        postalCode: this.state.zipCode
                    },
                    street: this.state.streetName,
                    number: this.state.houseNumber
                },
                this.state.role
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (

            <div className="col-md-12">
                <NavBar/>
                <div className="card card-container">
                <h2>Registracija</h2>

                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Korisničko ime</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
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
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="password">Lozinka</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
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
                                        value={this.state.name}
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
                                        value={this.state.surname}
                                        onChange={this.onChangeSurname}
                                        validations={[required, vsurname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="street">Adresa</label>
                                    <Input
                                        type="text"
                                        placeholder="Ulica"
                                        className="form-control"
                                        name="street"
                                        value={this.state.streetName}
                                        onChange={this.onChangeStreetName}
                                        validations={[required, vaddress]}
                                    />

                                    <Input
                                        placeholder="Kućni broj"
                                        type="text"
                                        className="form-control"
                                        name="streetNumber"
                                        value={this.state.houseNumber}
                                        onChange={this.onChangeHouseNumber}//napravit
                                        validations={[required, vaddress]}
                                    />

                                    <Input
                                        placeholder="Poštanski broj"
                                        type="text"
                                        className="form-control"
                                        name="zipNumber"
                                        value={this.state.zipCode}
                                        onChange={this.onChangeZipCode}
                                        validations={[required, vaddress]}
                                    />

                                    <Input
                                        placeholder="Grad"
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={this.state.address}
                                        onChange={this.onChangeCity}
                                        validations={[required, vaddress]}
                                    />
                                </div>


                                <label htmlFor="role">Uloga:</label>
                                <select className="form-control" name="role" onChange={this.onChangeRole}
                                        validations={[required, vrole]}>
                                    <option value={this.state.role}>Admin</option>
                                    <option value={this.state.role}>Seller</option>
                                    <option value={this.state.role}>Buyer</option>
                                </select>


                                <div className="form-group">
                                    <br/>
                                    <button className="btn btn-primary btn-block">Registriraj se</button>
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
            </div>
        );
    }
}