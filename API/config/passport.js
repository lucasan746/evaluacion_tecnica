const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new localStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, async (username,password,done) => {
	const user = await User.findOne({username});
	if (!user) {
		return done(null,false, {message: 'El usuario no existe'});
	} else {
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			return done(null,user);
		} else {
			return done(null,false,{message: 'Contraseña incorrecta'});
		}
	}
}));

passport.serializeUser((user,done) => {
	done(null,user.id);
});

passport.deserializeUser((id,done) => {
	User.findById(id,(err,user)=>{
		done(err,user);
	})
});