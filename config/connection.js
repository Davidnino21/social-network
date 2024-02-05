const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGO_URI || "mongodb://localhost:27017/social_networkdb"

connect(connectionString)
.then(() => console.log('db connected'))
.catch((error) => console.log(error)) 

module.exports = connection;

