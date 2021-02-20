require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":"+ process.env.DB_PASS + "@cluster0.mrhy4.mongodb.net/easybankDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	country: String
});

const User = mongoose.model('User', userSchema);

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/about-us", function(req, res) {
	res.render("about");
});

app.get("/contact", function(req, res) {
	res.render("contact");
});

app.get("/blog", function(req, res) {
	res.render("blog");
});

app.get("/careers", function(req, res) {
	res.render("careers");
});

app.get("/support", function(req, res) {
	res.render("support");
});

app.get("/privacy-policy", function(req, res) {
	res.render("privacy-policy");
});

app.get("/request", function(req, res) {
	res.render("request-invite");
});

app.post("/request", function(req, res) {
	const firstName = req.body.firstname;
	const lastName = req.body.lastname;
	const email = req.body.email;
	const country = req.body.country;

	const user = new User({
		firstname: firstName,
		lastname: lastName,
		email: email,
		country: country,
	});

	User.findOne({ firstname: firstName, lastname: lastName, email: email, country: country }, function(err, foundUser) {
		if (err) {
			console.log(err);
		} else {
			if (!foundUser) {
				const message = "Congratulations you've successfully requested an invitation from easybank. Please check your inbox.";
				user.save();
				res.render("success", {message: message});
			} else {
				const message = `Hello ${firstName}, you've already requested an invitation.`;
				res.render("success", {message: message});
			}
		}
	});

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(req, res) {
	console.log(`Server started on port ${port}`);
});