const Item = require('../model/Item')

/**
 * 将文档存入数据库中，默认集合名为model的复数形式
 * @param { Object } doc 存入数据库的的一条文档
 */
const addItem = function (doc) {
    const item = new Item(doc)
    item.save()
        .then(() => {
            console.log(`${JSON.stringify(doc)}已存入数据库；`)
        })
        .catch((err) => {
            console.error(err)
        })
}

module.exports = { addItem }
