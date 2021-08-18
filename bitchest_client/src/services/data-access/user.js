// import axios from 'axios';

// Initialization for future requests
// const server = axios.create({
// 	baseURL: '',
// 	timeout: 1000,
// });

export default {
	getUserData() {
		return {
			name: 'Dylan',
			cryptoCurrencies: ['Bitcoin', 'Ethereum', 'Stellar'],
			balance: 3000,
		};
	}
};