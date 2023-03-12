// Task1: initiate app and run server at 3000

const path=require('path');
const express = require("express")
const BodyParser = require("body-parser")
const Cors = require("cors")
const Mongoose = require("mongoose") 
const {employeeModel} = require("./model/employee")

const app = express()

app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

app.use(Cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended : true}))


// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://tashisreekantand:tashi8563@cluster0.6ulfxv7.mongodb.net/employeeDB?retryWrites=true&w=majority", {useNewUrlParser: true})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async(req, res) => {
    let data = await employeeModel.find()
    res.json(data)
})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.post('/api/employeelist/:id', async(req, res) => {
    let data = await employeeModel.find(req.body)
    res.json(data)
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',(req, res) => {
    var data = new employeeModel(req.body)
    data.save()
    res.json({status: "success"})
})



//TODO: delete a employee data from db by using api '/api/employeelist/:id'

 app.delete('/api/employeelist/:id', async(req, res) =>{
    let data = await employeeModel.deleteOne(req.body)
    res.json(data)
 })




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.patch('/api/employeelist', async(req, res) =>{
    let data = await employeeModel.findOneAndUpdate({"_id": req.body._id}, req.body)
    res.json(data)
})


app.listen(3000, () => {
    console.log('Server is running');
});
//! dont delete this code. it connects the front end file.
 app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

