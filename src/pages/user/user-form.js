import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';

const { Option } = Select;

/**
 * 用户表单组件 - 使用最新的React Hooks和Ant Design语法
 * @param {Object} props - 组件属性
 * @param {Array} props.roles - 角色列表
 * @param {Object} props.user - 用户信息
 * @param {Function} props.setForm - 设置表单实例的回调函数
 */
const UserForm = ({ roles = [], user = {}, setForm }) => {
  // 使用Form.useForm()创建表单实例
  const [form] = Form.useForm();

  // 当组件挂载时，将表单实例传递给父组件
  useEffect(() => {
    if (setForm) {
      setForm(form);
    }
  }, [form, setForm]);

  // 当user prop变化时，更新表单字段值
  useEffect(() => {
    form.setFieldsValue({
      username: user.username,
      password: user.password,
      phone: user.phone,
      email: user.email,
      role_id: user.role_id,
      prefix: '86'
    });
  }, [form, user]);

  // 表单布局配置
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 }
  };

  // 手机号前缀选择器
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form 
      form={form}
      {...formItemLayout}
      initialValues={{
        username: user.username,
        password: user.password,
        phone: user.phone,
        email: user.email,
        role_id: user.role_id,
        prefix: '86'
      }}
    >
      {/* 用户名字段 */}
      <Form.Item 
        label="用户名" 
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      {/* 密码字段 - 只在新增用户时显示 */}
      {!user._id && (
        <Form.Item 
          label="密码" 
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
      )}

      {/* 手机号字段 */}
      <Form.Item 
        label="手机号" 
        name="phone"
        rules={[
          { 
            required: true, 
            message: '请输入正确的手机号码' 
          }
        ]}
      >
        <Input 
          addonBefore={prefixSelector} 
          style={{ width: '100%' }} 
          placeholder="请输入手机号" 
        />
      </Form.Item>

      {/* 邮箱字段 */}
      <Form.Item 
        label="邮箱" 
        name="email"
        rules={[
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确',
          },
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      {/* 角色选择字段 */}
      <Form.Item 
        label="角色" 
        name="role_id"
        rules={[
          {
            required: true,
            message: '必须指定角色',
          },
        ]}
      >
        <Select placeholder="请选择角色">
          {roles.map(role => (
            <Option key={role._id} value={role._id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default UserForm;