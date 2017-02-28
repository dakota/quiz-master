import React, {Component} from 'react';
import {CLASS_CONTESTANT} from '../constants';
import {Button} from 'react-mdl';

class ConnectionClass extends Component {
  render()
  {
    return (
      <div>
        <p className="lead">Please select:</p>
        <div className="btn-group">
          <Button raised ripple onClick={() => {
            this.props.setClass(CLASS_CONTESTANT);
          }}>Contestant</Button>
        </div>
      </div>
    );
  }
}

export default ConnectionClass;
