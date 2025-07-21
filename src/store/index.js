import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productSlice from './productSlice';

// 配置Redux store
const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
  },
  // 开发环境下启用Redux DevTools
  devTools: true,
});

export default store;