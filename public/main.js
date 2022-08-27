async function getIp() {
	return fetch('/api').then((response) => response.text())
}

async function execute() {
	const ipElement = document.querySelector('#ip h1')
	const loadingElement = document.querySelector('#ip .spinner')

	if (!ipElement || !loadingElement) {
		return
	}

	ipElement.classList.add('d-none')
	loadingElement.classList.remove('d-none')

	try {
		const ip = await getIp()
		ipElement.innerHTML = ip
	} catch (error) {
		console.error('api error', error)
		ipElement.innerHTML = 'Unable to find your IP address.'
	} finally {
		ipElement.classList.remove('d-none')
		loadingElement.classList.add('d-none')
	}
}

execute()
document.querySelector('#refresh').addEventListener('click', execute)
