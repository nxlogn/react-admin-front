# React 管理后台系统

一个基于 React 18 + Antd 5 + Redux Toolkit 构建的现代化管理后台系统，提供完整的用户管理、商品管理、分类管理等功能。

## 🚀 项目特性

- ✨ **现代化技术栈**：React 18 + TypeScript + Antd 5
- 🎯 **完整功能模块**：用户管理、商品管理、分类管理、角色权限
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🎨 **精美UI界面**：基于 Ant Design 设计语言
- 📊 **数据可视化**：集成 ECharts 图表展示
- 🔐 **权限控制**：基于角色的访问控制系统
- 🌐 **国际化支持**：多语言切换功能
- ⚡ **性能优化**：代码分割、懒加载、缓存策略

## 🛠️ 技术栈

### 核心框架
- **React 19.1.0** - 用户界面构建
- **React Router DOM 7.6.3** - 路由管理
- **Redux Toolkit 2.8.2** - 状态管理
- **React Redux 9.2.0** - React-Redux 绑定

### UI 组件库
- **Ant Design 5.26.3** - 企业级UI设计语言
- **@ant-design/icons 6.0.0** - 图标库

### 数据可视化
- **echarts-for-react 3.0.2** - 图表组件

### 网络请求
- **axios 1.10.0** - HTTP 客户端
- **jsonp 0.2.1** - JSONP 请求

### 样式处理
- **Sass 1.89.2** - CSS 预处理器
- **SCSS 0.2.4** - SCSS 支持

### 工具库
- **blueimp-md5 2.19.0** - MD5 加密

## 📦 安装与运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖
```bash
# 克隆项目
git clone <repository-url>

# 进入项目目录
cd my-admin-react-version

# 安装依赖
npm install
# 或
yarn install
```

### 启动开发服务器
```bash
# 启动前端开发服务器
npm start
# 或
yarn start
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

### 构建生产版本
```bash
# 构建生产版本
npm run build
# 或
yarn build
```

### 运行测试
```bash
# 运行测试
npm test
# 或
yarn test
```

## 📁 项目结构

```
my-admin-react-version/
├── public/                 # 静态资源
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                    # 源代码
│   ├── apis/              # API 接口
│   ├── assets/            # 静态资源
│   ├── components/        # 公共组件
│   │   ├── leftNav/       # 左侧导航
│   │   └── MHeader/       # 头部组件
│   ├── config/            # 配置文件
│   ├── pages/             # 页面组件
│   │   ├── home/          # 首页
│   │   ├── login/         # 登录页
│   │   ├── user/          # 用户管理
│   │   ├── products/      # 商品管理
│   │   └── category/      # 分类管理
│   ├── store/             # Redux 状态管理
│   ├── utils/             # 工具函数
│   ├── App.js             # 根组件
│   └── index.js           # 入口文件
├── package.json           # 项目配置
└── README.md             # 项目说明
```

## 🎯 主要功能

### 🏠 首页仪表板
- 数据统计卡片（用户数、订单数、销售额等）
- 销售趋势图表
- 商品分类占比图
- 最新动态列表
- 热销商品排行

### 👥 用户管理
- 用户列表展示
- 用户信息增删改查
- 用户角色分配
- 用户状态管理

### 📦 商品管理
- 商品列表展示
- 商品信息管理
- 商品分类管理
- 商品图片上传
- 商品状态控制

### 🏷️ 分类管理
- 分类层级管理
- 分类增删改查
- 分类排序功能

### 🔐 权限管理
- 角色权限配置
- 菜单权限控制
- 操作权限验证

## 🔧 配置说明

### 环境配置
项目使用代理配置连接后端服务：
```json
{
  "proxy": "http://localhost:5001"
}
```

### API 配置
API 基础配置位于 `src/apis/ajax.js`：
```javascript
const baseURL = 'http://localhost:5001'
```

## 🚀 部署指南

### Vercel 部署（推荐）
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel --prod
```

### Netlify 部署
1. 构建项目：`npm run build`
2. 将 `build` 文件夹拖拽到 Netlify 部署区域

### 自定义服务器部署
1. 构建项目：`npm run build`
2. 将 `build` 文件夹内容上传到服务器
3. 配置 Nginx 或 Apache 服务器

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-username/your-repo/issues)
- 邮箱: your-email@example.com

## 🙏 致谢

感谢以下开源项目的支持：

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [ECharts](https://echarts.apache.org/)
- [Axios](https://axios-http.com/)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！