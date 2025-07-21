import { Card, Button, Table, Modal } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import UserForm from './user-form';
import { reqUsers, reqAddUser, reqUpdateUser, reqRoles, reqRemoveUser } from '../../apis/index';
import { message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

function User() {
  // table的columns配置
  const [columns, setColumns] = useState([]);
  // 用户列表
  const [users, setUsers] = useState([]);
  // 角色列表
  const [roles, setRoles] = useState([]);
  // 模态框的visible
  const [visible, setVisible] = useState(false);
  // 模态框的user
  const [user, setUser] = useState({});
  // 表单实例
  const [form, setForm] = useState(null);


  // 获取所有用户
  const getUsers = useCallback(async () => {
    const res = await reqUsers();
    console.log("获取用户列表", res);
    if (res.status === 0) {
      setUsers(res.data.users);
    }
  }, [setUsers])

  // 处理Modal确认按钮点击事件
  const handleOk = async () => {
    setVisible(false);
    try {
      const values = await form.validateFields();
      if (user._id) {
        // 更新用户
        const updatedUser = { ...user, ...values };
        const res = await reqUpdateUser(updatedUser);
        if (res.status === 0) {
          message.success('更新用户成功');
          getUsers();
        } else {
          message.error('更新用户失败');
        }
      } else {
        // 添加用户
        const res = await reqAddUser(values);
        if (res.status === 0) {
          message.success('添加用户成功');
          getUsers();
        } else {
          message.error('添加用户失败');
        }
      }
    } catch (error) {
      message.error('校验失败');
    }
  }

  // 删除用户
  const removeUser = useCallback((userId) => {
    confirm({
    title: `'确定删除${user.username}用户吗?'`,
    icon: <ExclamationCircleFilled />,
    content: '是否确认',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      const res = await reqRemoveUser(userId);
      if (res.status === 0) {
        message.success('删除用户成功');
        getUsers();
      } else {
        message.error('删除用户失败');
      }
    },
    onCancel() {
      console.log('取消删除用户');
    },
  });
  },[user.username, getUsers])

  // 初始化columns
  const initColumns = useCallback(() => {
    setColumns([
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: (createTime) => {
          if (createTime) {
            return new Date(createTime).toLocaleString()
          } else {
            return '无'
          }
        }
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (roleId) => {
          return roleId
        }
      },
      {
        title: '操作',
        render: user => {
          return (
            <div>
              <Button type='primary' onClick={() => updateUser(user)}>修改</Button>
              <Button danger onClick={()=>removeUser(user._id)}>删除</Button>
            </div>
          )
        }
      }
    ])
  }, [setColumns,removeUser])

  // updateUser
  const updateUser = (user) => {
    setUser(user);
    console.log("修改用户", user);
    setVisible(true);
  }
  // showAddUser
  const showAddUser = () => {
    setUser({});
    console.log("创建用户", user);
    setVisible(true);
  }
  

  // 获取所有角色
  const getRoles = useCallback(async () => {
    const res = await reqRoles();
    console.log("获取角色列表", res);
    if (res.status === 0) {
      setRoles(res.data);
    }
  }, [setRoles])

  // useEffect
  useEffect(() => {
    getUsers();
    getRoles();
  }, [getUsers, getRoles])

  // 初始化columns
  useEffect(() => {
    initColumns();
  }, [initColumns])

  const createUserBtn = (
    <Button type='primary' style={{ display: 'block' }} onClick={() => {
      showAddUser();
    }}>
      创建用户
    </Button>
  )

  return (
    <Card
      title={createUserBtn}
    >
      <Table
        bordered
        rowKey='_id'
        columns={columns}
        dataSource={users}
        pagination={{
          defaultPageSize:2
        }}
      >
      </Table>
      <Modal
        title={user._id ? '修改用户' : '创建用户'}
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={handleOk}
      >
        <UserForm 
          key={user._id || 'new'} 
          user={user} 
          roles={roles}
          setForm={(form) => {
            setForm(form);
          }}
        />
      </Modal>
    </Card>
  )
}
export default User;