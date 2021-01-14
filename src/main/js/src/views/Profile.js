import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import NavBar from "../components/NavBar/NavBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../css_files/Profile.css';
import Categories from "../components/Categories/Categories";
import {required, vaddress, vemail, vname, vpassword, vsurname, vusername} from "./Register";


export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            redirect: null,
            content: {},
            username: "",
            email: "",
            password: "",
            oldPassword: "",
            name: "",
            surname: "",
            address: "",
            role: "",
            message: "",
            number: "",
            street: "",
            postalCode: "",
            city: "",
            categories: []
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
        localStorage.setItem("categories", categories);
    }


    componentDidMount() {
        localStorage.removeItem("categories");
        localStorage.setItem("prvi", "1");
        UserService.getUserData().then(
            response => {
                this.setState({
                    user: response.data,
                    username: response.data.username,
                    email: response.data.email,
                    name: response.data.name,
                    surname: response.data.surname,
                    role: response.data.role,
                    number: response.data.address.number,
                    street: response.data.address.street,
                    postalCode: response.data.address.city.postalCode,
                    city: response.data.address.city.cityName
                });
            },
            error => {
                AuthService.removeUser();
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

        if (!currentUser) {
            this.setState({redirect: "/prijava"});
        }
    }

    handleUpdateProfile(e) {
        e.preventDefault();
        this.getChecked();


        this.setState({
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            UserService.updateUserData(
                this.state.username,
                this.state.email,
                this.state.oldPassword,
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
                    if (response) {
                        if (response.data.token) {
                            localStorage.setItem("user", JSON.stringify(response.data));
                        }
                        this.setState({
                            message: "Podatci uspješno promijenjeni!",
                            successful: true
                        });
                        this.id = setTimeout(() => this.setState({refresh: true}), 2000);

                    }
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (resMessage.includes("401")) {
                        this.setState({
                            successful: false,
                            message: "Neispravna lozinka."
                        })
                    } else {
                        this.setState({
                            successful: false,
                            message: "Neuspjela promjena podataka."
                        });
                    }
                }
            );
        }
    }

    componentWillUnmount() {
        clearTimeout(this.id);
    }

    render() {
        if (this.state.refresh) {
            window.location.reload(false);
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        var user = this.state.user;
        if (this.state.user) {
            return (
                <div className="form-group">
                    <NavBar/>


                    <Form
                        onSubmit={this.handleUpdateProfile}
                        ref={c => {
                            this.form = c;
                        }}
                        className="card card-container"
                    >
                        <h1>
                            Uredi profil
                        </h1>

                        {(
                            <div className="">


                                <div className="form-group">


                                    <label htmlFor="username">Korisničko ime</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder={user.username}
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
                                        placeholder={user.email}
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        validations={[required, vemail]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="password">Trenutna lozinka</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="oldPassword"
                                        autocomplete="current-password"
                                        onChange={this.handleInputChange}
                                        validations={[required, vpassword]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Nova lozinka</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        autocomplete="password"
                                        onChange={this.handleInputChange}
                                        validations={[vpassword]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="name">Ime</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder={user.name}
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
                                        placeholder={user.surname}
                                        value={this.state.surname}
                                        onChange={this.handleInputChange}
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
                                        value={this.state.street}
                                        onChange={this.handleInputChange}
                                        validations={[required, vaddress]}
                                    />

                                    <Input

                                        type="number"
                                        min="1"
                                        className="form-control"
                                        name="number"
                                        placeholder={user.address.number}
                                        value={this.state.number}
                                        onChange={this.handleInputChange}
                                        validations={[required]}
                                    />

                                    <Input

                                        type="number"
                                        min="10000"
                                        className="form-control"
                                        name="postalCode"
                                        placfeholder={user.address.city.postalCode}
                                        value={this.state.postalCode}
                                        onChange={this.handleInputChange}
                                        validations={[required]}
                                    />

                                    <Input

                                        type="text"
                                        className="form-control"
                                        name="city"
                                        placeholder={user.address.city.cityName}
                                        value={this.state.city}
                                        onChange={this.handleInputChange}
                                        validations={[required, vaddress]}
                                    />

                                </div>

                                <br/>
                                <Categories/>


                                <label htmlFor="role">Uloga:</label>
                                <select className="form-control" name="role" onChange={this.handleInputChange}
                                        validations={[required]} value={this.state.role}>
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
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

