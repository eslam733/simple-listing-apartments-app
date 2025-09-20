import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';
import { ErrorResponse } from '../utils/errorHandler';
import { SuccessResponse } from '../utils/successResponse';

export class ProjectController {
  // Get all projects
  static async getAllProjects(req: Request, res: Response) {
    try {
      const filters = {
        name: req.query.name as string,
      };

      const projects = await ProjectService.getAllProjects(filters);
      SuccessResponse.ok(res, projects, 'Projects retrieved successfully');
    } catch (error) {
      ErrorResponse.handle(error, res);
    }
  }
}