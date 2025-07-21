import { useDispatch, useSelector } from 'react-redux';

// 创建类型安全的hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// 导出常用的selector hooks
export const useUser = () => useAppSelector(state => state.user.userInfo);
export const useIsLoggedIn = () => useAppSelector(state => state.user.isLoggedIn);
export const useCurrentProduct = () => useAppSelector(state => state.product.currentProduct);
export const useProductList = () => useAppSelector(state => state.product.productList);
export const useCategories = () => useAppSelector(state => state.product.categories);
export const useLoading = () => useAppSelector(state => state.product.loading);
export const useError = () => useAppSelector(state => state.product.error);