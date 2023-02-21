import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import DiaryPage from "./pages/DiaryPage.js"
import DiaryList from "./pages/DiaryList.js";

function App() {

  return (
    <div>
      <Router forceRefresh = {true}>
        <Switch>
          <Route exact path="/" component={()=><DiaryList/>} />
          <Route path="/diaries/:id" component={({ match })=><DiaryPage match = {match}/>} />
        </Switch>
      </Router>
    </div>
  );

  
}

export default App;