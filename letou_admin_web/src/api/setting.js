import request from '@/utils/request'
// 福利列表
export function get_welfare_list() {
  return request({
    url: '/api/v1/admin/get_welfare_list',
    method: 'get',
  })
}
// 删除福利
export function del_welfare(params) {
  return request({
    url: '/api/v1/admin/del_welfare',
    method: 'delete',
    data:params
  })
}
// 添加福利
export function add_welfare(params) {
  return request({
    url: '/api/v1/admin/add_welfare',
    method: 'post',
    data:params
  })
}
// 企业性质 列表
export function get_property_list() {
  return request({
    url: '/api/v1/admin/get_property_list',
    method: 'get',
  })
}
// 删除企业性质
export function del_property(params) {
  return request({
    url: '/api/v1/admin/del_property',
    method: 'delete',
    data:params
  })
}
// 添加企业性质
export function add_property(params) {
  return request({
    url: '/api/v1/admin/add_property',
    method: 'post',
    data:params
  })
}

// 获取企业规模列表
export function get_scale_list() {
  return request({
    url: '/api/v1/admin/get_scale_list',
    method: 'get',
  })
}
// 删除企业规模
export function del_scale(params) {
  return request({
    url: '/api/v1/admin/del_scale',
    method: 'delete',
    data:params
  })
}
// 添加企业规模
export function add_scale(params) {
  return request({
    url: '/api/v1/admin/add_scale',
    method: 'post',
    data:params
  })
}
// 获取行业列表数据
export function get_trade_list() {
  return request({
    url: '/api/v1/admin/get_trade_list',
    method: 'get',
  })
}

// 添加 行业
export function add_trade(params) {
  return request({
    url:'/api/v1/admin/add_trade',
    method:'post',
    data:params
  })
}
