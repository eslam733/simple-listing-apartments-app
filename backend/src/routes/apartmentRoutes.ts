import express from 'express';
import { ApartmentController } from '../controllers/apartment.controller';
import { validateApartment } from "../middlewares/apartmentValidator";

const router = express.Router();

// Get all apartments
router.get('/', ApartmentController.getAllApartments);

// Get apartment details
router.get('/:id', ApartmentController.getApartmentById);

// Add new apartment
router.post('/', validateApartment, ApartmentController.createApartment);

export default router;