import React, {forwardRef} from 'react';
import {Label, NormalInput, MaskInput} from './styles';

const Input = ({label, typeInput = 'normal', ...inputProps}, ref) => (
  <>
    <Label>{label}</Label>
    {typeInput === 'mask' ? (
      <MaskInput ref={ref} {...inputProps} />
    ) : (
      <NormalInput ref={ref} {...inputProps} />
    )}
  </>
);

export default forwardRef(Input);
