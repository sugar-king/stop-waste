import "./css_files/App.css"
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Singin from "./views/Signin";
import Home from "./views/Home";
import Register from "./views/Register";
import Profile from "./views/Profile.js";
import MojiOGlasi from "./views/MojiOglasi";
import Poruke from "./views/Poruke";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path='/' exact component={Home}/>
                  <Route path='/prijava' exact component={Singin}/>
                  <Route path='/registracija' exact component={Register}/>
                  <Route path='/profil' exact component={Profile}/>
                  <Route path='/mojioglasi' exact component={MojiOGlasi}/>
                  <Route path='/poruke' exact component={Poruke}/>
              </Switch>
          </BrowserRouter>
      </div>

  );
}

export default App;
