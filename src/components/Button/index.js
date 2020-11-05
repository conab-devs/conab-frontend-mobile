import React from 'react';

import {Btn, BtnText} from './styles';

const Button = ({type, title, ...buttonProps}) => (
  <Btn {...buttonProps}>
    <BtnText type={type}>{title}</BtnText>
  </Btn>
);

export default Button;
