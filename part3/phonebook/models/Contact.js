const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    name: String,
    number: String,
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

/*if (env.length === 3) {
  Contact.find({}).then(result => {
    console.log("phonebook:");
    
    result.forEach((value) => {
      return console.log(value.name, value.number);
    })

    mongoose.connection.close()
  })
} else if (env.length === 5) {
  const contact = new Contact({
    name: env[3],
    number: env[4],
  })
  
  contact.save().then(result => {
    console.log(`added ${result.name} ${result.number} to phonebook`);
    mongoose.connection.close()
  })
}*/