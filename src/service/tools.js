import axios from 'axios';

class NetworkError extends Error {
	constructor(code, message) {
		const fullMessage = message ? `${code}: ${message}` : code;
		super(fullMessage);
		this.name = code;
		this.code = code;
		this.message = fullMessage;
	}

	toString() {
		return this.message;
	}
}

export const noneAuthInstance = axios.create({
	// Bypass CORS
	timeout: 30000,
});

export const noneAuthGet = async (url, params) => {
	try {
		return await noneAuthInstance.get(url, params);
	} catch (error) {
		throw new NetworkError(
			error.response?.status,
			error.response?.data?.message ?? error.message
		);
	}
};
