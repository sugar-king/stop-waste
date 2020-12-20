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
        this.onChangeReceiver = this.onChangeReceiver.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);


        this.state = {
            receiver: "",
            message: "",

        };
    }

    onChangeReceiver(e) {
        this.setState({
            receiver: e.target.value
        });
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }



    //handle newAD().......

    render() {
        return (
            <div className="col-md-12">

                <NavBar />
                <div className="card card-container">
                    <h2>Nova poruka</h2>


                    <Form
                        /*onSubmit={this.handleNewAd....}*/
                    >
                        <div className="form-group">
                            <label htmlFor="receiver">Primatelj</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="receiver"
                                value={this.state.receiver}
                                onChange={this.onChangeReceiver}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Poruka</label>
                            <textarea

                                className="form-control opis"
                                name="message"
                                value={this.state.message}
                                rows="4"
                                onChange={this.onChangeMessage}
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
                                Pošalji poruku
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