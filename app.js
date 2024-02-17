const express = require('express')
const app = express()
const port = 3003
const ejs = require('ejs')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/singleplay', (req, res) => {
    res.render('singleplay')
})

app.listen(port, () => {
    console.log('The server is running..')
})