import { Card, Button, Form, Input, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate} from 'react-router-dom';
import { reqCategorys, reqCategoryName, reqAddProduct, reqUpdateProduct } from '../../apis';
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';

function AddUpdate() {
  const navigate = useNavigate();
  // 接受跳转的时候传递的state数据
  const { state } = useLocation();
  const product = state?.product;
  console.log("商品详情", product);
  const isUpdate = !!product._id; // 有商品说明是编辑模式
  const Option = Select.Option;


  // 自定义价格校验规则
  const validatePrice = (rule, value) => {
    if (!value) {
      return Promise.reject('请输入商品价格');
    }
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      return Promise.reject('请输入正确的价格格式（最多两位小数）');
    }
    return Promise.resolve();
  }

  // 获取所有的分类
  const [categoryList, setCategoryList] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  
  const getCategoryList = useCallback(async () => {
    const res = await reqCategorys();
    if (res.status === 0) {
      console.log("分类列表", res.data);
      setCategoryList(res.data);
    }
  }, []);
  
  // 根据分类ID获取分类名称
  const getCategoryNameById = useCallback(async (categoryId) => {
    if (categoryId) {
      const res = await reqCategoryName(categoryId);
      if (res.status === 0) {
        setCategoryName(res.data.name);
      }
    }
  }, []);
  
  useEffect(() => {
    getCategoryList();
  }, [getCategoryList]);
  
  // 编辑模式下获取分类名称
  useEffect(() => {
    if (isUpdate && product?.categoryId) {
      getCategoryNameById(product.categoryId);
    }
  }, [isUpdate, product?.categoryId, getCategoryNameById]);

  const title = (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Button type='link' icon={<ArrowLeftOutlined />} onClick={() => {
        navigate(-1);
      }}>
        返回
      </Button>
      <span style={{ marginLeft: 8 }}>{isUpdate ? '修改商品' : '添加商品'}</span>
    </span>
  )

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const [form] = Form.useForm();


  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      // 添加商品和修改商品的逻辑
      if (isUpdate) {
        // 修改商品 - 需要包含商品ID
        const productData = {
          ...values,
          _id: product._id  // 添加商品ID
        };
        const res = await reqUpdateProduct(productData);
        if (res.status === 0) {
          message.success('修改商品成功');
          // 修改后跳转
          navigate(-1);
        } else {
          message.error(res.msg || '修改商品失败');
        }
      } else {
        // 添加商品
        const res = await reqAddProduct(values);
        if (res.status === 0) {
          message.success('添加商品成功');
          // 添加后跳转
          navigate(-1);
        } else {
          message.error(res.msg || '添加商品失败');
        }
      }
    } catch (error) {
      console.error('操作商品失败:', error);
      message.error('操作商品失败: ' + (error.message || '未知错误'));
    }
  };


  return (
    <Card
      title={title}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="addUpdateForm"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError>
        <Form.Item
          name="name"
          label="商品名称"
          initialValue={product?.name}  
          rules={[
            {
              required: true,
              message: '请输入商品名称',
            },
          ]}
        >
          <Input placeholder='请输入商品名称' />
        </Form.Item>
        <Form.Item
          name="desc"
          label="商品描述"  
          initialValue={product?.desc}  
          rules={[
            {
              required: true,
              message: '请输入商品描述',
            },
          ]}
        >
          <Input placeholder='请输入商品描述' />
        </Form.Item>
        <Form.Item
          name="price"
          label="商品价格" 
          initialValue={product?.price}   
          rules={[
            {
              required: true,
              message: '请输入商品价格',
            },
            {
              validator: validatePrice,
              message: '请输入正确的价格',
            }
          ]}
        >
          <Input placeholder='请输入商品价格' type='number' addonAfter='元' />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="商品分类"
          rules={[
            {
              required: true,
              message: '请选择商品分类',
            },
          ]}
        >
          <Select placeholder={categoryName || '请选择商品分类'}>
            <Option key="empty" value=''>未选择</Option>
            {
              categoryList.map((item) => (
                <Option key={item._id || item.id || `category-${Math.random()}`} value={item._id || item.id}>
                  {item.name}
                </Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
export default AddUpdate;