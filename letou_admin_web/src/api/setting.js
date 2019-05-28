import request from '@/utils/request'

export function get_welfare_list() {
  return request({
    url: '/api/v1/admin/get_welfare_list',
    method: 'get',
  })
}

export function del_welfare(params) {
  return request({
    url: '/api/v1/admin/del_welfare',
    method: 'delete',
    data:params
  })
}
export function add_welfare(params) {
  return request({
    url: '/api/v1/admin/add_welfare',
    method: 'post',
    data:params
  })
}

export function get_property_list() {
  return request({
    url: '/api/v1/admin/get_property_list',
    method: 'get',
  })
}

export function del_property(params) {
  return request({
    url: '/api/v1/admin/del_property',
    method: 'delete',
    data:params
  })
}
export function add_property(params) {
  return request({
    url: '/api/v1/admin/add_property',
    method: 'post',
    data:params
  })
}
export function get_scale_list() {
  return request({
    url: '/api/v1/admin/get_scale_list',
    method: 'get',
  })
}

export function del_scale(params) {
  return request({
    url: '/api/v1/admin/del_scale',
    method: 'delete',
    data:params
  })
}
export function add_scale(params) {
  return request({
    url: '/api/v1/admin/add_scale',
    method: 'post',
    data:params
  })
}

export function get_trade_list() {
  return request({
    url: '/api/v1/admin/get_trade_list',
    method: 'get',
  })
}

