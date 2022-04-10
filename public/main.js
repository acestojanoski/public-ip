async function getIp() {
	const ipElement = document.querySelector('#ip h1')
	const loadingElement = document.querySelector('#ip .spinner')

	ipElement.classList.add('d-none')
	loadingElement.classList.remove('d-none')

	try {
		const result = await fetch('/api').then((response) => response.text())
		ipElement.innerHTML = result
	} catch (error) {
		console.error('api error', error)
		ipElement.innerHTML = 'Unable to find your IP address.'
	} finally {
		ipElement.classList.remove('d-none')
		loadingElement.classList.add('d-none')
	}
}

getIp()
document.querySelector('#refresh').addEventListener('click', getIp)
