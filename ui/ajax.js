function HttpError(statusText, status, responseText) {
	var instance = new Error(statusText);
	instance.name = 'HttpError';
	instance.status = status;
	instance.body = responseText;

	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

	if (Error.captureStackTrace) {
		Error.captureStackTrace(instance, HttpError);
	}

	return instance;
}

HttpError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true,
	},
});

if (Object.setPrototypeOf) {
	Object.setPrototypeOf(HttpError, Error);
} else {
	HttpError.__proto__ = Error;
}

function ajax(options, callback) {
	options = options || {};
	options.headers = options.headers || {};
	options.method = options.method || 'GET';

	var http = new XMLHttpRequest();
	http.open(options.method, options.url, true);

	for (var header in options.headers) {
		if (Object.prototype.hasOwnProperty.call(options.headers, header)) {
			http.setRequestHeader(header, options.headers[header]);
		}
	}

	http.onreadystatechange = function () {
		if (http.readyState === 4) {
			if (http.status >= 400 || !http.status) {
				callback(
					new HttpError(
						http.statusText,
						http.status,
						http.responseText
					)
				);
			} else {
				var response = {
					status: http.status,
					statusText: http.statusText,
					body: http.responseText,
				};

				callback(null, response);
			}
		}
	};

	http.send(options.body);
}

ajax.get = function (url, callback) {
	ajax({url: url, method: 'GET'}, callback);
};
