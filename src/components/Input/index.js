import React, {forwardRef} from 'react';
import {Label, NormalInput, MaskInput} from './styles';

const Input = ({label, type = 'normal', ...inputProps}, ref) => (
  <>
    <Label>{label}</Label>
    {type === 'mask' ? (
      <MaskInput ref={ref} {...inputProps} />
    ) : (
      <NormalInput ref={ref} {...inputProps} />
    )}
  </>
);

export default forwardRef(Input);
