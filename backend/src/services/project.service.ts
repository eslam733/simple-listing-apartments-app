import { ErrorResponse } from '../utils/errorHandler';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { IProjectRepository } from '../repositories/interfaces/IProjectRepository';

export class ProjectService {
  private static projectRepository: IProjectRepository = new ProjectRepository();

  // Get all projects
  static async getAllProjects(filters: { name?: string; }) {
    try {
      return await this.projectRepository.findByFilters(filters);
    } catch (error) {
      throw new ErrorResponse(500, 'Error fetching projects');
    }
  }
}