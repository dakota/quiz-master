import React, {Component} from 'react';
import {
  CardMenu,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button
} from 'react-mdl';
import ColorPicker from '../ColorPicker';

class Contestants extends Component {
  constructor(props)
  {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }

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

    const colorPicker = (<ColorPicker ref='colorPicker' value={contestant.color}/>)

    return (
      <CardMenu style={{color: '#fff'}}>
        <IconButton name="more_vert" id={'contestant-menu-' + contestant._id}/>
        <Menu target={'contestant-menu-' + contestant._id} align="right">
          <MenuItem onClick={() =>
          {
            this.handleOpenDialog('Change color?', colorPicker, this.updateColor);
          }}>Change color</MenuItem>
          <MenuItem onClick={() =>
          {
            this.handleOpenDialog('New score:');
          }}>Change score</MenuItem>
          <MenuItem onClick={() =>
          {
            this.props.buzzer(contestant._id)
          }}>Trigger buzzer</MenuItem>
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
      </CardMenu>
    )
  }
}

export default Contestants;
