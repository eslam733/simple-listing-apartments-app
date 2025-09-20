import { Document, Model } from 'mongoose';
import { IRepository } from './IRepository';

export abstract class BaseRepository<T extends Document> implements IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(query: any = {}): Promise<T[]> {
    return await this.model.find(query);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return await document.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }

  async findOne(query: any): Promise<T | null> {
    return await this.model.findOne(query);
  }

  async count(query: any = {}): Promise<number> {
    return await this.model.countDocuments(query);
  }
}
