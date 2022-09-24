const Router = require('express')

const router = new Router()
const itemController = require('../controller/item.controller')

router.get('/item', itemController.getItems)
router.post('/item', itemController.createItem)
router.delete('/item/:id', itemController.deleteItem)

module.exports = router

