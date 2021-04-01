import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Front from './front'
import Main from "./main";
import Login from './login'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Front />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/main" render={() => <Main />} />;
      </Switch>
    </BrowserRouter>
  );
};

export default App;
