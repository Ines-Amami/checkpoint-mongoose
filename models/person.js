const mongoose = require('mongoose')
const personSchema= new mongoose.Schema({
name:  { type: String, uppercase: true, trim: true, required: true },
age: Number,
favoriteFoods:[String],

})
module.exports = Person = mongoose.model('person', personSchema)