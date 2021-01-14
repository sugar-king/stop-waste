import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import NavBar from "../components/NavBar/NavBar";
import '../css_files/Register.css';
import AuthService from "../services/auth.service";
import Categories from "../components/Categories/Categories";

export const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ovo polje je obavezno!
            </div>
        );
    }
};

export const vemail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Ovo nije ispravan mail.
            </div>
        );
    }
};

export const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Korisničko ime mora biti duljine između 3 i 20 znakova.
            </div>
        );
    }
};

export const vpassword = value => {
    if (value.length == 0) {
        return;
    }
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Lozinka mora biti duljine između 6 i 40 znakova.
            </div>
        );
    }
};

export const vname = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                Ime ne može biti prazno.
            </div>
        );
    }
};

export const vsurname = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                Prezime ne može biti prazno.
            </div>
        );
    }
};

export const vaddress = value => {
    if (value.length < 1) {
        return (
            <div className="alert alert-danger" role="alert">
                Adresa ne može biti prazna
            </div>
        );
    }
};


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getChecked = this.getChecked.bind(this);
        this.setState = this.setState.bind(this);
        this.state = {
            username: "",
            email: "",
            password: "",
            name: "",
            surname: "",

            message: "",
            number: "",
            street: "",
            postalCode: "",
            city: "",
            categories: "",
            role: "",
            successful: false
        };

    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    getChecked() {
        var categories = [];
        var checkboxes = document.getElementsByName('check');
        for (var i = 0; checkboxes[i]; ++i) {
            if (checkboxes[i].checked) {
                categories.push((checkboxes[i]).value);
            }
        }
        this.state.categories = categories;
    }

    handleRegister(e) {
        e.preventDefault();

        this.getChecked();
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
                        postalCode: this.state.postalCode
                    },
                    street: this.state.street,
                    number: this.state.number
                },
                this.state.role,
                this.state.categories
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
                                        onChange={this.handleInputChange}
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
                                        onChange={this.handleInputChange}
                                        validations={[required, vemail]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="password">Lozinka</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
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
                                        onChange={this.handleInputChange}
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
                                        onChange={this.handleInputChange}
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
                                        value={this.state.street}
                                        onChange={this.handleInputChange}
                                        validations={[required, vaddress]}
                                    />

                                    <Input
                                        placeholder="Kućni broj"
                                        type="number"
                                        className="form-control"
                                        name="number"
                                        value={this.state.number}
                                        onChange={this.handleInputChange}//napravit
                                        validations={[required, vaddress]}
                                    />

                                    <Input
                                        placeholder="Poštanski broj"
                                        type="number"
                                        className="form-control"
                                        name="postalCode"
                                        value={this.state.postalCode}
                                        onChange={this.handleInputChange}
                                        validations={[required, vaddress]}
                                    />

                                    <Input
                                        placeholder="Grad"
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={this.state.city}
                                        onChange={this.handleInputChange}
                                        validations={[required, vaddress]}
                                    />
                                </div>

                                <br/>
                                <Categories/>


                                <label htmlFor="role"><b>Uloga:</b></label>
                                <select className="form-control" name="role" onChange={this.handleInputChange}
                                        validations={[required]}>
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>

                                </select>


                                <div className="form-group">
                                    <br/>
                                    <button className="gumb1">Registriraj se</button>
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