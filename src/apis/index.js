// 包含应用中所有的请求接口函数
import axios from "./ajax";
import jsonp from 'jsonp';
import {message} from 'antd';
export const reqLogin = (username, password) => {
    return axios({
        url: '/login',
        method: 'POST',
        // json数据转化为urlencode格式
        data: {username, password}
    })
}

// 发送jsonp请求得到天气信息
export const reqWeather = () => {
    return new Promise((resolve, reject)=>{
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=e09f8b1c14258efd2dfee7558b7ba3ce&city=500000`;
        // 参考官方的写法
        jsonp(url, {}, (err, data) => {
            if (!err && data.status === '1') {
                const { weather, temperature, city } = data.lives[0];
                resolve({ weather: `${city} ${weather} ${temperature}°C` });
                console.log('天气获取成功')
            } else {
                message.error('获取天气信息失败');
                resolve({ weather: '天气信息获取失败' });
            }
        })
    })
}

// 获取分类列表
export const reqCategorys = () => {
    return axios({
        url: '/manage/category/list',
        method: 'GET',
    })
}

// 修改分类
export const reqUpdateCategory = (id, categoryName) => {
    return axios({
        url: '/manage/category/update',
        method: 'POST',
        data: {
            categoryId: id, // 修改为 categoryId 以匹配服务器端参数
            categoryName
        }
    })
}

// 添加分类
export const reqAddCategory = (categoryName) => {
    return axios({
        url: '/manage/category/add',
        method: 'POST',
        data: {
            categoryName
        }
    })
}

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => {
  return axios({
    url: '/manage/product/list',
    method: 'GET',
    // 拼接到url后面
    params: {
      pageNum,
      pageSize
    }
  })
}

// 根据搜索关键字，获取商品分页列表
export const reqSearchProducts = (pageNum, pageSize, searchType, searchName) => {
  return axios({
    url: '/manage/product/search',
    method: 'GET',
    // 拼接到url后面
    params: {
      pageNum,
      pageSize,
      // 动态的对象属性名
      [searchType]: searchName
    }
  })
}

// 根据商品Id获取商品详情
export const reqProductDetail = (productId) => {
  return axios({
    url: '/manage/product/info',
    method: 'GET',
    params: {
      productId
    }
  })
}

// 根据分类id获取商品分类的名称
export const reqCategoryName = (categoryId) => {
  return axios({
    url: '/manage/category/info',
    method: 'GET',
    params: {
      categoryId
    }
  })
}

// 添加商品
export const reqAddProduct = (product) => {
  return axios({
    url: '/manage/product/add',
    method: 'POST',
    data: product
  })
}

// 修改商品
export const reqUpdateProduct = (product) => {
  return axios({
    url: '/manage/product/update',
    method: 'POST',
    data: product
  })
}

// 获取所有的用户列表
export const reqUsers = () => {
  return axios({
    url: '/manage/user/list',
    method: 'GET',
  })
}

// 添加当前用户
export const reqAddUser = (user) => {
  return axios({
    url: '/manage/user/add',
    method: 'POST',
    data: user
  })
}

// 更新用户
export const reqUpdateUser = (user) => {
  return axios({
    url: '/manage/user/update',
    method: 'POST',
    data: user
  })
}

// 获取角色列表
export const reqRoles = () => {
  return axios({
    url: '/manage/role/list',
    method: 'GET'
  })
}

// 删除指定的用户
export const reqRemoveUser = (userId) => {
  return axios({
    url: '/manage/user/delete',
    method: 'POST',
    data: {
      userId
    }
  })
}






