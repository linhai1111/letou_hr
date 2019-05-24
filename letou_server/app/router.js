'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 加载 账号验证 中间件
  const auth = app.middleware.auth({ msg: 'auth中间件配置对象' });

  /* =======================后台管理部分========================= */
  // 登陆
  router.post('/api/v1/admin/login', controller.admin.login.login);

  // 修改密码
  router.post('/api/v1/admin/change_password', auth, controller.admin.login.change_password);

  // 测试token
  router.post('/api/v1/admin/test', auth, controller.admin.login.test);

  // 获取用户信息
  router.get('/api/v1/admin/get_user_info', auth, controller.admin.login.get_user_info);

  // 企业性质列表
  router.get('/api/v1/admin/get_property_list', controller.admin.property.get_list);

  // 添加企业性质
  router.post('/api/v1/admin/add_property',auth, controller.admin.property.add);

  // 删除企业性质
  router.del('/api/v1/admin/del_property',auth, controller.admin.property.del);

  // 企业规模列表
  router.get('/api/v1/admin/get_scale_list', controller.admin.scale.get_list);

  // 添加企业规模
  router.post('/api/v1/admin/add_scale',auth, controller.admin.scale.add);

  // 删除企业规模
  router.del('/api/v1/admin/del_scale',auth, controller.admin.scale.del);

  // 行业分类
  router.get('/api/v1/admin/get_trade_list', controller.admin.trade.get_list);

  // 添加行业分类
  router.post('/api/v1/admin/add_trade',auth, controller.admin.trade.add);

  // 删除行业分类
  router.del('/api/v1/admin/del_trade',auth, controller.admin.trade.del);


  /* =======================公共部分========================= */
  // 获取七牛云上传图片凭证
  router.get('/api/v1/common/upload_token', controller.common.upload_token);
};

