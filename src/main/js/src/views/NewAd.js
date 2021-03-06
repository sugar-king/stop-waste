import React, {Component} from "react";
import AdsService from "../services/ads.service";
import NavBar from "../components/NavBar/NavBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../css_files/App.css';
import dateFormatter from "../services/date-formatter";
import {Redirect} from "react-router-dom";
import {required} from "./Register";


export default class NewAd extends Component {
    constructor(props) {
        super(props);
        this.handleNewAd = this.handleNewAd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onChangePictureSource = this.onChangePictureSource.bind(this);

        this.state = {
            title: "",
            description: "",
            location: "",
            price: "",
            discount: "",
            deadline: "",
            pictureSource: "",
            category: "Napitci",
            redirect: false
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

    onChangePictureSource(e) {
        this.setState({
            pictureSource: e.target.files[0],
        })
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
                this.state.deadline +":00",
                this.state.category
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
                            message: "Dogodila se pogre??ka!"
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
            return <Redirect to={"/mojioglasi/objavljeni"}/>
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
                                onChange={this.handleInputChange}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Kratki opis</label>
                            <textarea

                                className="form-control opis"
                                name="description"
                                value={this.state.description}
                                rows="4"
                                onChange={this.handleInputChange}
                                validations={[required]}
                            />
                        </div>



                        <div className="form-group">
                            <label htmlFor="price">Cijena (kn)</label>
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                name="price"
                                value={this.state.price}

                                onChange={this.handleInputChange}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="discount">Popust (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                className="form-control"
                                name="discount"
                                value={this.state.discount}

                                onChange={this.handleInputChange}
                                validations={[required]}
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="deadline">Rok</label>
                            <input
                                onChange={this.handleInputChange}
                                type="datetime-local"
                                min={dateFormatter(new Date()).substr(0, 16)}
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
                                accept="image/*"
                            />
                        </div>
                    <br/>


                        <div >
                            <label><b>Kategorija</b></label>
                            <select name="category" id="category" onChange={this.handleInputChange}>
                                <option value="Napitci">Napitci</option>
                                <option value="Mlije??ni proizvodi">Mlije??ni proizvodi</option>
                                <option value="Ulje i mast">Ulje i mast</option>
                                <option value="Med">Med</option>
                                <option value="Meso">Meso</option>
                                <option value="Vo??e i povr??e">Vo??e i povr??e</option>
                                <option value="Zimnica">Zimnica</option>
                                <option value="Ora??asti plodovi">Ora??asti plodovi</option>
                                <option value="Za??ini">Za??ini</option>
                                <option value="Bra??no i kruh">Bra??no i kruh</option>
                                <option value="Kola??i i slatki??i">Kola??i i slatki??i</option>
                                <option value="Ostalo">Ostalo</option>
                            </select>
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