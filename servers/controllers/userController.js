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
