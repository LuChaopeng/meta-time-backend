const Item = require('../model/Item')

/**
 * 将文档存入数据库中，默认集合名为model的复数形式
 * @param { Object } doc 存入数据库的的一条文档
 */
const addItem = async function (doc) {
    doc.uid = global.UID
    delete doc._id
    const item = new Item(doc)
    let newID = undefined
    await item.save()
        .then((res) => {
            newID = res._id
            console.log(`数据库：已存入${JSON.stringify(doc)}`)
        })
        .catch((err) => {
            console.error(err)
        })
    return newID
}

/**
 * 按照给定的ID，删除数据库中对应的文档
 * @param { String } id 文档的 _id
 */
const delItem = async function (id) {
    Item.findOne({_id: id})
        .then((res) => {
            console.log(`数据库：${JSON.stringify(res)}将被删除`)
        })
        .catch((e) => {
            console.error(e)
        })
    Item.deleteOne({_id: id})
        .catch((err) => {
            console.error(err)
        })
}

/**
 * 读数据库，初始化时间轴
 * @returns {Promise<undefined>}
 * async返回一个Promise对象，它return的值会成为该Promise对象then()中回调函数的参数
 */
const initList = async function (UID) {
    let findDoc = undefined
    await Item.find({uid:UID},{__v: 0, uid: 0})
        .then((doc) => {
            findDoc = doc
        })
        .catch(err => {
            console.error(err)
        })
    return findDoc
}

module.exports = { addItem, initList, delItem }
