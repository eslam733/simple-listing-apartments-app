import { Request, Response } from 'express';
import { ApartmentService } from '../services/apartment.service';
import { ErrorResponse } from '../utils/errorHandler';
import { SuccessResponse } from '../utils/successResponse';

export class ApartmentController {
  // Get all apartments
  static async getAllApartments(req: Request, res: Response) {
    try {
      const filters = {
        name: req.query.name as string,
        number: req.query.number ? Number(req.query.number) : undefined,
        project: req.query.project as string,
      };

      const apartments = await ApartmentService.getAllApartments(filters);
      SuccessResponse.ok(res, apartments, 'Apartments retrieved successfully');
    } catch (error) {
      ErrorResponse.handle(error, res);
    }
  }

  // Get apartment by ID
  static async getApartmentById(req: Request, res: Response) {
    try {
      const apartment = await ApartmentService.getApartmentById(req.params.id);
      SuccessResponse.ok(res, apartment, 'Apartment retrieved successfully');
    } catch (error) {
      ErrorResponse.handle(error, res);
    }
  }

  // Create new apartment
  static async createApartment(req: Request, res: Response) {
    try {
      const newApartment = await ApartmentService.createApartment(req.body);
      SuccessResponse.created(res, newApartment, 'Apartment created successfully');
    } catch (error) {
      ErrorResponse.handle(error, res);
    }
  }
}