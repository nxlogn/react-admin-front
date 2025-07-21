import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

// 图标映射表
const iconMap = {
  home: HomeOutlined,
  appstore: AppstoreOutlined,
  bars: BarsOutlined,
  tool: ToolOutlined,
  user: UserOutlined,
  safety: SafetyOutlined,
  'area-chart': AreaChartOutlined,
  'bar-chart': BarChartOutlined,
  'line-chart': LineChartOutlined,
  'pie-chart': PieChartOutlined,
};

// 将菜单配置转换为 Ant Design Menu 所需的格式
export const transformMenuData = (menuList) => {
  return menuList.map(item => {
    const IconComponent = iconMap[item.icon];
    
    const menuItem = {
      key: item.key,
      label: item.title,
      icon: IconComponent ? <IconComponent /> : null,
    };

    // 如果有子菜单，递归处理
    if (item.children && item.children.length > 0) {
      menuItem.children = transformMenuData(item.children);
    }

    return menuItem;
  });
};
