import { Document } from 'mongoose';

export interface IRepository<T extends Document> {
  findAll(query?: any): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  findOne(query: any): Promise<T | null>;
  count(query?: any): Promise<number>;
}
