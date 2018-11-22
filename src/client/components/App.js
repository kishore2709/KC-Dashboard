import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import PlayerAPI from "../api";
import { Link } from "react-router-dom";
import Header from "./Header";
import Home from "./Home/Home";
import LogManagement from "./LogManagement/LogManagement";
import ServiceManagement from "./ServiceManagement/ServiceManagement";
import Setting from "./SettingManagement/Setting";

import { HashRouter } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";

/*
const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)
*/

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/log_management" component={LogManagement} />
      <Route path="/service_management" component={ServiceManagement} />
      <Route path="/setting" component={Setting} />
    </Switch>
  </main>
);

const Roster = () => (
  <div>
    <h2>This is a roster page!</h2>
    <Switch>
      <Route exact path="/roster" component={FullRoster} />
      <Route path="/roster/:number" component={Player} />
    </Switch>
  </div>
);

const Player = props => {
  const player = PlayerAPI.get(parseInt(props.match.params.number, 10));
  if (!player) {
    return <div>Sorry, but the player was not found</div>;
  }
  return (
    <div>
      <h1>
        {player.name} (#{player.number})
      </h1>
      <h2>{player.position}</h2>
    </div>
  );
};

const FullRoster = () => (
  <div>
    <ul>
      {PlayerAPI.all().map(p => (
        <li key={p.number}>
          <Link to={`/roster/${p.number}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Schedule = () => (
  <div>
    <ul>
      <li>6/5 @ Evergreens</li>
      <li>6/8 vs Kickers</li>
      <li>6/14 @ United</li>
    </ul>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <HashRouter history={history}>
              <div>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute
                  exact
                  path="/log_management"
                  component={LogManagement}
                />
                <PrivateRoute
                  exact
                  path="/service_management"
                  component={ServiceManagement}
                />
                <PrivateRoute exact path="/setting" component={Setting} />

                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </div>
            </HashRouter>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
