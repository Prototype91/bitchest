import axios from 'axios';

// Initialization for future requests
const server = axios.create({
	baseURL: 'http://127.0.0.1:8000/api',
	timeout: 1000,
});

export default {
	getUserData(email, password) {
		server
			.post("/login", {
				email,
				password
			})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.error(error.message);
			});
	}
};