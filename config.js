const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	token: process.env.BOT_TOKEN,
	dbURI: process.env.DB_URI
}