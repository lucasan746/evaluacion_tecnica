const User = require("../models/User");
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.signup = async (req,res) => {
	const {username,password} = req.body;
	let errors = 0;

	if (password.length == 0) {
		errors ++;
	}
	if (username.length == 0) {
		errors ++;
	}
	if (errors != 0 ) {
		res.redirect('/admin');
	} else {
		const findUsername = await User.findOne({username: username})
		if (findUsername) {
			res.redirect('/signup');
		} else {
			const newUser = new User({
				username: username,
				password: password
			});

			const salt = await bcrypt.genSalt(10);
			newUser.password = await bcrypt.hash(newUser.password,salt);

			try{
				await newUser.save();
				res.redirect('/admin');
			} catch {

			}
		}
	}
};

exports.renderSignInForm = async (req,res) => {
	const findUsername = await User.findOne({username: "root"})
	if (findUsername) {
		res.render('users/signin');
	} else {
		const newUser = new User({
				username: "root",
				password: "root"
			});

			const salt = await bcrypt.genSalt(10);
			newUser.password = await bcrypt.hash(newUser.password,salt);

			try{
				await newUser.save();
				res.redirect('/admin');
			} catch {

			}
	}
	
};

exports.signin = passport.authenticate('local',{
	failureRedirect: '/signin',
	successRedirect: '/admin',
	failureFlash: true
});

exports.logout = (req,res) => {
	req.logout();
	res.redirect("/");
};

exports.administrador = async (req,res) => {
	const usuarios = await User.find({});
	res.render("users/administrador", {usuarios});
}
exports.deleteUser = async (req,res) => {
	await User.deleteOne({
		_id: req.params._id
	});
	res.redirect('/admin');
}

