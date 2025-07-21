import { Card, Button, Select, Input, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback} from 'react';  
import { reqProducts, reqSearchProducts } from '../../apis';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;
const PAGE_SIZE = 2;

function ProductHome() {
  const [searchType, setSearchType] = useState('productName');
  const [searchName, setSearchName] = useState('');
  const [columns, setColumns] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const extra = (
    <Button type='primary' icon={<PlusOutlined />} onClick={() => {
      navigate('addUpdate', {
        state: {
          product: {},
        }
      });
    }}>
      新增商品
    </Button>
  )

  // 初始化行信息
  const initColumns = useCallback(() => {
    setColumns([
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title:'商品价格',
        dataIndex:'price',
        render: (price) => `¥${price.toFixed(2)}`
      },
      {
        title:'商品状态',
        render: (status) => {
          return (
            <span>
              <Button>在售</Button>
            </span>
          )
        }
      },
      {
        title:'操作',
        width: 120,
        render: (record) => {
          return (
            <span>
              <Button type='link' onClick={() => {
                console.log("商品信息", record);
                navigate(`detail/${record._id}`);
              }}>详情</Button>
              <Button type='link' onClick={() => {
                // 传入product到缓存
                navigate(`addUpdate`, {
                  state: {
                    product: record,
                  }
                });
              }}>修改</Button>
            </span>
          )
        }
      },
    ]);
  }, [setColumns, navigate]);

  // 获取商品分页列表
  const getProducts = useCallback(async (pageNum) => {
    let res;
    if(!isSearch) {
      res = await reqProducts(pageNum, PAGE_SIZE);
    }else {
      res = await reqSearchProducts(pageNum, PAGE_SIZE, searchType, searchName);
    }
    // 公共处理
    if (res.status === 0) {
      const {list, total} = res.data;
      setProducts(list);
      setTotal(total);  
    }
  }, [isSearch, searchType, searchName]);

  useEffect(() => {
    initColumns();
    getProducts(1);
  },[getProducts, initColumns]);


  const title = (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Select value={searchType} onChange={(value) => setSearchType(value)} style={{ width: 200, }}>
        <Option value='productName'>按照名称搜索</Option>
        <Option value='productDes'>按照描述搜索</Option>
      </Select>
      <Input
        style={{ marginLeft: 10, width: 200 }}
        placeholder={`请输入${searchType === 'productName' ? '商品名称' : '商品描述'}`}
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <Button
        style={{ marginLeft: 10 }} 
        onClick={() => {
          // 搜索的操作
          setIsSearch(true);
          getProducts(1);
        }}
      >
        搜索
      </Button>
    </span>
  )
  return (
    <Card
      title={title}
      extra={extra}
    >
      <Table
        bordered
        columns={columns}
        dataSource={products}
        rowKey={(record) => record._id}
        pagination={{
          total: total,
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          onChange: (pageNum, pageSize) => {
            getProducts(pageNum);
          }
        }}
      />
    </Card>
  )
}
export default ProductHome;
