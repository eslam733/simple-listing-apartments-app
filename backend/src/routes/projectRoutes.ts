import express from 'express';
import { ProjectController } from '../controllers/project.controller';

const router = express.Router();

// Get all projects
router.get('/', ProjectController.getAllProjects);

export default router;