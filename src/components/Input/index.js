import React, {forwardRef} from 'react';
import {Label, InputNormal, InputMask} from './styles';

const Input = ({label, typeInput = 'normal', ...inputProps}, ref) => (
  <>
    <Label>{label}</Label>
    {typeInput === 'mask' ? (
      <InputMask ref={ref} {...inputProps} />
    ) : (
      <InputNormal ref={ref} {...inputProps} />
    )}
  </>
);

export default forwardRef(Input);
