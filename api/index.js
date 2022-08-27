import microHandlers from 'micro-handlers'
import { send } from './_lib/utils'

/** @type {import('@vercel/node').VercelApiHandler} */
async function getIpHandler(req, res) {
	res.setHeader('cache-control', 'public, max-age=0, must-revalidate')

	const { url, headers } = req

	const xForwardedFor = headers['x-forwarded-for'] || ''
	const ip = xForwardedFor.split(',')[0]

	const acceptsJSON =
		headers['accept'] === 'application/json' || url.split('.').pop() === 'json'

	/** @type {import('./_lib/utils').SendOptions} */
	const sendOptions = {
		acceptsJSON,
	}

	if (!ip) {
		options.statusCode = 404
		return send(res, 'Not Found', sendOptions)
	}

	send(res, acceptsJSON ? JSON.stringify({ ip }) : ip, sendOptions)
}

export default microHandlers({
	GET: getIpHandler,
})
