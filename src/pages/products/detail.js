import { reqProductDetail, reqCategoryName } from '../../apis';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Card, Button, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


function ProductDetail() {
  // 获取地址栏上的id
  const { id } = useParams();
  // 定义商品详情数据状态
  const [productDetail, setProductDetail] = useState({});
  // 定义商品分类名称状态
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  // 获取商品详情数据
  const getProductDetail = useCallback(async () => {
    const res = await reqProductDetail(id);
    const categoryId = res.data.categoryId;
    console.log("商品详情数据", res);
    if (res.status === 0) {
      setProductDetail(res.data);
      // 根据分类的id获取商品分类的名称
      if (categoryId) {
        const categoryRes = await reqCategoryName(categoryId);
        console.log("分类名称",categoryRes);
        setCategoryName(categoryRes.data.name);
        console.log("商品分类的名称", categoryRes.data.name);
      }
    }
  }, [id]);

  
  // 调用获取商品详情数据的函数
  useEffect(() => {
    getProductDetail();
  }, [getProductDetail]);
  
  const title = (
    <span style={{display: 'flex', alignItems: 'center'}}>
      <Button type='link'  icon={<ArrowLeftOutlined />} onClick={() => {
        navigate(-1);
      }}>
        返回
      </Button>
      <span style={{marginLeft: 8}}>商品详情</span>
    </span>
  )

  return (
    <Card title={title}>
      <List>
        <List.Item label="商品名称">
          <p>商品名称：{productDetail.name}</p>
        </List.Item>
        <List.Item label="商品描述">
          <p>商品描述：{productDetail.desc}</p>
        </List.Item>
        <List.Item label="商品价格">
          <p>商品价格：{productDetail.price}</p>
        </List.Item>
        <List.Item label="商品分类">
          <p>商品分类：{categoryName}</p>
        </List.Item>
      </List>
    </Card>
  )
}
export default ProductDetail;