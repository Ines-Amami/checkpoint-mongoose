
const express = require('express')
const Person = require('../models/person')

const router = express.Router()

//Create and Save a Record of a Model
router.post("/add",async(req,res)=>{
    try {
        const newPerson=new Person({...req.body})
        await newPerson.save()
        res.send({msg:"person added succcesfully"})
    } catch (error) {
      console.log(error)  
    }
 
})
//Create Many Records with model.create()
router.post("/addpeople",async(req,res)=>{
    try {
        await Person.create(req.body);
        res.send({msg:"people succcesfully"})
    } catch (error) {
      console.log(error)  
    }
 
})
//Use model.find() to Search Your Database
router.get("/find",async(req,res)=>{
    try {
        const findname = await Person.find({ name: req.body.name });
        res.send(findname);
    } catch (error) {
      console.log(error)  
    }
 
})
//Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/findOne",async(req,res)=>{
    try {
        const findOne = await Person.findOne({ favoriteFoods: req.body.favoriteFoods});
        res.send(findOne);
    } catch (error) {
      console.log(error)
    }
 
})
//Use model.findById() to Search Your Database By _id
router.get("/:id",async(req,res)=>{
    try {
        const IdPerson = await Person.findById({ _id: req.params.id });
        res.send(IdPerson);
    } catch (error) {
      console.log(error)  
    }
 
})
//Perform Classic Updates by Running Find, Edit, then Save
router.post("/:id",async(req,res)=>{
    try {
        await Person.updateMany(
            { _id: req.params.id },
            { $push: { favoriteFoods: 'hamburger' } }
          ).exec();
          res.send({ msg: "hamburger added" });
    } catch (error) {
      console.log(error)  
    }
 
})
//Perform New Updates on a Document Using model.findOneAndUpdate()
router.get("/",async(req,res)=>{
    try {
        const updatePerson = await Person.findOneAndUpdate(
            { name: req.body.name },
            { $set: { age: 20 } },
            { new: true }
          );
          res.send(updatePerson);
    } catch (error) {
      console.log(error)  
    }
 
})
//Delete One Document Using model.findByIdAndRemove
router.delete("/:id",async(req,res)=>{
    try {
        await Person.findByIdAndRemove({ _id: req.params.id });
          res.send({ msg: "successfully deleted" });
    } catch (error) {
      console.log(error)  
    }
 
})
//MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/",async(req,res)=>{
    try {
await Person.remove({ name: req.body.name });
    res.send({ msg: "successfully removed" });
} catch (error) {
    console.log(error)  
  }

})
//Chain Search Query Helpers to Narrow Search Results
router.get("/search",async(req,res)=>{
    try {
        const Search = await Person.find({name: req.query.name})
        .sort({ name: 1 })// -1 for descending
        .limit(2)
        .select({age:0})
        .exec(function(err, data){
            if (err) { done(err)}
            else { done(null, data)}})
          res.send(Search);
} catch (error) {
    console.log(error)  
  }

})
module.exports=router