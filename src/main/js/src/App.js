import "./css_files/App.css"
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Singin from "./views/Signin";
import Home from "./views/Home";
import Register from "./views/Register";
import Profile from "./views/Profile.js";
import Messages from "./views/Messages";
import MyAds from "./views/MyAds";
import NewAd from "./views/NewAd"
import NewMessage from "./views/NewMessage"
import CommittedAds from "./views/CommittedAds";
import ReservedAds from "./views/ReservedAds";
import SoldAds from "./views/SoldAds";
import BoughtAds from "./views/BoughtAds";
import Conversation from "./views/Conversation";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path='/' exact component={Home}/>
                  <Route path='/prijava' exact component={Singin}/>
                  <Route path='/registracija' exact component={Register}/>
                  <Route path='/profil' exact component={Profile}/>
                  <Route path='/mojioglasi' exact component={MyAds}/>
                  <Route path='/poruke' exact component={Messages}/>
                  <Route path='/novioglas' exact component={NewAd}/>
                  <Route path='/novaporuka' exact component={NewMessage}/>
                  <Route path='/mojioglasi/predani' exact component={CommittedAds}/>
                  <Route path='/mojioglasi/rezervirani' exact component={ReservedAds}/>
                  <Route path='/mojioglasi/prodani' exact component={SoldAds}/>
                  <Route path='/mojioglasi/kupljeni' exact component={BoughtAds}/>
                  <Route path='/poruke/razgovor' exact component={Conversation}/>
              </Switch>
          </BrowserRouter>
      </div>

  );
}

export default App;
