import Database from '../database/database';
import { DocInterface } from '../entities/docInterface';
import { ObjectId } from 'mongodb';

export class LocationRepository extends Database {
  constructor() {
    super('location');
  }

  public async create(data: DocInterface) {
    return await this.collection.insertOne(data);
  }

  public async readMany(id: string) {
    return await this.collection.find({ id_user: id }).toArray();
  }

  public async readOne(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async getLocationByName(name: string) {
    return await this.collection.findOne({ name: name });
  }

  public async delete(id: string) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
