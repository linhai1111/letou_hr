'use strict';

const Controller = require('egg').Controller;
const crypto = require('../tools/crypto.js');
const jwt = require('../tools/jwt.js');

class AdminLoginController extends Controller {
  // 登录
  async login() {
    const { ctx } = this;
    const { mysql } = this.app;
    let params = ctx.request.body;
    // console.log(params);
    if (params.username && params.password) {
      let res = await mysql.get('letou_admin_user', { 'username': params.username });
      if (res) {
        console.log(res);
        let pwd = crypto.md5(params.password);
        console.log('加密后的password-->' + pwd);
        let db_pwd = res.password;
        if (pwd === db_pwd) {
          console.log('密码正确 生成 token');
          let token = jwt.encode(res);
          ctx.body = {
            code: 200,
            msg: '登录成功',
            token
          };
        } else {
          console.log('密码错误');
          ctx.body = {
            code: 8002,
            msg: '账号或密码错误'
          };
        }

      } else {
        console.log('无此账号');
        ctx.body = {
          code: 8002,
          msg: '账号或密码错误'
        };
      }
    } else {
      ctx.body = {
        code: 8001,
        msg: '缺少参数'
      };
    }

  }

  // 修改密码
  async change_password() {
    console.log('修改密码');
    let params = this.ctx.request.body;
    let { username, old_pwd, new_pwd } = params;

    if (old_pwd && new_pwd) {
      let res = await this.app.mysql.get('letou_admin_user', { username });
      if (res) {
        old_pwd = crypto.md5(old_pwd);
        let db_pwd = res.password;
        if (old_pwd === db_pwd) {
          console.log('密码正确 准备修改');

          let row = JSON.parse(JSON.stringify(res));
          row.password = crypto.md5(new_pwd);

          let result = await this.app.mysql.update('letou_admin_user', row);

          if (result.affectedRows === 1) {
            this.ctx.body = {
              code: 200,
              msg: '修改成功'
            };
          } else {
            this.ctx.body = {
              code: 8004,
              msg: '修改失败，未知错误'
            };
          }

        } else {
          console.log('密码错误');
          this.ctx.body = {
            code: 8002,
            msg: '密码错误'
          };
        }
      } else {
        this.ctx.body = {
          code: 8002,
          msg: '账号或密码错误'
        };
      }
    } else {
      this.ctx.body = {
        code: 8001,
        msg: '缺少参数'
      };
    }
  }

  // 获取用户信息
  async get_user_info() {
    let { ctx } = this;
    let user_info = jwt.decode(ctx.headers['auth_token']).data;
    let db_res = await this.app.mysql.get("letou_admin_user",{id:user_info.id});
    // console.log(db_res);
    let res = {
      username:db_res.username,
      nickname:db_res.nickname,
      power:db_res.power,
      create_time:db_res.create_time,
      login_time:db_res.login_time
    };
    ctx.body = {
      code:200,
      msg:'succ',
      data:res
    }
  }

  async test() {
    this.ctx.body = {
      code: 200,
      msg: '测试通过'
    };

  }
}

module.exports = AdminLoginController;
