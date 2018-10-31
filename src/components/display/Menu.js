import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ColorPicker from '../ColorPicker';

class Contestants extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleOpenDialog(dialogTitle, dialogContent, dialogAccept)
  {
    this.setState({
      openDialog: true,
      dialogTitle,
      dialogContent,
      dialogAccept
    });
  }

  handleCloseDialog()
  {
    this.setState({
      openDialog: false
    });
  }

  updateColor()
  {
    this.props.updateValue('color', this.refs.colorPicker.state.value);

    this.handleCloseDialog();
  }

  render()
  {
    const contestant = this.props.contestant;
    const {anchorEl} = this.state;

    const colorPicker = (<ColorPicker ref='colorPicker' value={contestant.color}/>);

    return (
      <>
        <IconButton
          aria-label="More"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          align="right"
        >
          <MenuItem onClick={() => this.handleOpenDialog('Change color?', colorPicker, this.updateColor)}>Change color</MenuItem>
          <MenuItem onClick={() => this.handleOpenDialog('New score:')}>Change score</MenuItem>
          <MenuItem onClick={() => this.props.buzzer(contestant._id)}>Trigger buzzer</MenuItem>
        </Menu>
        <Dialog open={this.state.openDialog}>
          <DialogTitle>{this.state.dialogTitle}</DialogTitle>
          <DialogContent style={{maxHeight: '300px', overflow: 'scroll', textAlign: 'left'}}>
            {this.state.dialogContent}
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.state.dialogAccept}>Update</Button>
            <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default Contestants;
