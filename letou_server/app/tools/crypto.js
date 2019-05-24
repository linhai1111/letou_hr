let crypto = require('crypto');



module.exports = {
    md5(str){
        // 创建一个hash对象
        const md5 = crypto.createHash('md5');
        // 往hash对象中添加摘要内容
        md5.update(str);

        return md5.digest('hex')
    }
}