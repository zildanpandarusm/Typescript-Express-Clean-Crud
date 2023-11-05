import Database from '../database/database';
import { DocInterface } from '../entities/docInterface';
import { ObjectId } from 'mongodb';

export class GroupRepository extends Database {
  constructor() {
    super('group');
  }

  public async create(data: DocInterface) {
    return await this.collection.insertOne(data);
  }

  public async readMany() {
    return await this.collection.find().toArray();
  }

  public async readOne(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async update(id: string, data: DocInterface) {
    return await this.collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: data,
      }
    );
  }

  public async delete(id: string) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
