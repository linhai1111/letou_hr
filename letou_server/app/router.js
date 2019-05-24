'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 加载 账号验证 中间件
  const auth = app.middleware.auth({ msg: 'auth中间件配置对象' });

  // 后台管理部分
  router.post('/api/v1/admin/login', controller.adminlogin.login);
  router.post('/api/v1/admin/test', auth, controller.adminlogin.test);


};
