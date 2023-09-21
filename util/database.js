const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://nattavutkhuntamli:1234@cluster0.hrnrkpj.mongodb.net/';
let _db;

const mongoConnect = callback => {
    MongoClient.connect(url, { useUnifiedTopology: true  })
    .then(client => {
        console.log('Connected to the database successfully!');
        _db = client.db('shop');
        callback();
    })
    .catch(err => {
        console.error(err);
    });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

module.exports = {
    mongoConnect: mongoConnect,
    getDb: getDb
};
