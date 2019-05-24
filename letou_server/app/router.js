'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 加载 账号验证 中间件
  const auth = app.middleware.auth({ msg: 'auth中间件配置对象' });

  // 后台管理部分
  // 登陆
  router.post('/api/v1/admin/login', controller.adminlogin.login);
  // 修改密码
  router.post('/api/v1/admin/change_password', auth, controller.adminlogin.change_password);
  // 获取用户信息
  router.get('/api/v1/admin/get_user_info', auth, controller.adminlogin.get_user_info);

  router.post('/api/v1/admin/test', auth, controller.adminlogin.test);

  // 公共部分
  // 获取七牛云上传图片凭证
  router.get('/api/v1/common/upload_token', controller.common.upload_token);
};

