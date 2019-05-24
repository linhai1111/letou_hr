const jwt = require('../tools/jwt.js');

module.exports = (options, app) => {
    console.log(options);
    return async function (ctx, next) {
        console.log('auth request middleware');
        if (ctx.headers['auth_token']) {
            let user_info;
            try {
                user_info = jwt.decode(ctx.headers['auth_token'])
            } catch (err) {
                console.log('令牌失效')
                console.log(err);
            }
            if (user_info) {
                await next();
            } else {
                ctx.body = {
                    code: 8003,
                    msg: '令牌失效，请重新登录'
                }
            }
        } else {
            ctx.body = {
                code: 8000,
                msg: '请登录'
            }
        }

        // await next();
    };
};
