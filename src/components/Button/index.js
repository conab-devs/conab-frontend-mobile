import React from 'react';

import {Btn, BtnText} from './styles';

const Button = ({type, title, borderWidth = 2, ...buttonProps}) => (
  <Btn type={type} borderWidth={borderWidth} {...buttonProps}>
    <BtnText type={type}>{title}</BtnText>
  </Btn>
);

export default Button;
