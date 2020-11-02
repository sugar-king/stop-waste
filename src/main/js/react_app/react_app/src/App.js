import './css_files/App.css';
import react from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Prijava from "./views/Prijava";
import React from "react";
import Home from "./views/Home";
import Registracija from "./views/Registracija";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path='/' exact component={Home}/>
                  <Route path='/prijava' exact component={Prijava}/>
                  <Route path='/registracija' exact component={Registracija}/>
              </Switch>
          </BrowserRouter>
      </div>

  );
}

export default App;
