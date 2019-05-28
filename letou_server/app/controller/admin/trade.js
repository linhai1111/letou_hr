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
      res1[i].children = [];
      res1[i].label = res1[i].title;
      for (let j = 0; j < res2.length; j++) {
        res2[j].children =[];
        res2[j].label = res2[j].title;
        if (res1[i].id === res2[j].p_id) {
          res1[i].children .push(res2[j]);
        }
        for(let k=0;k<res3.length;k++){
          res3[k].label = res3[k].title;
          if(res2[j].id === res3[k].p_id){
            res2[j].children.push(res3[k])

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

    let params = this.ctx.request.body;
    console.log(params)
    let table_name = 'letou_company_trade' + params.lv;
    let title = params.title;
    if (title) {
      let is_succ = await this.app.mysql.insert(table_name, { title,p_id:params.p_id });

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
    let params = ctx.request.body;
    let id = ctx.request.body.id;
    if (!id) {
      ctx.body = {
        code: 4001,
        msg: '缺少参数id'
      };
      return;
    }

    if(!params.lv){
      ctx.body = {
        code: 4001,
        msg: '缺少参数lv'
      };
      return ;
    }

    let table_name = 'letou_company_trade' + params.lv;
    let is_succ = await this.app.mysql.update(table_name, { id, del: 1 });
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


