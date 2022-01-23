const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.js')

require('dotenv').config()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('sup bro')
})

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))