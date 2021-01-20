import {createSlice, createAction} from '@reduxjs/toolkit';

const {reducer, actions} = createSlice({
  name: 'products',
  initialState: {
    products: [],
    lastPage: 0,
    filters: {
      lowestPrice: 0,
      greatestPrice: 10000,
      order: 'asc',
    },
    categories: [],
    cart: [],
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
    pushToCart: (state, {payload}) => {
      const founded = state.cart.find((el) => el.id === payload.product.id);

      if (!founded) {
        state.cart.push(payload.product);
      }
    },
    resetCart: (state, {payload}) => {
      state.cart = [];
    },
  },
});

export const allActions = {
  ...actions,
  searchProduct: createAction('products/search'),
  createProduct: createAction('products/create'),
  fetchProducts: createAction('products/fetch'),
  fetchCategories: createAction('categories/fetch'),
};

export default reducer;
