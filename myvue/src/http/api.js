/**
 * 项目业务请求接口
 */

import request from "./request";

//封装登录接口Api
export function LoginApi(data) {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
}
//封装左侧菜单栏Api
export function AdminApi() {
  return request({
    url: "/menus",
    method: "GET",
  });
}
//封装用户列表渲染Api
export function UsersApi(params){
  return request({
    url:"users",
    method:"GET",
    params
  })
}
//封装单个删除Api
export function delApi(data){
  return request({
    url:"users/"+data,
    method:"DELETE"
  })
}
//封装修改用户状态APi
export function ztApi(data){
  return request({
    url:`users/${data.id}/state/${data.type}`,
    method:"PUT"
  })
}