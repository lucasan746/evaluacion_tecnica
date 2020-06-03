const express = require("express");
const router = express.Router();
const queueController = require("../controllers/queueController");
const usersController = require("../controllers/usersController");
const {isAuth} = require("../helpers/auth"); 

module.exports = function() {

	router.get(`/api/nuevo_turno/:id_cola`,queueController.nuevoTurno);
	router.get('/api/atender_proximo', queueController.turnos);
	router.get('/api/lista_turnos', queueController.getTurnos);
	router.post('/signup', usersController.signup);
	router.get('/signin', usersController.renderSignInForm);
	router.post('/signin', usersController.signin);
	router.get('/logout',isAuth, usersController.logout);
	router.get('/', (req,res)=>{
		res.redirect("/signin");
	});
	router.get('/admin',isAuth, usersController.administrador);
	router.post('/delete/:_id', isAuth, usersController.deleteUser);


	return router;
}