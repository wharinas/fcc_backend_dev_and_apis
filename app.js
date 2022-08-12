/* file app.js */
const express = require('express');
const app     = express();
const port    = 3000;

// CONFIG:
app.use('/public', express.static(__dirname + '/public'));
const view = (res, path) => {
	path = __dirname + path;
	res.sendFile(path);
};
// ROUTE:
app.get('/', (req, res) => {
	return (view(res, '/views/index.html'));
});
app.get('/api/:date_input?', (req, res) => 
{
	const date_value  = (/\d{5,}/).test(req.params.date_input)?parseInt(req.params.date_input):req.params.date_input;
	const date_object = new Date(date_value);
	let result        = [];

	if (date_object == "Invalid Date")
		result = { error:date_object };
	else
		result = { unix:date_object.valueOf(), utc:date_object.toUTCString() };
	res.json(result);
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});