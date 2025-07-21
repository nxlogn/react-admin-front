import { Layout, Menu } from 'antd';
import logo from '../../assets/images/logo192.png'
import './index.scss'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import menuList from '../../config/menConfig';
import { transformMenuData } from '../../utils/menuUtils';

const { Sider } = Layout;

// 转换菜单数据
const menuItems = transformMenuData(menuList);

const LeftNav = ({ collapsed }) => {
    const navigate = useNavigate();

    // 处理菜单点击事件
    const handleMenuClick = ({ key }) => {
        navigate(key);
    };

    // 获取当前的路由路径
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(currentPath)

    // 如果当前子菜单的路径包含在当前路径中，就展开父菜单
    const currentMenuKey = menuItems.find(menu => {
        if (menu.children) {
            return menu.children.some(child => currentPath.includes(child.key));
        }
        return false;
    });

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className='logo'>
                <Link className='left-nav-link' to='/admin/home'>
                    <img src={logo} alt='logo' />
                    <h1>黄岽凌的后台管理系统</h1>
                </Link>
                {/* 导航菜单 */}
                <Menu
                    selectedKeys={[currentPath]}
                    defaultOpenKeys={currentMenuKey ? [currentMenuKey.key] : []}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </div>
        </Sider>
    )
}
export default LeftNav;
