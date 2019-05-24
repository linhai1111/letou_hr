const jwt = require("jsonwebtoken");
// 加密盐
const pass_str = "rb3q19gh0o1ijlyk";

module.exports = {
    // 加密
    encode(data){
        return  jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60*60*24,
            data
        },pass_str)
    },
    // 解密
    decode(data){
        return jwt.verify(data,pass_str);
    }
}