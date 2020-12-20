import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";

export default class Messages extends Component{



    render(){
        const elements = ['Prvi', 'Drugi', 'Treci'];

        var items = []

        for (const [index, value] of elements.entries()) {

            items.push(
                <div className="card-oglas flex">
                    <div>
                        <b>jk51887kralj<br></br></b>


                        <b>jk51887</b>
                    </div>

                    <div >
                        Opet malo vise teksta , necemo samo pocetak poruke pa da se
                        moze uci u poruku , malo je to pretesko za napravit, bolje
                        takve finese na kraju ako bude vremena
                    </div>

                    <div>
                        <b>15:55</b>
                    </div>

                </div>

            )
        }

        return (
            <div>
                <NavBar/>
                <div className=" card-svioglasi">
                    <a href="novaporuka">
                        <button className="gumb1">Napiši novu poruku</button>
                    </a>

                    <div className="flex">
                        <div>
                            <h3>Pošiljatelj</h3>
                            <h3>Primatelj</h3>
                        </div>

                        <h2>Poruka</h2>
                        <h2>Vrijeme slanja</h2>
                    </div>
                    {items}
                </div>

            </div>

        )
    }
}
