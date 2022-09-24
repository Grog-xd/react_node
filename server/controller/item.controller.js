const db = require('../db')

class ItemController{
    async createItem(req, res){
        const {name, quantity, interval} = req.body
        const newItem = await db.query('INSERT INTO item (name, quantity, interval) values ($1, $2, $3) RETURNING *', [name, quantity, interval])

        res.json(newItem.rows[0])
    }

    async getItems(req, res){
        const users = await db.query('SELECT * FROM item')
        res.json(users.rows)
    }

    async deleteItem(req, res){
        const id = req.params.id
        const item = await db.query('DELETE FROM item where id = $1', [id])
        res.json(item.rows[0])
    }
}

module.exports = new ItemController()
