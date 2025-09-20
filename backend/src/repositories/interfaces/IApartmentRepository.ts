import { IApartment } from '../../models/Apartment';
import { IRepository } from '../base/IRepository';

export interface IApartmentRepository extends IRepository<IApartment> {
  findByNumber(number: number): Promise<IApartment | null>;
  findByFilters(filters: {
    name?: string;
    number?: number;
    project?: string;
  }): Promise<IApartment[]>;
}
