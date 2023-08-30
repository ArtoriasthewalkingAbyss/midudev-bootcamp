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

app.get("/api/persons", (request, response, next) => {
  Contact.find({}).then(result => {
    response.json(result);
  }).catch(err => {
    next(err)
  })
})

app.get("/info", (request, response) => {
  Contact.find({}).then(result => {
    const cantidadContactos = result.length;
    
    response.send(`<p>La agenda tiene información de ${cantidadContactos} contactos</p> <p>${Date()}</p>`)
  })
  
})

app.get("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;

  Contact.findById(id).then(result => {
    console.log(result)
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  }).catch(err => next(err))
  
})

app.delete("/api/persons/:id", (request, response, next) => {
  const {id} = request.params;
  
  Contact.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  }).catch(err => next(err))
})

app.post("/api/persons", (request, response, next) => {
  const contact = request.body

  if (!contact.name) {
    return response.status(400).json({ error: "la propiedad name esta vacia" })

  } else if (!contact.number) {
    return response.status(400).json({ error: "la propiedad number esta vacia" })

  };
  const newContact = new Contact({
    name: contact.name,
    number: contact.number
  })
  
  newContact.save().then(result => {
    response.status(201).json(result);
  }).catch(err => next(err))

})

app.put("/api/persons/:id", (request, response, next) => {
  const {id} = request.params;
  const contact = request.body

  const newContactInfo = {
    name: contact.name,
    number: contact.number
  }

  Contact.findByIdAndUpdate(id, newContactInfo, {new: true})
    .then(result => {
      response.status(202).json(result);
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