import { Card, Button, Table, message, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../apis';
import AddUpdateForm from './adUpdateForm';


function Category() {
  // 定义分类列表
  const [categorys, setCategorys] = useState([]);
  // 定义弹窗是否显示
  const [ShowState, setShowState] = useState(0);
  // 定义当前选中的分类
  const [category, setCategory] = useState({});
  // 定义表单实例的状态
  const [form, setForm] = useState(null);

  // 处理表单实例
  const handleFormInstanceReady = (formInstance) => {
    setForm(formInstance);
  };

  // handleOk - 处理表单提交
  const handleOk = async () => {
    if (!form) return;
    
    try {
      // 验证表单
      const values = await form.validateFields();
      console.log('表单数据:', values);
      const {categoryName} = values;
      if (ShowState === 1) {
        // 新增分类
        await reqAddCategory(categoryName);
      } else {
        // 修改分类
        await reqUpdateCategory(category._id, categoryName);
      }
      // 重新获取分类列表
      getCategorys();
      // 重置表单
      form.resetFields();
      message.success(ShowState === 1 ? '新增分类成功' : '修改分类成功');
      setShowState(0);
    } catch (error) {
      console.log('表单验证失败:', error);
    }
  };

  // 获取分类列表
  const getCategorys = async () => {
    const res = await reqCategorys();
    console.log("获取分类列表：", res);
    if(res.status === 0) {
      setCategorys(res.data)
    }else{
      message.error('获取分类列表失败')
    }
  }
  
  // 初始化table数据
  const [columns, setColumns] = useState([]);
  
  const initColumns = () => {
    setColumns([
      {
        title: '品类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'operation',
        width: 300,
        render: (_, category) => 
          <Button type="primary" onClick={()=>{
            setShowState(2)
            setCategory(category)
          }}>修改分类</Button>
        ,
      },
    ])
  }

  useEffect(() => {
    initColumns()
    getCategorys();
  }, [])

  const extra = (
    <Button type="primary" onClick={() => setShowState(1)}>
      <PlusOutlined />
      新增品类
    </Button>
  )
  return (
    <Card
      extra={extra}
    >
      <Table
        columns={columns}
        bordered
        dataSource={categorys}
        rowKey='_id'
        pagination={{
          showQuickJumper: true,
          defaultPageSize: 3,
        }}
      >
      </Table>

      {/* 新增分类弹窗 */}
      <Modal
        title={ShowState === 1 ? '新增分类' : '修改分类'}
        open={ShowState !== 0}
        onCancel={() => setShowState(0)}
        onOk={handleOk}
        destroyOnHidden={false}
      >
        <AddUpdateForm 
          categoryName={ShowState === 2 ? category.name : ''} 
          onFormInstanceReady={handleFormInstanceReady}
        />
      </Modal>
    </Card>
  )
}
export {
  Category,
}