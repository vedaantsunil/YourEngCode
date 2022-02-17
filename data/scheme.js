const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const YourEngSchema = new Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    dob: Date




})

module.exports = mongoose.model('YourEngSchema',YourEngSchema)

