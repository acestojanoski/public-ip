module.exports = async (request, response) => {
	response.setHeader(
		'access-control-allow-origin',
		process.env.ACCESS_ALLOW_ORIGIN || '*'
	);

	response.setHeader('content-type', 'text/plain');

	const xForwardedFor =
		request.headers['X-Forwarded-For'] ||
		request.headers['x-forwarded-for'] ||
		'';

	const ip = xForwardedFor.split(',')[0];

	if (!ip) {
		response.statusCode = 404;
		return response.end('Not found.');
	}

	response.end(ip);
};
