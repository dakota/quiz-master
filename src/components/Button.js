import React, {PropTypes} from 'react';
import {Button} from 'react-mdl';

const Button = ({children, onClick}) =>
{
  return (
    <Button raised ripple onClick={onClick}>{children}</Button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
