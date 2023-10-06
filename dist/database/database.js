"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongodb_1 = require("mongodb");
class Database {
    uri = 'mongodb://127.0.0.1:27017';
    dbName = 'users';
    db;
    client = new mongodb_1.MongoClient(this.uri);
    collection;
    constructor() {
        try {
            this.client.connect();
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection('user');
            console.log('Berhasil terhubung ke MongoDB');
        }
        catch (error) {
            console.error('Gagal terhubung ke MongoDB:', error);
            throw error;
        }
    }
}
exports.default = Database;
exports.db = new Database();
