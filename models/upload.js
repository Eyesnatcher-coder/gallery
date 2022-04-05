const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Harsh:zsRYZ7qWn1GCjBIv@cluster0.3jb09.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open',function callback(){
    console.log("db connected")
})

var uploadSchema = new mongoose.Schema({
    imagename:String
})

var uploadModel = mongoose.model('image',uploadSchema)

module.exports = uploadModel