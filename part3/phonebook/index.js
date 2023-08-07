const express = require("express");
const morgan = require('morgan')
const cors = require('cors')

const app = express();

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

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
  const cabtidadContactos = persons.length;
  
  response.send(`<p>La agenda tiene información de ${cabtidadContactos} personas</p> <p>${Date()}</p>`)
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

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({ error: "la propiedad name esta vacia" })

  } else if (!person.number) {
    return response.status(400).json({ error: "la propiedad number esta vacia" })

  } else if (persons.some(value => value.name === person.name)) {
    return response.status(400).json({ error: "el name debe ser único" })
  }
  
  const ids = persons.map(person => person.id)
  const maxId = Math.max(...ids)

  const newPerson = {
    id: maxId +1,
    name: person.name,
    number: person.number
  }

  persons = persons.concat(newPerson)

  response.status(201).json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("el sever esta en el puerto ", PORT)
})