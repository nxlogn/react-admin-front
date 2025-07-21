/* eslint-disable import/no-anonymous-default-export */

// 操作localStorage的工具函数模块
const USER_KEY = 'user_key'
export default {
    // 保存用户信息的方法
    saveUser: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }, 
    // 获取用户信息的方法
    getUser: () => {
        const user = JSON.parse(localStorage.getItem(USER_KEY));
        console.log(user);
        return user || {};
    },
    // 删除用户信息的方法
    removeUser: () => {
        localStorage.removeItem(USER_KEY);
    }
}
