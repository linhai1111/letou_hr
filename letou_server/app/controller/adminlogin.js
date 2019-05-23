'use strict';

const Controller = require('egg').Controller;

class AdminLoginController extends Controller {
  async login() {
    const { ctx } = this;

    const { mysql } = this.app;

    let params = ctx.request.body;
    console.log(params);
    if (params.username && params.password) {
      let res  =  await mysql.get("letou_admin_user",{'username':params.username});
      if(res){

      }else {
        ctx.body = {
          code:201,
          msg:'账号或密码错误'
        }
      }
    }else {
      ctx.body = {
        code:201,
        msg:'缺少参数'
      }
    }

  }

  async test() {
    this.ctx.body = 'test';
  }
}

module.exports = AdminLoginController;
