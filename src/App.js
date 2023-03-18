import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import DiaryList from "./pages/DiaryList.js";
import DiaryPage from "./pages/DiaryPage.js"
import About from "./pages/About.js";
import EPanpan from "./pages/EPanpan.js";
import Edit from "./pages/Edit.js";
import Album from "./pages/Album.js";

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
          <Route exact path="/edit" component={()=><Edit/>} />
          <Route exact path="/album" component={()=><Album/>} />
        </Switch>
      </Router>
    </div>
  );

  
}

export default App;