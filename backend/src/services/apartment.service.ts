import { ErrorResponse } from '../utils/errorHandler';
import { ApartmentRepository } from '../repositories/ApartmentRepository';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { IApartmentRepository } from '../repositories/interfaces/IApartmentRepository';
import { IProjectRepository } from '../repositories/interfaces/IProjectRepository';

export class ApartmentService {
  private static apartmentRepository: IApartmentRepository = new ApartmentRepository();
  private static projectRepository: IProjectRepository = new ProjectRepository();

  // Get all apartments
  static async getAllApartments(filters: { name?: string; number?: number; project?: string }) {
    try {
      return await this.apartmentRepository.findByFilters(filters);
    } catch (error) {
      throw new ErrorResponse(500, 'Error fetching apartments');
    }
  }

  // Get apartment by ID
  static async getApartmentById(id: string) {
    try {
      const apartment = await this.apartmentRepository.findById(id);
      if (!apartment) throw new ErrorResponse(404, 'Apartment not found');

      return apartment;
    } catch (error) {
      console.error('Error fetching apartment:', error);
      throw new ErrorResponse(500, 'Error fetching apartment');
    }
  }

  // Create new apartment
  static async createApartment(apartmentData: any) {
    try {
      const {number, name, description, price, location } = apartmentData;
      const randomProject = await this.getRandomProject();

      const apartmentToCreate = {
        number,
        name,
        description,
        price,
        location,
        project: {
          _id: randomProject._id,
          name: randomProject.name,
        },
      };
  
      return await this.apartmentRepository.create(apartmentToCreate as any);
    } catch (error: any) {
      throw new ErrorResponse(500, error.message);
    }
  }

  // Function to get a random project to simplify the apartment creation process.
  private static async getRandomProject() {
    const projects = await this.projectRepository.findAll();
    if (projects.length === 0) {
      throw new ErrorResponse(404, 'No projects found. Please add projects first.');
    }
    
    return projects[Math.floor(Math.random() * projects.length)];
  }
}