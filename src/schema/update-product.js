import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().optional(),
  category_id: Yup.number().optional(),
  unit_of_measure: Yup.string()
    .matches(/(kg|unit)/, 'O campo Unidade de Medida é obrigatório')
    .optional(),
  price: Yup.number().moreThan(0, 'Insira um preço válido').optional(),
  estimated_delivery_time: Yup.number()
    .positive('Insira um valor válido')
    .optional(),
  availability: Yup.boolean().optional(),
});
