import NavBar from "../components/NavBar/NavBar";
import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../css_files/App.css';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
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

        this.state = {
            title: "",
            description: "",
            location:"",
            price: "",
            discount:"",
            deadline:"",
            pictureSoucrce:""
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
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


    //handle newAD().......

    render() {
        return (
            <div className="col-md-12">

                <NavBar />
                <div className="card card-container">
                    <h2>Novi oglas</h2>


                    <Form
                        /*onSubmit={this.handleNewAd....}*/
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
                            <label htmlFor="price">Cijena</label>
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
                            <label htmlFor="discount">Popust</label>
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
                                type="datetime-local"
                                className="form-control"
                                name="deadline"
                                value={this.state.deadline}
                                /* nema on change i value , jer nez za ovaj tip podatka */

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pictureSource">Slika</label>
                            <input
                                type="file"
                                className="form-control"
                                name="pictureSource"

                                /* nema on change i value */

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
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
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