import { BaseRepository } from './base/BaseRepository';
import { IApartment } from '../models/Apartment';
import ApartmentModel from '../models/Apartment';
import { IApartmentRepository } from './interfaces/IApartmentRepository';

export class ApartmentRepository extends BaseRepository<IApartment> implements IApartmentRepository {
  constructor() {
    super(ApartmentModel);
  }

  async findByNumber(number: number): Promise<IApartment | null> {
    return await this.model.findOne({ number });
  }

  async findByFilters(filters: {
    name?: string;
    number?: number;
    project?: string;
  }): Promise<IApartment[]> {
    const query: any = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }

    if (filters.number) {
      query.number = filters.number;
    }

    if (filters.project) {
      query['project.name'] = { $regex: filters.project, $options: 'i' };
    }

    return await this.model.find(query);
  }
}
