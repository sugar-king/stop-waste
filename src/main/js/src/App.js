import "./css_files/App.css"
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Singin from "./views/Signin";
import Home from "./views/Home";
import Register from "./views/Register";
import Profile from "./views/Profile.js";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path='/' exact component={Home}/>
                  <Route path='/prijava' exact component={Singin}/>
                  <Route path='/registracija' exact component={Register}/>
                  <Route path='/profil' exact component={Profile}/>
              </Switch>
          </BrowserRouter>
      </div>

  );
}

export default App;
