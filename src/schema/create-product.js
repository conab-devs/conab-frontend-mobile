import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('O campo Nome é obrigatório'),
  category_id: Yup.number()
    .required('O campo Categoria é obrigatório')
    .moreThan(0, 'O campo Categoria é obrigatório'),
  unit_of_measure: Yup.string()
    .matches(/(kg|unit)/, 'O campo Unidade de Medida é obrigatório')
    .required('O campo Unidade de Medida é obrigatório'),
  price: Yup.number()
    .moreThan(0, 'Insira um preço válido')
    .required('O campo Unidade de Medida é obrigatório'),
  estimated_delivery_time: Yup.number()
    .moreThan(-1, 'Insira um valor válido')
    .required('O campo Tempo de Entrega é obrigatório'),
  availability: Yup.boolean().required('O campo Disponibilidade é obrigatório'),
});
