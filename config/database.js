const Mongoose = require('mongoose');

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "RunnersSV";

const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}`;

const connect = async () => {
    try {
        await Mongoose.connect(dburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("DB connection successful");
    } catch (error) {
        console.log("Error in DB connection");
        process.exit(1);
    }
}

module.exports = {
    connect
};