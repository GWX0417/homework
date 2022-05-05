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
export function UsersApi(params) {
  return request({
    url: "users",
    method: "GET",
    params,
  });
}
//封装单个用户删除Api
export function delApi(data) {
  return request({
    url: "users/" + data,
    method: "DELETE",
  });
}
//封装修改用户状态APi
export function ztApi(data) {
  return request({
    url: `users/${data.id}/state/${data.type}`,
    method: "PUT",
  });
}
//封装添加用户Api
export function tjApi(data) {
  return request({
    url: "users",
    method: "POST",
    data,
  });
}
//封装修改用户Api
export function xgApi(data) {
  return request({
    url: `users/${data.id}`,
    method: "PUT",
    data,
  });
}
//封装角色列表渲染Api
export function jsApi() {
  return request({
    url: "roles",
    method: "GET",
  });
}
//封装角色添加用户Api
export function jstjApi(data) {
  return request({
    url: "roles",
    method: "POST",
    data,
  });
}
//封装删除角色Api
export function jsdelApi(data) {
  return request({
    url: "roles/" + data,
    method: "DELETE",
  });
}
//封装修改角色Api
export function jsxgApi(data) {
  return request({
    url: `roles/${data.id}`,
    method: "PUT",
    data,
  });
}
//封装渲染权限Api
export function qxApi(type) {
  return request({
    url: `rights/${type}`,
    method: "GET",
  });
}
//封装渲染商品Api
export function goodsApi(params) {
  return request({
    url: "goods",
    method: "GET",
    params,
  });
}
//封装删除商品Api
export function goodsdel(data) {
  return request({
    url: "goods/" + data,
    method: "DELETE",
  });
}
//封装用户列表分配角色Api
export function userroles(data) {
  return request({
    url: `users/${data.id}/role`,
    method: "PUT",
    data: data.rid,
  });
}

// 权限列表的接口
export function getRightsListApi(type) {
  return request({
    url: `rights/${type}`,
    method: "GET",
  });
}
// 角色标签删除接口
export function delTagApi(roleid, rightid) {
  return request({
    url: `roles/${roleid}/rights/${rightid}`,
    method: "delete",
  });
}
// 角色授权的接口
export function setRightApi(roleid, rids) {
  return request({
    url: `roles/${roleid}/rights`,
    method: "POST",
    data: { rids },
  });
}
//封装商品分类Api
export function grtGoodsApi(params) {
  return request({
    url: "categories",
    method: "GET",
    params,
  });
}
//封装商品参数的接口
export function getGoodsparams(cateId, sel = "many") {
  return request({
    url: `categories/${cateId}/attributes`,
    method: "GET",
    params: { sel },
  });
}
//商品分类
export function categoriesApi(params) {
  return request({
    url: "/categories",
    method: "GET",
    params,
  });
}
export function editGoodsCateApi(data) {
  console.log(data);
  return request({
    url: "/categories/" + data.cat_id,
    method: "PUT",
    data,
  });
}
export function addGoodLitApi(data) {
  return request({
    url: "/categories",
    method: "POST",
    data,
  });
}
export function addGoodsApi(data) {
  return request({
    url: "/goods",
    method: "POST",
    data,
  });
}
//编辑提交参数
export function addparams(cateId,attrId,data){
  return request({
    url:`categories/${cateId}/attributes/${attrId}`,
    method:"PUT",
    data
  })
}
