"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../database/database");
const mongodb_1 = require("mongodb");
class UserRepository {
    async create(data) {
        return await database_1.db.collection.insertOne(data);
    }
    async readMany() {
        return await database_1.db.collection.find().toArray();
    }
    async readOne(id) {
        return await database_1.db.collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
    async update(id, data) {
        return await database_1.db.collection.updateOne({
            _id: new mongodb_1.ObjectId(id),
        }, {
            $set: data,
        });
    }
    async delete(id) {
        return await database_1.db.collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    }
}
exports.UserRepository = UserRepository;
