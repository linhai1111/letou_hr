'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/v1/admin/login', controller.adminlogin.login);
  router.post('/api/v1/admin/test', controller.adminlogin.test);
};
