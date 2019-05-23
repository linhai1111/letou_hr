const jwt = require('../tools/jwt.js');

module.exports = (options,app) => {
  console.log(options);
  return async function(ctx, next) {
    console.log('auth request middleware');
    if(ctx.headers['auth']){
      // 解密auth数据，
      await next();
    }else {

      ctx.body = {
        code:201,
        msg:'请登录'
      }
    }

    // await next();
  };
};
