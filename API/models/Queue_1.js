const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queue_1_Schema = new Schema({
	id_turno: {
		type: String
	},
	fecha: {
		type: Date
	},
	numero_cola: {
		type: Number
	},
	atendido: {
		type: Boolean
	},
	id_cola: {
		type: Number
	}

});
module.exports = mongoose.model("queue_1",queue_1_Schema)