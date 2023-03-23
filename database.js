let mongoose = require('mongoose');
require('dotenv').config();  // use .env file

const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USERNAME;

class Database {

    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
        .connect(`mongodb+srv://${username}:${password}@notesapp.ueyd2ls.mongodb.net/NotesApp?retryWrites=true&w=majority`)
        .then(() => {
            console.log('Database connection successful');
        })
        .catch((err) => {
            console.error('Database connection error');
        });
    }
}

module.exports = new Database();