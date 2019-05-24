'use strict';

const Controller = require('egg').Controller;

// 企业规模
class TradeController extends Controller {
  // 企业规模列表
  async get_list() {
    let { mysql } = this.app;
    let { ctx } = this;
    let res1 = await mysql.select('letou_company_trade1', {
      where: {
        del: 0
      },
    });
    let res2 = await mysql.select('letou_company_trade2', {
      where: {
        del: 0
      },
    });
    let res3 = await mysql.select('letou_company_trade3', {
      where: {
        del: 0
      },
    });
    for (let i = 0; i < res1.length; i++) {
      res1[i].child = [];
      for (let j = 0; j < res2.length; j++) {
        res2[j].child =[];
        if (res1[i].id === res2[j].p_id) {
          res1[i].child .push(res2[j]);
        }
        for(let k=0;k<res3.length;k++){
          if(res2[j].id === res3[k].p_id){
            res2[j].child.push(res3[k])

          }
        }
      }
    }
    // console.log(res1);
    ctx.body = {
      code: 200,
      msg: 'succ',
      data: res1,

    };
  }

  async add() {
    let { ctx } = this;

    let title = ctx.request.body.title;
    if (title) {
      let is_succ = await this.app.mysql.insert('letou_company_trade', { title });

      if (is_succ.affectedRows === 1) {
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
    if (!id) {
      ctx.body = {
        code: 4001,
        msg: '缺少参数id'
      };
      return;
    }

    let is_succ = await this.app.mysql.update('letou_company_trade', { id, del: 1 });
    if (is_succ.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: 'succ'
      };
    } else {
      ctx.body = {
        code: 9999,
        msg: '未知错误'
      };
    }

  }
}

module.exports = TradeController;


