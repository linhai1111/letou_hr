/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};


  // 安全设置
  config.security = {
    // 关闭了csrf防御  如果开启，则每个post请求 都必须携带 ctx.csrf_token 参数
    csrf: {
      enable: false,
    },

  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '111.231.207.210',
      // 端口号
      port: '3306',
      // 用户名
      user: 'letou',
      // 密码
      password: 'RCaXH63xd8WYeGSR',
      // 数据库名
      database: 'letou',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1558015448377_9203';

  // add your middleware config here
  // 这里添加的中间件为全局中间件 每个请求 都会触发
  config.middleware = [

  ];

  // 设置跨域访问
  config.cors = {
    // 来源设置所有允许 也可针对 对应IP地址 设置允许
    origin: '*',
    // 允许的请求方式
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    allowHeaders: '*'

  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
