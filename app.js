const express = require ('express');
const app = express ();
const DEFAULT_HTTP_PORT = 8080;

const HTTP_PORT = getPortFromEnv () || getPortFromArgs () || DEFAULT_HTTP_PORT;

function getPortFromEnv () {
	return toNumber (process.env.HTTP_PORT);
}

function getPortFromArgs () {
	for (let i = 0; i < process.argv.length; i++) {
		if (isNumeric (process.argv[i])) return parseInt (process.argv[i]);
	}
}

function toNumber (str, defaultValue) {
	if (!str || str.length === 0) return defaultValue;
	if (!isNumeric (str)) return defaultValue;
	return parseInt (str);
}

function isNumeric (n) {
	var sn = '' + n, c0 = '0'.charCodeAt (0), c9 = '9'.charCodeAt (0);
	for (var i = 0; i < sn.length; i++) {
		var c = sn.charCodeAt (i);
		if (c < c0 || c > c9) return false;
	}
	return true;
}



app.get (/^(.*)$/, (req, res) => {
	console.log ('Request ' + req.url);
	if (req.url.indexOf ('/', 2) > 0) {
		console.log ('    -> 404');
		res.status (404).send ('<html><body>404 not found</body></html>');
		return;
	}
	var lines = [];
	for (var k = 0; k < req.rawHeaders.length; k += 2) {
		var line = '    ' + req.rawHeaders[k] + ': ' + req.rawHeaders[k+1].substr (0, 140) + (req.rawHeaders[k+1].length > 140 ? ' ...' : '');
		console.log (line);
		lines.push (line);
	}
	res.send ('<html><body><h1>Page</h1>' + req.url + '<br /><pre>' + lines.join ('\n') + '</pre></body></html>');
});

app.listen (HTTP_PORT, () => {
	console.log ('Listening on port ' + HTTP_PORT + '...');
});
