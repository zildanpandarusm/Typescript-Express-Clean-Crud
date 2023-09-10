import { Collection, Db, MongoClient } from 'mongodb';

export default class Database {
  private uri: string = 'mongodb://127.0.0.1:27017';
  private dbName: string = 'users';
  public db!: Db;
  private client: MongoClient = new MongoClient(this.uri);
  public collection!: Collection;

  constructor() {
    try {
      this.client.connect();
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection('user');
      console.log('Berhasil terhubung ke MongoDB');
    } catch (error) {
      console.error('Gagal terhubung ke MongoDB:', error);
      throw error;
    }
  }
}

export const db = new Database();
