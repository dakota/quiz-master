import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {persistStore} from 'redux-persist'
import BuzzerButton from './BuzzerButton';
import Configuration from './Configuration';
import {configure} from '../../actions';
import store from '../../store';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ConnectionStatus from '../ConnectionStatus';

const styles = theme => ({
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    marginTop: 70
  }
});

class Contestant extends PureComponent {
  constructor(props)
  {
    super(props);

    const theme = createMuiTheme({
      palette: {
        primary: typeof colors[props.color] !== 'undefined' ? colors[props.color] : colors.amber,
      },
      typography: {
        useNextVariants: true,
      },
    });

    this.state = {
      rehydrated: false,
      theme
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.color !== prevProps.color) {
      const theme = createMuiTheme({
        palette: {
          primary: typeof colors[this.props.color] !== 'undefined' ? colors[this.props.color] : colors.amber,
        },
        typography: {
          useNextVariants: true,
        },
      });
      this.setState({theme});
    }
  }

  componentWillMount()
  {
    persistStore(store, {whitelist: ['id', 'class', 'contestant']}, () =>
    {
      this.setState({rehydrated: true});
      if (this.props.name) {
        this.props.dispatch(configure(this.props.class));
      }
    });
  }

  render()
  {
    const {classes} = this.props;

    if (!this.state.rehydrated) {
      return (
        <div>Loading...</div>
      )
    }

    if (!this.props.configured) {
      return (<Configuration/>);
    }

    return (
      <MuiThemeProvider theme={this.state.theme}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" className={classes.grow}>{this.props.name}</Typography>
            <div>
              <Badge badgeContent={this.props.score} color="secondary">
                <AccountCircle />
              </Badge>
              <ConnectionStatus />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.container}>
          <BuzzerButton/>
        </div>
      </MuiThemeProvider>
    );
  }
}

Contestant = connect((store) => ({
  configured: store.configured,
  class: store.class,
  color: store.contestant.color,
  score: store.contestant.score,
  name: store.contestant.name
}))(Contestant);

export default withStyles(styles)(Contestant);
