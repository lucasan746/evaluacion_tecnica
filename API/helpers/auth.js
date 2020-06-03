const helpers = [];

helpers.isAuth = (req,res,next) => {
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/signin");
	}
}

module.exports = helpers;