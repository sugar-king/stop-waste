import "./css_files/App.css"
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Prijava from "./views/Signin";
import Home from "./views/Home";
import Registracija from "./views/Register";
import Profile from "./views/Profile.js";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path='/' exact component={Home}/>
                  <Route path='/prijava' exact component={Prijava}/>
                  <Route path='/registracija' exact component={Registracija}/>
                  <Route path='/profil' exact component={Profile}/>
              </Switch>
          </BrowserRouter>
      </div>

  );
}

export default App;
