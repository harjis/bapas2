import * as React from 'react';

const Button = props => (
  <div onClick={props.onClick ? props.onClick : () => {}}>
    {props.children}
  </div>
);

export default Button;
