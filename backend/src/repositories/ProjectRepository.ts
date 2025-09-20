import { BaseRepository } from './base/BaseRepository';
import { IProject } from '../models/Project';
import ProjectModel from '../models/Project';
import { IProjectRepository } from './interfaces/IProjectRepository';

export class ProjectRepository extends BaseRepository<IProject> implements IProjectRepository {
  constructor() {
    super(ProjectModel);
  }

  async findByName(name: string): Promise<IProject | null> {
    return await this.model.findOne({ name });
  }

  async findByFilters(filters: {
    name?: string;
  }): Promise<IProject[]> {
    const query: any = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }

    return await this.model.find(query);
  }

  async findAllNamesOnly(): Promise<{ name: string }[]> {
    return await this.model.find({}).select({ "name": 1, "_id": 0 });
  }
}
