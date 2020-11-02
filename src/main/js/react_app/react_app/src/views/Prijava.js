import '../css_files/Prijava.css';
import react from 'react'
import logo_stopwaste from "../logo_stopwaste.jpg";

function Prijava() {
    return (




        <div className="Prijava">

            <img src={logo_stopwaste} alt="" />



            <h2>Prijava</h2>
            <form>

                <div className="Redak">
                    <label>Korisničko ime</label>
                    <input name="Korisničko ime"/>
                </div>

                <div className="Redak">
                    <label>Lozinka</label>
                    <input name="Lozinka"/>
                </div>

                <div className="Redak">
                    <button>Prijava</button>

                    <label>Nemate račun?</label>

                    <a className="gumb" href="../registracija">
                        <input type="button" value="Registracija" />
                    </a>
                </div>
            </form>
        </div>
    );
}

export default Prijava;