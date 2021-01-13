import NavBar from "../components/NavBar/NavBar";
import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../css_files/App.css';
import MessagesService from "../services/messages.service";
import {Redirect} from "react-router-dom";
import {required} from "./Register";


export default class NewAd extends Component {
    constructor(props) {
        super(props);
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.onChangeReceiver = this.onChangeReceiver.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);


        this.state = {
            receiver: this.props.location.name,
            message: "",
            text: ""
        };
    }

    onChangeReceiver(e) {
        this.setState({
            receiver: e.target.value
        });
    }

    onChangeMessage(e) {
        this.setState({
            text: e.target.value
        });
    }


    handleNewMessage(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.state.text === "" || this.state.text.trim() === "") {
            this.setState({text: ""});
            return;
        }

        if (this.checkBtn.context._errors.length === 0) {
            MessagesService.newMessage(this.state.receiver, this.state.text
            ).then(
                response => {
                    this.setState({
                        message: "Poruka uspješno poslana.",
                        successful: true
                    });
                },
                error => {
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                    this.setState({
                        successful: false,
                        message: "Neuspjelo slanje poruke."
                    });
                }
            );
        }
    }

    render() {

        var ime = "";
        if(this.props.match.params.user)ime = this.props.match.params.user;

        if(this.state.successful){
            return <Redirect to={"/poruke/" + this.state.receiver}/>
        }

        return (
            <div className="col-md-12">

                <NavBar/>
                <div className="card card-container">
                    <h2>Nova poruka</h2>

                    <Form

                        onSubmit={this.handleNewMessage}
                        ref={c => {
                            this.form = c;
                        }}
                    >

                        <div className="form-group">
                            <label htmlFor="receiver">Primatelj</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="receiver"
                                value={ime}
                                onChange={this.onChangeReceiver}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Poruka</label>
                            <textarea
                                className="form-control opis"
                                name="message"
                                value={this.state.text}
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