const User = require('../model/User')

/**
 * 判断传入的用户名密码是否匹配
 * @param loginInfo {Object} 用户信息{uid:xxx, pwd:xxx}
 * @returns {Promise<boolean>} 若用户名密码匹配，返回true，否则false
 */
const loginConfirmed = async (loginInfo) => {
    let confirmResult = false
    await User.findOne({uid:loginInfo.uid})
        .then((res)=>{
        if (res && res.pwd === loginInfo.pwd) {
            confirmResult = true
        }
    })
    return confirmResult
}

/**
 * 用户访问控制 通过cookie
 * @param uidInCookies
 * @returns {Promise<undefined>} 核验通过则返回用户uid，否则返回undefined
 */
const usrAC = async (uidInCookies) => {
    let uid = undefined
    // 只要"uid"这一项，但是"_id"总是默认返回，所以再把"_id"去掉
    await User.find({}, {'uid': 1, '_id': 0})
        .then( (res) => {
            for (let e of res) {
                if (e.uid === uidInCookies) {
                    uid = e.uid
                    console.log(`访问控制：允许来自${e.uid}的请求`)
                    break
                }
            }
        })
    return uid
}
module.exports = { loginConfirmed, usrAC }
