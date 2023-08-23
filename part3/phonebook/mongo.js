const mongoose = require("mongoose")

const env = process.argv;

if (env.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = env[2];

const connectionString = `mongodb+srv://agustincastrodev:${password}@midu-bootcamp.gridh1z.mongodb.net/phobebook-api?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
    .then(() => {
        console.log("Database connected")
    }).catch(err => {
        console.error(err);
    });

    
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model("Contact", contactSchema)

if (env.length === 3) {
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
}