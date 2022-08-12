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
app.get('/api/:date?', (req, res) => 
{
	const week_list      = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const month_list     = [0, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const re_format_date = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	const value      = re_format_date.test(req.params.date) ? req.params.date : parseInt(req.params.date) ;
	const date_value = new Date(value);

	const utc_day   = week_list[date_value.getDay()];
	const utc_date  = [date_value.getDate(), month_list[date_value.getMonth()], date_value.getYear()].join(' ');
	const utc_time  = [('0' + date_value.getHours()).substr(-2), ('0' + date_value.getMinutes()).substr(-2), ('0' + date_value.getSeconds()).substr(-2)].join(':');
	const utc_value = utc_day + ", " + utc_date + " " + utc_time + " GT";

	res.json({ unix:Math.floor(date_value.getTime() / 1000), utc:utc_value });
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});