const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
const fetch = require('node-fetch')

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = proces.env.API_KEY
let formInput = []

app.post('/api', async function(req, res)) {
    formInput = req.body.url;
    const apiCall = `${baseURL}key=${apiKey}&url=${formInput}&lang=en`

    const response = await fetch(apiCall)
    const data = await response.json()
    res.send(data)
}

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
