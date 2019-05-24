import request from '@/utils/request'

var qiniu = require('qiniu-js')

let img_pre_url = "http://przo41lya.bkt.clouddn.com/"
export function upload_img(formdata) {
    // 获取上传凭证
    return new Promise((resolve, reject) => {
        request({
            url: '/api/v1/common/upload_token',
            method: 'get'
        }).then(res => {

            //   file: Blob 对象，上传的文件
            let file = formdata.file;
            //   key: 文件资源名 此处用的  当前时间加个随机数 
            let time = new Date();
            let key = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + '-' + time.getMinutes() + '-' + time.getSeconds() + '-' + parseInt(Math.random() * 10000);
            //   token: 上传验证信息，前端通过接口请求后端获得
            let token = res.token;
            // putExtra 对上传文件的一些限制  详见文档 https://developer.qiniu.com/kodo/sdk/1283/javascript
            let putExtra = {}
            // config 对上传时的配置设置  详见文档 https://developer.qiniu.com/kodo/sdk/1283/javascript
            let config = {}

            var observable = qiniu.upload(file, key, token, putExtra, config);
            let observer = {
                next(res) {
                    console.log(res)
                    console.log('进度条数据')
                    // ...
                },
                error(err) {
                    console.log('error')
                    reject(err)
                    // ...
                },
                complete(res) {
                    console.log('上传完成')
                    res.key = img_pre_url + res.key;
                    resolve(res)

                    // ...
                }
            }
            var subscription = observable.subscribe(observer) // 上传开始



        })
    })
}