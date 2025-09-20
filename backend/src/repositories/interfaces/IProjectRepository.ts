import { IProject } from '../../models/Project';
import { IRepository } from '../base/IRepository';

export interface IProjectRepository extends IRepository<IProject> {
  findByName(name: string): Promise<IProject | null>;
  findByFilters(filters: {
    name?: string;
  }): Promise<IProject[]>;
  findAllNamesOnly(): Promise<{ name: string }[]>;
}
