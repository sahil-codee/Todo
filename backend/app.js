const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/tryDB');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static("public"));

app.use(cors());

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
//TODO

const todoSchema = mongoose.Schema({
	title: String
});

const Todo = mongoose.model("Todo", todoSchema);


app.get("/todo/data", function(req, res){
	Todo.find({}, function(err, foundList){
		if(!err) {
			res.send(foundList)
		}
	})
})


app.post("/todo", (req, res) => {

	const data = req.body.title;

	const todo = new Todo({
		title: data
	})
	todo.save();
	res.json(todo);
});

app.delete('/:id', (req, res, next) => {
    Todo.findByIdAndDelete({_id: ObjectId (req.params.id)})
      .then(data => res.json(data))
      .catch(next)
  })

app.listen(5000, function() {
  console.log("Server started on port 5000");
});