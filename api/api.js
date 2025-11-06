const api = async (url, customOptions = {}) => {
	const defaultRequestOptions = {
		method: 'POST',
		credentials: 'include',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
	};

	try {
		let error = null;
		let responseBody = null;

		const response = await fetch(url, {
			...defaultRequestOptions,
			...customOptions,
		});

		if (response.ok) {
			responseBody = await response.json();

			if (responseBody.status !== 0) {
			// TODO: log to bugsnag
				error = new Error(responseBody.message);
			}
		} else {
			// TODO: log to bugsnag
			error = new Error();
		}


		return {
			responseBody,
			headers: response.headers,
			error
		};
	} catch (error) {
		console.log('error', error);
		// TODO: log to bugsnag
		return error;
	}
};


export default api;

