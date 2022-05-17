const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// &---- Parsing Middleware ----
app.use(bodyParser.urlencoded({ extended: false }));

// &---- Parse app/json ----
app.use(bodyParser.json());

// &---- Buat naruh aset2 ----
app.use(express.static('public'));

// &---- Templating engine. Handlebars ----
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// &---- koneksi POLL----
const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

// &---- konek db ----
pool.getConnection((err,connection) => {
	if (err) {
		throw err
	}
	console.log(`Connected as id ${connection.threadId}`);
})

// &---- Routes ----
const routes = require('./servers/routes/user');
app.use('/', routes)


app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
