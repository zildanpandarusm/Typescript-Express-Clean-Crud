import Database from '../database/database';
import { DocInterface } from '../entities/docInterface';
import { ObjectId } from 'mongodb';

export class AttendanceRepository extends Database {
  constructor() {
    super('attendance');
  }

  public async create(data: DocInterface) {
    return await this.collection.insertOne(data);
  }

  public async readMany(idUser: string) {
    return await this.collection.find({ id_user: idUser }).toArray();
  }

  public async readOne(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async delete(id: string) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
