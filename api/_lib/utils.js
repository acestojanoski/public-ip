/**
 * @typedef SendOptions
 * @property {number} statusCode
 * @property {string} errorCode
 * @property {boolean} acceptsJSON
 */

/**
 * @param {import('@vercel/node').VercelResponse} res
 * @param {string} message
 * @param {SendOptions} param0
 */
export function send(
	res,
	message,
	{ statusCode = 200, errorCode, acceptsJSON } = {},
) {
	res.statusCode = statusCode
	res.setHeader('content-type', acceptsJSON ? 'application/json' : 'text/plain')

	let result = message
	if (acceptsJSON && statusCode >= 400) {
		result = JSON.stringify({
			errorCode: errorCode || message.toLowerCase().replace(/\s/g, '_'),
			message,
		})
	}

	res.end(result, 'utf-8')
}
