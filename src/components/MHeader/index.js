import { Layout, Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAppDispatch } from '../../store/hooks';
import { removeUser } from '../../store/userSlice';
import StorageUtils from '../../utils/StorageUtils';
import menuList from '../../config/menConfig';
import { useLocation } from 'react-router-dom';
import {reqWeather} from '../../apis/index';
import './index.scss'
const { Header } = Layout;

export default function MHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useUser();
    const dispatch = useAppDispatch();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [weather, setWeather] = useState('');
    // 退出登录
    const logout = () => {
        Modal.confirm({
            title: '确定退出吗？',
            content:"登录信息会被清空",
            onOk: () => {
                StorageUtils.removeUser();
                dispatch(removeUser());
                navigate('/login');
            }
        });
    }
    // 获取标题
    const getTitle = () => {
        let title = '';
        // 根据当前请求的path得到对应的title
        menuList.forEach(item => {
            if (location.pathname === item.key) {
                title = item.title;
            }else if (item.children) {
                const citem = item.children.find(citem => location.pathname === citem.key);
                if (citem) {
                    title = citem.title;
                }
            }
        })
        return title;
    }
    // 动态显示时间
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);
    // 获取天气信息
    useEffect(() => {
        const getWeather = async () => {
            const {weather} = await reqWeather();
            setWeather(weather);
        }
        getWeather();
    }, []);
    return (
        <Header style={{ padding: 0, background: '#fff' }}>
            <div className='header'>
                <h2 className='header-title'>
                    {getTitle()}
                </h2>
                <div className='header-user'>
                    <div className='current-time'>
                        当前时间：{currentTime}
                    </div>
                    <div className='weather'>
                        {weather}
                    </div>
                    <div className='userinfo'>
                        欢迎，{user.username || 'admin'}
                        <Button onClick={logout}>退出</Button>
                    </div>
                </div>
            </div>
        </Header>
    )
}