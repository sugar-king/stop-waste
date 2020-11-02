import '../css_files/Home.css';
import react from 'react'
import logo_stopwaste from '../logo_stopwaste.jpg';

function Home() {
    return (
        <div className="Home">
            <img src={logo_stopwaste} alt="" />




            <div className="gumbici">
                <a className="gumb" href="../prijava">
                    <input type="button" value="Prijava" />
                </a>

                <a className="gumb" href="../registracija">
                    <input type="button" value="Registracija" />
                </a>

            </div>
        </div>

    );
}

export default Home;