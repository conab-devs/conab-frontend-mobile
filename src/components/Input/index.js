import React, {forwardRef} from 'react';

import {Label, Input as InputText} from './styles';

const Input = ({label, ...inputProps}, ref) => (
  <>
    <Label>{label}</Label>
    <InputText ref={ref} {...inputProps} />
  </>
);

export default forwardRef(Input);
