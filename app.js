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

// &---- Router  ----
app.get('/', (req, res) => {
	res.render('home');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
