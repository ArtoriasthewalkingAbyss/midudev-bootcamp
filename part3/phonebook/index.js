require('dotenv').config()
require("./mongo");

const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const Contact = require("./models/Contact");

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token("body", (req, res) => req.method === "POST" ? JSON.stringify(req.body) : "")


app.use(morgan((tokens, req, res) => 
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms", 
    tokens.body(req, res)
  ].join(" ")
))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response, next) => {
  Contact.find({}).then(result => {
    response.json(result);
  }).catch(err => {
    next(err)
  })
})

app.get("/info", (request, response) => {
  const cantidadContactos = persons.length;
  
  response.send(`<p>La agenda tiene información de ${cantidadContactos} personas</p> <p>${Date()}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response, next) => {
  const {id} = request.params;
  
  Contact.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  }).catch(err => next(err))
})

app.post("/api/persons", (request, response, next) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({ error: "la propiedad name esta vacia" })

  } else if (!person.number) {
    return response.status(400).json({ error: "la propiedad number esta vacia" })

  };
  const newContact = new Contact({
    name: person.name,
    number: person.number
  })
  
  newContact.save().then(result => {
    response.status(201).json(result);
  }).catch(err => next(err))

})

app.use((error, request, response, next) => {
  console.error(error);
  console.log(error.name);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else {
    response.status(500).end();
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("el sever esta en el puerto ", PORT)
})