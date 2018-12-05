const express = require ('express');
const app = express ();
const HTTP_PORT = 8080;

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
