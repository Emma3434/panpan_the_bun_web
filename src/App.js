import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import DiaryList from "./pages/DiaryList.js";
import DiaryPage from "./pages/DiaryPage.js"
import About from "./pages/About.js";
import EPanpan from "./pages/EPanpan.js";

function App() {

  return (
    <div>
      <Router forceRefresh = {true}>
        <Switch>
          <Route exact path="/" component={()=><HomePage/>} />
          <Route exact path="/diaries" component={()=><DiaryList/>} />
          <Route path="/diaries/:id" component={({ match })=><DiaryPage match = {match}/>} />
          <Route exact path="/about" component={()=><About/>} />
          <Route exact path="/epanpan" component={()=><EPanpan/>} />
        </Switch>
      </Router>
    </div>
  );

  
}

export default App;
