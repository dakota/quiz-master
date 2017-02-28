import React, {Component} from 'react';
import {RadioGroup, Radio} from 'react-mdl';
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
      <RadioGroup container="div" childContainer="div" name="colorOption" value={this.state.value} onChange={this.onChange}>
        {COLORS.map(color =>
        {
          return <Radio key={color} value={color} ripple>{color}</Radio>;
        })}
      </RadioGroup>
    )
  }
}


export default ColorPicker
