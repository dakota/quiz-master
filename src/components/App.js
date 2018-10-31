import React, {PureComponent } from 'react';
import {Router, Route} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Contestant from './contestant/index';
import Display from './display/index';
import Host from './host/index';
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

const styles = {
  root: {
    width: '100%',
    margin: 'auto'
  }
};

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <div className={this.props.classes.root}>
          <Route path="/" exact component={Contestant}/>
          <Route path="/host" component={Host}/>
          <Route path="/display" component={Display}/>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
