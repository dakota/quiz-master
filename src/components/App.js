import React, { Component } from 'react';
import {Router, Route} from 'react-router';
import ConnectionStatus from './ConnectionStatus';
import Contestant from './contestant/index';
import Display from './display/index';
import Host from './host/index';
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App full-height" style={{width: '90%', margin: 'auto'}}>
          <div className="connection-status">
            <ConnectionStatus />
          </div>
          <Route path="/" exact component={Contestant}/>
          <Route path="/host" component={Host}/>
          <Route path="/display" component={Display}/>
        </div>
      </Router>
    );
  }
}

export default App;
