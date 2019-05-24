'use strict';

const Controller = require('egg').Controller;
const crypto = require('../tools/crypto.js');
const jwt = require('../tools/jwt.js');

class AdminLoginController extends Controller {
    // 登录
    async login() {
        const {ctx} = this;

        const {mysql} = this.app;

        let params = ctx.request.body;
        // console.log(params);

        if (params.username && params.password) {
            let res = await mysql.get("letou_admin_user", {'username': params.username});
            if (res) {
                console.log(res);
                let pwd = crypto.md5(params.password);
                console.log('加密后的password-->' + pwd)
                let db_pwd = res.password;
                if (pwd === db_pwd) {
                    console.log('密码正确 生成 token');
                    let token = jwt.encode(res);
                    ctx.body = {
                        code: 200,
                        msg: '登录成功',
                        token
                    }
                } else {
                    console.log('密码错误')
                    ctx.body = {
                        code: 8002,
                        msg: '账号或密码错误'
                    }
                }

            } else {
                console.log('无此账号')
                ctx.body = {
                    code: 8002,
                    msg: '账号或密码错误'
                }
            }
        } else {
            ctx.body = {
                code: 8001,
                msg: '缺少参数'
            }
        }

    }

    // 修改密码
    async change_password() {

    }

    async test() {
        this.ctx.body = 'test';
    }
}

module.exports = AdminLoginController;
