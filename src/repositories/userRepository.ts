import { db } from '../database/database';
import { DocInterface } from '../entities/docInterface';
import { ObjectId } from 'mongodb';

export class UserRepository {
  public async create(data: DocInterface) {
    return await db.collection.insertOne(data);
  }

  public async readMany() {
    return await db.collection.find().toArray();
  }

  public async readOne(id: string) {
    return await db.collection.findOne({ _id: new ObjectId(id) });
  }

  public async update(id: string, data: DocInterface) {
    return await db.collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: data,
      }
    );
  }

  public async delete(id: string) {
    return await db.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
