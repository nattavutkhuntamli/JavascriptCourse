const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri = "mongodb://localhost:27017/crud";
let _db;

const mongoConnect = callback => {
    MongoClient.connect(uri)
    .then(client => {
        console.log("Connected to MongoDB!");
        _db = client.db()
        callback(client);
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
};
module.exports = mongoConnect;
