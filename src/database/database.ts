import { Collection, Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export default class Database {
  private uri: string = process.env.DATABASE_URI || '';
  private dbName: string = process.env.DATABASE_NAME || '';
  public db!: Db;
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(this.uri);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection('user');
      console.log('Berhasil terhubung ke MongoDB');
    } catch (error) {
      console.error('Gagal terhubung ke MongoDB:', error);
      throw error;
    }
  }

  async closeConnection(): Promise<void> {
    await this.client.close();
    console.log('Koneksi ke MongoDB ditutup');
  }

  // Menambahkan properti collection agar tidak ada error pada kode lain yang menggunakannya
  public collection!: Collection;
}

// Membuat instance database
export const db = new Database();

// Connect ke MongoDB saat aplikasi dimulai
db.connect();
