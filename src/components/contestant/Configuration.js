import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {CLASS_CONTESTANT} from '../../constants';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {configure} from '../../actions';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class Configuration extends PureComponent {
  state = {
    name: ''
  };

  start() {
    this.props.dispatch(configure(CLASS_CONTESTANT, this.state.name));
  }

  render()
  {
    const {classes} = this.props;

    return (
      <div>
        <Typography variant="h3" gutterBottom>
          Welcome to Quiz Master 3000
        </Typography>

        <div>
          <FormControl fullWidth className={classes.margin}>
            <TextField
              label="What do you want to be known as?"
              value={this.state.name}
              onChange={(event) => this.setState({name: event.target.value})}
            />
          </FormControl>
          <div>
            <Button variant="contained" fullWidth color="primary" onClick={() => this.start()}>Join the quiz</Button>
          </div>
        </div>
      </div>
    )
  }
}

Configuration = connect()(Configuration);

export default withStyles(styles)(Configuration);
