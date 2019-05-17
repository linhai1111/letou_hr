'use strict';

const Controller = require('egg').Controller;

class AdminLoginController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = 'login';
    const {mysql} = this.app;
    let res  =  await mysql.get("admin_user");
    console.log(res)
  }
}

module.exports = AdminLoginController;
