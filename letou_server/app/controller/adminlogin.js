'use strict';

const Controller = require('egg').Controller;

class AdminLoginController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = 'login';
    const {mysql} = this.app;
    let res  =  await mysql.get("letou_admin_user");
    console.log(res)
  }

  async test(){
    this.ctx.body = "test"
  }
}

module.exports = AdminLoginController;
