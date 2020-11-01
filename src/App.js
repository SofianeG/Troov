import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Home from "./screen/home/Home";
import Login from "./screen/login/Login";
import Register from "./screen/register/Register";
import Movie from "./screen/movie/Movie";
import AddMovie from "./screen/addmovie/AddMovie";
import EditMovie from "./screen/editmovie/EditMovie";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/movie/:id" component={Movie} />
        <Route exact path="/addmovie" component={AddMovie} />
        <Route exact path="/editmovie/:id" component={EditMovie} />
      </Switch>
    </Router>
  );
}

export default App;
