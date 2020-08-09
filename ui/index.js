(function () {
	function findMyIp() {
		var ipElement = document.querySelector('#ip');
		var loadingElement = document.querySelector('#loading');

		ipElement.innerHTML = '';
		loadingElement.style.display = '';

		ajax.get('/api', function (error, result) {
			loadingElement.style.display = 'none';

			if (error) {
				console.error(error);
				ipElement.innerHTML = 'Unable to find your IP address.';
			} else {
				ipElement.innerHTML = result.body;
			}
		});
	}

	findMyIp();
	document.querySelector('#refresh').addEventListener('click', findMyIp);
})();
