import React, {Component} from "react";
import AdsService from "../services/ads.service";
import NavBar from "../components/NavBar/NavBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../css_files/App.css';
import dateFormatter from "../services/date-formatter";
import {Redirect} from "react-router-dom";

const required = value => {
    if (!value) {
        return (
            <div className="alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class NewAd extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangePictureSource = this.onChangePictureSource.bind(this);
        this.handleNewAd = this.handleNewAd.bind(this);

        this.state = {
            title: "",
            description: "",
            location: "",
            price: "",
            discount: "",
            deadline: "",
            pictureSource: "",
            redirect: false
        };

    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangePictureSource(e) {
        this.setState({
            pictureSource: e.target.files[0],
            loaded: 0,
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeDiscount(e) {
        this.setState({
            discount: e.target.value
        });
    }

    onChangeDeadline(e) {
        this.setState({
            deadline: e.target.value
        });
    }


    handleNewAd(e) {
        e.preventDefault();
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            var inputDate = dateFormatter(new Date());
            AdsService.postAd(
                this.state.title,
                this.state.pictureSource,
                this.state.description,
                this.state.price,
                this.state.discount,
                inputDate,
                this.state.deadline +":00"
            ).then(
                response => {
                    if (response) {
                        this.setState({
                            message: "Oglas objavljen!",
                            successful: true
                        });
                        this.id = setTimeout(() => this.setState({ redirect: true }), 2000);
                    }
                },
                (error) => {
                    if (error.response.data.message) {
                        this.setState({
                            successful: false,
                            message: error.response.data.message
                        })
                    } else {
                        this.setState({
                            successful: false,
                            message: "Dogodila se pogreška!"
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
        if (this.state.redirect === true) {
            return <Redirect to={"/mojioglasi/predani"}/>
        }
        return (
            <div className="col-md-12">

                <NavBar/>
                <div className="card card-container">
                    <h2>Novi oglas</h2>

                    <Form
                        onSubmit={this.handleNewAd}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="title">Naslov</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Kratki opis</label>
                            <textarea

                                className="form-control opis"
                                name="password"
                                value={this.state.description}
                                rows="4"
                                onChange={this.onChangeDescription}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Lokacija</label>
                            <input
                                type="text"
                                className="form-control"
                                name="password"
                                value={this.state.location}

                                onChange={this.onChangeLocation}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Cijena (kn)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                value={this.state.price}

                                onChange={this.onChangePrice}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="discount">Popust (%)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="discount"
                                value={this.state.discount}

                                onChange={this.onChangeDiscount}
                                validations={[required]}
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="deadline">Rok</label>
                            <input
                                onChange={this.onChangeDeadline}
                                type="datetime-local"
                                className="form-control"
                                name="deadline"
                                /* nema on change i value , jer nez za ovaj tip podatka */

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pictureSource">Slika</label>
                            <input
                                type="file"
                                className="form-control"
                                name="pictureSource"
                                ref={this.photo}
                                onChange={this.onChangePictureSource}
                                validations={[required]}
                            />
                        </div>


                        <br/>
                        <div className="form-group">
                            <button
                                className="gumb1"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"/>
                                )}
                                Dodaj oglas
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert" role="alert">
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