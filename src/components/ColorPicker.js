import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {COLORS} from '../constants';

class ColorPicker extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      value: props.value
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event)
  {
    this.setState({
      value: event.target.value
    })
  }

  render()
  {
    return (
      <FormControl component="fieldset">
        <RadioGroup container="div" childContainer="div" name="colorOption" value={this.state.value} onChange={this.onChange}>
          {COLORS.map(color => <FormControlLabel value={color} control={<Radio/>} label={color} key={color} />)}
        </RadioGroup>
      </FormControl>
    )
  }
}


export default ColorPicker
