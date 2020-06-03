const Queue_1 = require('../models/queue_1');
const Queue_2 = require('../models/queue_2');
const io = require('socket.io-client');


exports.turnos = async (req,res,next) => {

	sinAtender = [];

	try {
		let turnos = await Queue_1.find({});
		turnos.forEach(function(turnos) {
			if (turnos.atendido == false) {
				sinAtender.push(turnos)
			}
		});
		turnos = await  Queue_2.find({});
		turnos.forEach(function(turnos) {
			if (turnos.atendido == false) {
				sinAtender.push(turnos)
			}
		});

		sinAtender.sort()
		
		if (sinAtender.length === 0) {
			res.json({error: "404 Not found"})
		} else {
			if (sinAtender[0].id_cola == 1) {
				await Queue_1.findByIdAndUpdate(
					{_id: sinAtender[0]._id},
					{atendido: true}
					);
			} else {
				await Queue_2.findByIdAndUpdate(
					{_id: sinAtender[0]._id},
					{atendido: true}
					);	
			}
		res.json(sinAtender[0]);
		}
	} catch {
		console.log(error);
		next();
	}

	const socket = io("http://localhost:4000");

	this.getTurnos().then(function(result){
		socket.emit("message", result);
	})



	
}

exports.nuevoTurno = async (req,res,next) => {
	

	if (req.params.id_cola == 1) {
		const turno = new Queue_1({
		id_turno: Math.floor(Math.random() * (1000 - 100 + 100)),
		fecha: Date(),
		atendido: false,
		id_cola: req.params.id_cola
		});
		try {
			await turno.save();
			res.json("Numero del turno: "+turno.id_turno);
		} catch (error) {
			console.log(error);
			next();
		}
	}else if (req.params.id_cola == 2) {
		const turno = new Queue_2({
		id_turno: Math.floor(Math.random() * (1000 - 100 + 100)),
		fecha: Date(),
		atendido: false,
		id_cola: req.params.id_cola
		});
		try {
			await turno.save();
			res.json("Numero del turno: "+turno.id_turno);
		} catch (error) {
			console.log(error);
			next();
		}
	} else {
		res.send({ error: '404 Not found' });
    	return;
	}


const socket = io("http://localhost:4000");
this.getTurnos().then(function(result){
		socket.emit("message", result);
	})


}

exports.getTurnos = async (req,res,next) => {
	 listaTurnos = [];
	try {
		let turnos = await Queue_1.find({});
		turnos.forEach(function(turnos) {
		listaTurnos.push(turnos)
		});
		turnos = await  Queue_2.find({});
		turnos.forEach(function(turnos) {
		listaTurnos.push(turnos)
		});
	} catch {
		console.log(error);
		next();
	}

	return listaTurnos;
}
