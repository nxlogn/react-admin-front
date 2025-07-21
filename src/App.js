import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import { useAppDispatch } from './store/hooks';
import { setUser } from './store/userSlice';
import StorageUtils from './utils/StorageUtils';


function App() {
  const dispatch = useAppDispatch();

  // 应用启动时从localStorage加载用户信息
  useEffect(() => {
    const user = StorageUtils.getUser();
    if (user && user._id) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* 支持嵌套路由 */}
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
