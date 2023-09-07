const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      minLength: 8,
      validate: {
        validator: function(v) {
          return /\d{2}-\d{6}/.test(v);
        },
        message: props => `${props.value} no es un numero valido detener este tipo de formato 00-000000`
      },
      required: true
    }
  })
  
  contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const Contact = model("Contact", contactSchema);

  module.exports = Contact;