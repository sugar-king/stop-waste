import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import NavBar from "../components/NavBar/NavBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../css_files/Profile.css';
import {isEmail} from "validator";
import Categories from "../components/Categories/Categories";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ovo polje je obavezno!
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
                Korisničko ime mora biti duljine između 3 i 20 znakova.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length !== 0 && (value.length < 6 || value.length > 40)) {
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


export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreetName = this.onChangeStreetName.bind(this);
        this.onChangepostalCode = this.onChangepostalCode.bind(this);
        this.onChangeHouseNumber = this.onChangeHouseNumber.bind(this);

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
            houseNumber: "",
            streetName: "",
            postalCode: "",
            city: "",
            categories:""
        };
    }

    onChangeStreetName(e) {
        this.setState({
            streetName: e.target.value
        });
    }

    onChangepostalCode(e) {
        this.setState({
            postalCode: e.target.value
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

    onChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
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


    startingCheck(){
        console.log(AuthService.getCurrentUser().categories);

        var categoryNames = AuthService.getCurrentUser().categories;

        var inputElements = document.getElementsByName('check');
        console.log(inputElements);
        console.log(inputElements.length);
        console.log(inputElements[0]);

    }

    getChecked(){
        var categories=[];
        var checkboxes = document.getElementsByName('check');
        for(var i=0; checkboxes[i]; ++i){
            if(checkboxes[i].checked){
                categories.push((checkboxes[i]).value);
            }
        }
        this.state.categories = categories;
    }


    componentDidMount() {
        this.startingCheck();
        UserService.getUserData().then(
            response => {
                this.setState({
                    user: response.data,
                    role: response.data.role,
                    houseNumber: response.data.address.number,
                    streetName: response.data.address.street,
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

        if (!currentUser) this.setState({redirect: "/prijava"});
    }

    handleUpdateProfile(e) {
        e.preventDefault();


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
                    street: this.state.streetName,
                    number: this.state.houseNumber
                },
                this.state.role
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
                    }
                },
                (error) => {
                    if (error.response.data.message.startsWith("Error")) {
                    this.setState({
                        successful: false,
                        message: error.response.data.message
                    });

                        console.log(error.response)
                       /* this.setState({
                            message: error.response.data
                        });*/
                    }
                }
            );
        }
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
                                    <label htmlFor="password">Trenutna lozinka</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="current-password"
                                        autocomplete="current-password"
                                        onChange={this.onChangeOldPassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Nova lozinka</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        autocomplete="new-password"
                                        onChange={this.onChangePassword}
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
                                        value={user.name}
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

                                        type="number"
                                        className="form-control"
                                        name="streetNumber"
                                        placeholder={user.address.number}
                                        value={user.address.number}
                                        onChange={this.onChangeHouseNumber}//napravit
                                        validations={[required, vaddress]}
                                    />

                                    <Input

                                        type="number"
                                        className="form-control"
                                        name="postalCode"
                                        placeholder={user.address.city.postalCode}
                                        value={user.address.city.postalCode}
                                        onChange={this.onChangepostalCode}
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

                                <br/>
                                <Categories/>


                                <label htmlFor="role">Uloga:</label>
                                <select className="form-control" name="role" onChange={this.onChangeRole}
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

