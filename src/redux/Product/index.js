import {createSlice, createAction} from '@reduxjs/toolkit';

const {reducer, actions} = createSlice({
  name: 'products',
  initialState: {
    products: [],
    lastPage: 0,
    filters: {
      lowestPrice: '',
      greatestPrice: '',
      order: '',
    },
    categories: [],
    token: '',
    user: {},
  },
  reducers: {
    setFilters: (state, {payload}) => {
      state.filters.lowestPrice = payload.lowestPrice
        ? payload.lowestPrice
        : state.filters.lowestPrice;
      state.filters.greatestPrice = payload.greatestPrice
        ? payload.greatestPrice
        : state.filters.greatestPrice;
      state.filters.order = payload.order ? payload.order : state.filters.order;
    },
    setCategories: (state, {payload}) => {
      state.categories = payload.categories;
    },
    setProducts: (state, {payload}) => {
      state.products = payload.products;
      state.lastPage = payload.lastPage;
    },
  },
});

const allActions = {
	...actions,
	searchProduct: createAction('products/search'),
	createProduct: createAction('products/create'),
	fetchProducts: createAction('products/fetch'),
	fetchCategories: createAction('categories/fetch'),
};

export { allActions };

export default reducer;
