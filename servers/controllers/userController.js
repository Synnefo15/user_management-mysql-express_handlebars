const mysql = require('mysql');
// &---- koneksi POLL----
const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});



// &---- View user ----
exports.view = (req, res) => {

	pool.getConnection((err, connection) => {
		if (err) {
			throw err;
		}
		console.log(`Connected as id ${connection.threadId}`);

        // &---- User Connection ----
        connection.query('SELECT * FROM user WHERE status = "active"', (err,rows) => {
            
            // % saat berhasil 
            connection.release()

            if (!err) {
                res.render('home',{
                    rows
                })
            } else {
                console.log(`Error: ${err} `);
            } 
            console.log(`Data dari user : \n ${rows}`);
            
        })
	});
};

// &---- Find by search----
exports.find = (req,res) => {
    pool.getConnection((err, connection) => {
			if (err) {
				throw err;
			}
			console.log(`Connected as id ${connection.threadId}`);

            let searchTerm = req.body.search
			// &---- User Connection ----
			connection.query(
				'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',
				['%' + searchTerm + '%', '%' + searchTerm + '%'],
				(err, rows) => {
					// % saat berhasil
					connection.release();

					if (!err) {
						res.render('home', {
							rows,
						});
					} else {
						console.log(`Error: ${err} `);
					}
					console.log(`Data dari user : \n ${rows}`);
				}
			);
		});
}

// &---- Form ----
exports.form = (req,res) => {
	res.render('add-user')
}

// &---- Create ----
exports.create = (req,res) => {
	const{first_name, last_name,email,phone,comment} = req.body
	pool.getConnection((err, connection) => {
		if (err) {
			throw err;
		}
		console.log(`Connected as id ${connection.threadId}`);

		// &---- User Connection ----
		connection.query(
			'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?',[first_name, last_name,email,phone,comment],
			(err, rows) => {
				// % saat berhasil
				connection.release();

				if (!err) {
					res.render('add-user',{alert:'User berhasil ditambah'});
				} else {
					console.log(`Error: ${err} `);
				}
				console.log(`Data dari user : \n ${rows}`);
			}
		);
	});
}