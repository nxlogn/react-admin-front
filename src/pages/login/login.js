/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from '../../assets/images/logo.svg';
import './login.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { reqLogin } from '../../apis/index';
import StorageUtils from '../../utils/StorageUtils';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser, useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/userSlice';

function Login() {
  const navigate = useNavigate();
  const user = useUser();
  const dispatch = useAppDispatch();
  
  // 如果用户已经登录，跳转到管理页面
  useEffect(() => {
    if (user._id){
      // 已经登录，跳转到管理页面
      navigate('/admin', { replace: true });
    }
  }, [navigate, user._id]);
  const onFinish = async values => {
    console.log('Received values of form: ', values);
    const { username, password } = values;
    // 直接发送明文密码，后端会进行md5加密
    const res = await reqLogin(username, password);
    console.log("登录信息：", res);
    if (res.status === 0) {
      const userData = res.data;
      // 用户登录信息没有错误，将用户信息保存到localStorage
      StorageUtils.saveUser(userData);
      // 将用户信息保存到Redux store中
      dispatch(setUser(userData));
      // 跳转到管理页面
      navigate('/admin', { replace: true });
      message.success('登录成功');
    }else{
      message.error('登录失败');
    }
  };

  // 命令式校验规则
  const validatePassword = (rule, value, callback) => {
    if (value.length < 4) {
      callback('密码长度不能小于4位');
    } else if (!/[a-zA-Z]/.test(value)) {
      callback('密码必须包含字母');
    } else if (value.length > 16) {
      callback('密码长度不能大于16位');
    } else {
      callback();
    }
  }

  return (
    <div className='login'>
      <div className='login-header'>
        <img src={logo} alt="logo" />
        <h1>后台管理系统</h1>
      </div>
      <div className='login-content'>
        <div>用户登录</div>
        {/* ant-D表单组件 */}
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            // 设置默认值
            initialValue='admin'
            name="username"
            // 声明式校验规则
            rules={[
              { required: true, whitespace: true, message: '请输入用户名' },
              { min: 4, message: '用户名长度不能小于4位' },
              { max: 12, message: '用户名长度不能大于12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a href="">忘记密码</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
            <a href="">现在注册</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Login;
