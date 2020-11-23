import React from 'react';

import {Btn, BtnText} from './styles';

const Button = ({type, title, ...buttonProps}) => (
  <Btn type={type} {...buttonProps}>
    <BtnText type={type}>{title}</BtnText>
  </Btn>
);

export default Button;
