'use strict';

const Controller = require('egg').Controller;

// 企业规模
class ScaleController extends Controller {
  // 企业规模列表
  async get_list() {
    let { mysql } = this.app;
    let { ctx } = this;
    let res = await mysql.select('letou_company_scale', {
      where: {
        del: 0
      },
      columns: ['id', 'title']
    });
    console.log(res);
    ctx.body = {
      code: 200,
      msg: 'succ',
      data: res
    };
  }

  async add() {
    let { ctx } = this;

    let title = ctx.request.body.title;
    if (title) {
      let is_succ = await this.app.mysql.insert('letou_company_scale', { title });

      if (is_succ.affectedRows  === 1) {
        ctx.body = {
          code: 200,
          msg: '添加成功'
        };
      } else {
        ctx.body = {
          code: 9999,
          msg: '未知错误'
        };

      }


    } else {
      ctx.body = {
        code: 4001,
        msg: '缺少参数'
      };
    }
  }

  async del() {
    let { ctx } = this;

    let id = ctx.request.body.id;
    if(!id){
      ctx.body = {
        code:4001,
        msg:'缺少参数id'
      }
      return
    }

    let is_succ = await this.app.mysql.update("letou_company_scale",{id,del:1});
    if(is_succ.affectedRows ===1 ){
      ctx.body = {
        code: 200,
        msg: 'succ'
      };
    }else {
      ctx.body = {
        code: 9999,
        msg: '未知错误'
      };
    }

  }
}

module.exports = ScaleController;


