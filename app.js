/* file app.js */
const express = require('express');
const app     = express();
const port    = 8000;

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
app.get('/api/:value', (req, res) => 
{
	const re_format_date = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	const value          = re_format_date.test(req.params.value) ? req.params.value : parseInt(req.params.value) ;
	const date_value     = new Date(value);

	res.json({ unix:Math.floor(date_value.getTime() / 1000), utc:date_value });
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});