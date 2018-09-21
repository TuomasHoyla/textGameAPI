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

let persons = {
  "persons": [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]
}

app.use(logger)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.get('/api/persons', (req, res) => {
  res.json(persons.persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.persons.find(person => person.id === id)

  if ( person ) {
    response.json(person.number)
  } else {
    response.status(404).end()
  }
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
