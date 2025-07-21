import { createSlice } from '@reduxjs/toolkit';

// 初始状态
const initialState = {
  currentProduct: {},
  productList: [],
  categories: [],
  loading: false,
  error: null,
};

// 创建产品slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // 设置当前产品
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    // 清除当前产品
    clearCurrentProduct: (state) => {
      state.currentProduct = {};
    },
    // 设置产品列表
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    // 添加产品到列表
    addProduct: (state, action) => {
      state.productList.push(action.payload);
    },
    // 更新产品列表中的产品
    updateProduct: (state, action) => {
      const index = state.productList.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.productList[index] = action.payload;
      }
    },
    // 从列表中删除产品
    removeProduct: (state, action) => {
      state.productList = state.productList.filter(p => p._id !== action.payload);
    },
    // 设置分类列表
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    // 设置加载状态
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // 设置错误信息
    setError: (state, action) => {
      state.error = action.payload;
    },
    // 清除错误信息
    clearError: (state) => {
      state.error = null;
    },
  },
});

// 导出actions
export const {
  setCurrentProduct,
  clearCurrentProduct,
  setProductList,
  addProduct,
  updateProduct,
  removeProduct,
  setCategories,
  setLoading,
  setError,
  clearError,
} = productSlice.actions;

// 导出selectors
export const selectCurrentProduct = (state) => state.product.currentProduct;
export const selectProductList = (state) => state.product.productList;
export const selectCategories = (state) => state.product.categories;
export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;

// 导出reducer
export default productSlice.reducer;