const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')

const app = express()

const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())

const logger = (request, response, next) => {
  console.log('Method:',request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(logger)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/', function (req, res) {
  res.send('hello, world!')
})

const error = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}


//express()
//  .use(express.static(path.join(__dirname, 'public')))
//  .set('views', path.join(__dirname, 'views'))
//  .set('view engine', 'ejs')
//  .get('/', (req, res) => res.render('pages/index'))
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
