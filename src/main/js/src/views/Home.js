import '../css_files/Home.css';
import React from 'react'
import NavBar from "../components/NavBar/NavBar";

function Home() {

    if (localStorage.getItem('user')){

         return <div>
             <NavBar />
             <h1>Popis oglasa</h1>
             </div>
    }


    return (<div>
            <NavBar />
            <h1>Dobro došli u aplikaciju Stop waste!</h1><br/>
            <h2>Cilj ove aplikacije je smanjiti količinu hrane koja završi u otpadu.<br/><br/>
                Stranica je još u razvoju, za pregled oglasa nas posjetite kasnije.</h2>
    </div>

    );
}

export default Home;