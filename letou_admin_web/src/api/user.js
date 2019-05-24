import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/v1/admin/get_user_info',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function upload_img(formdata){
  // 获取上传凭证
  request({
    url: '/api/v1/common/upload_token',
    method: 'get'
  }).then(res=>{
    console.log(res)
  })
}