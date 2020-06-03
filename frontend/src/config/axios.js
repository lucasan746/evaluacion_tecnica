import axios from 'axios';
const clienteAxios = axios.create({
	baseURL: 'http://api.weatherstack.com/current'
});

export default clienteAxios;