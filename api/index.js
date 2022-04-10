import microHandlers from 'micro-handlers'

/** @type {import('@vercel/node').VercelApiHandler} */
async function getIp(req, res) {
	res.setHeader('cache-control', 'public, max-age=0, must-revalidate')

	const xForwardedFor = req.headers['x-forwarded-for'] || ''
	const ip = xForwardedFor.split(',')[0]

	if (!ip) {
		res.statusCode = 404
		return res.end('Not Found', 'utf-8')
	}

	res.end(ip, 'utf-8')
}

export default microHandlers({
	GET: getIp,
})
