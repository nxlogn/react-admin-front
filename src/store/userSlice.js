import { createSlice } from '@reduxjs/toolkit';
import storageUtils from '../utils/StorageUtils';

// 初始状态
const initialState = {
  userInfo: storageUtils.getUser() || {},
  isLoggedIn: !!storageUtils.getUser()?._id,
};

// 创建用户slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置用户信息
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = !!action.payload._id;
      // 同步到localStorage
      storageUtils.saveUser(action.payload);
    },
    // 清除用户信息（退出登录）
    removeUser: (state) => {
      state.userInfo = {};
      state.isLoggedIn = false;
      // 清除localStorage
      storageUtils.removeUser();
    },
    // 更新用户信息
    updateUser: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      // 同步到localStorage
      storageUtils.saveUser(state.userInfo);
    },
  },
});

// 导出actions
export const { setUser, removeUser, updateUser } = userSlice.actions;

// 导出selectors
export const selectUser = (state) => state.user.userInfo;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

// 导出reducer
export default userSlice.reducer;