import {createSlice, createAction} from '@reduxjs/toolkit';

const {reducer, actions} = createSlice({
  name: 'products',
  initialState: {
    products: [],
    cooperativeProducts: [],
    lastPage: 0,
    filters: {
      lowestPrice: 0,
      greatestPrice: 10000,
      order: 'asc',
    },
    categories: [],
    cart: [],
    product: null,
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
    },
    setLastPage: (state, {payload}) => {
      state.lastPage = payload.lastPage;
    },
    resetCart: (state, {payload}) => {
      state.cart = [];
    },
    setProduct: (state, {payload}) => {
      state.product = payload.product;
    },
    setCooperativeProducts: (state, {payload}) => {
      state.cooperativeProducts = payload.products;
    },
  },
});

export const allActions = {
  ...actions,
  searchProduct: createAction('products/search'),
  createProduct: createAction('products/create'),
  fetchProducts: createAction('products/fetch'),
  fetchProductsByCooperative: createAction('products/fetch/cooperative'),
  fetchCategories: createAction('categories/fetch'),
  updateProductPicture: createAction('products/update/picture'),
  getProduct: createAction('products/get'),
  updateProduct: createAction('products/put'),
  deleteProduct: createAction('products/delete'),
  pushToCart: createAction('products/push-to-cart'),
};

export default reducer;
