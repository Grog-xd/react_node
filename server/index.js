const express = require('express')

const cors = require('cors')

const itemRouter = require('./routes/item.routes')

const PORT = process.env.PORT || 3030

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', itemRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
