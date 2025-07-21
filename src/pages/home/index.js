import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Avatar, Progress} from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  EyeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TrophyOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { useUser } from '../../store/hooks';
import './index.scss';

const { Title, Text } = Typography;

function Home() {
  const user = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 模拟数据
  const statisticsData = [
    {
      title: '总用户数',
      value: 2680,
      prefix: <UserOutlined style={{ color: '#1890ff' }} />,
      suffix: '人',
      precision: 0,
      valueStyle: { color: '#1890ff' },
      trend: { value: 12.5, isUp: true }
    },
    {
      title: '总订单数',
      value: 8946,
      prefix: <ShoppingCartOutlined style={{ color: '#52c41a' }} />,
      suffix: '单',
      precision: 0,
      valueStyle: { color: '#52c41a' },
      trend: { value: 8.2, isUp: true }
    },
    {
      title: '总销售额',
      value: 126800,
      prefix: <DollarOutlined style={{ color: '#faad14' }} />,
      suffix: '元',
      precision: 2,
      valueStyle: { color: '#faad14' },
      trend: { value: 3.1, isUp: false }
    },
    {
      title: '今日访问量',
      value: 1024,
      prefix: <EyeOutlined style={{ color: '#f5222d' }} />,
      suffix: '次',
      precision: 0,
      valueStyle: { color: '#f5222d' },
      trend: { value: 15.8, isUp: true }
    }
  ];

  // 销售趋势图表配置
  const salesChartOption = {
    title: {
      text: '近7天销售趋势',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['销售额', '订单量'],
      top: 30
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: [
      {
        type: 'value',
        name: '销售额(元)',
        position: 'left'
      },
      {
        type: 'value',
        name: '订单量(单)',
        position: 'right'
      }
    ],
    series: [
      {
        name: '销售额',
        type: 'line',
        data: [12000, 15000, 18000, 16000, 22000, 25000, 28000],
        smooth: true,
        itemStyle: {
          color: '#1890ff'
        }
      },
      {
        name: '订单量',
        type: 'bar',
        yAxisIndex: 1,
        data: [120, 150, 180, 160, 220, 250, 280],
        itemStyle: {
          color: '#52c41a'
        }
      }
    ]
  };

  // 分类销售占比图表配置
  const categoryChartOption = {
    title: {
      text: '商品分类销售占比',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 10,
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        name: '销售占比',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '60%'],
        data: [
          { value: 335, name: '电子产品' },
          { value: 310, name: '服装鞋帽' },
          { value: 234, name: '家居用品' },
          { value: 135, name: '图书音像' },
          { value: 148, name: '运动户外' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div className="home-container">
      {/* 欢迎区域 */}
      <Card className="welcome-card">
        <Row align="middle">
          <Col flex="auto">
            <Space size="large">
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <Title level={3} style={{ margin: 0 }}>
                  欢迎回来，{user?.username || '管理员'}！
                </Title>
                <Text type="secondary">
                  今天是 {currentTime.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })} {currentTime.toLocaleTimeString()}
                </Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Space>
              <TrophyOutlined style={{ fontSize: 24, color: '#faad14' }} />
              <Text>今日目标完成度</Text>
              <Progress type="circle" percent={75} width={60} />
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 数据统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {statisticsData.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={item.title}
                value={item.value}
                precision={item.precision}
                valueStyle={item.valueStyle}
                prefix={item.prefix}
                suffix={item.suffix}
              />
              <div style={{ marginTop: 8 }}>
                {item.trend.isUp ? (
                  <ArrowUpOutlined style={{ color: '#52c41a' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#f5222d' }} />
                )}
                <Text
                  style={{
                    color: item.trend.isUp ? '#52c41a' : '#f5222d',
                    marginLeft: 4
                  }}
                >
                  {item.trend.value}%
                </Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  较昨日
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="销售趋势分析" extra={<ClockCircleOutlined />} className="chart-container">
            <ReactECharts option={salesChartOption} style={{ height: 350 }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="商品分类占比" className="chart-container">
            <ReactECharts option={categoryChartOption} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;