import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useUser } from '../../store/hooks';
import Home from '../home';
import Product from '../products/product';
import User from '../user';
import { Category } from '../category';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import './admin.scss';
import { Navigate } from 'react-router-dom';
import MHeader from '../../components/MHeader';
import { Layout, theme} from 'antd';
import LeftNav from '../../components/leftNav';
const { Content} = Layout;


function Admin() {
  // 侧边栏折叠状态
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const user = useUser();

  useEffect(() => {
    if (!user._id) {
      // 没有用户信息，跳转到登录页面
      navigate('/login', { replace: true });
    }
  }, [navigate, user._id]);

  return (
    <div className='admin'>
      <Layout style={{ height: '100%' }}>
        {/* 侧边栏部分 */}
        <LeftNav collapsed={collapsed} />
        {/* 导航部分 */}
        <Layout style={{ height: '100%' }}>
          <MHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          {/* 内容部分 */}
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* 路由配置 */}
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="category" element={<Category />} />
              <Route path="product" element={<Product />} />
              <Route path="user" element={<User />} />
              <Route path="charts/bar" element={<Bar />} />
              <Route path="charts/line" element={<Line />} />
              <Route path="charts/pie" element={<Pie />} />
              {/* 让product支持嵌套路由 */}
              <Route path="product/*" element={<Product />} />
              {/* 重定向 */}
              <Route path="*" element={<Navigate to="/admin/home" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Admin;
