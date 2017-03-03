import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';
import ConnectionStatus from './ConnectionStatus';
import Contestant from './contestant/index';
import Display from './display/index';
import Host from './host/index';

class App extends Component {
  render() {
    return (
      <div className="App mdl-typography--text-center full-height" style={{width: '90%', margin: 'auto'}}>
        <div className="connection-status">
          <ConnectionStatus />
        </div>
        <Router history={browserHistory}>
          <Route path="/" component={Contestant}/>
          <Route path="/host" component={Host}/>
          <Route path="/display" component={Display}/>
        </Router>
      </div>
    );
  }
}

export default App;
