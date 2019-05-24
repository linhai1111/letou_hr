'use strict';
let qiniu = require('qiniu');

let accessKey = 'yGR6qoHUWr1tFwhbbEcj5fC8BdZEWNQi_WvjsK_X';

let secretKey = 'l--3u7m29MY6eNdP8nrekblx-czapxeyhYGSBllB';

// let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


const Controller = require('egg').Controller;

class CommonController extends Controller {
  async upload_token() {
    let {ctx} = this;

    var options = {
      scope: 'letou'
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);


    ctx.body = {
      code:200,
      token:uploadToken
    }
  }
}

module.exports = CommonController;