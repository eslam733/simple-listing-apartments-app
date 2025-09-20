import mongoose from 'mongoose';
import dotenv from "dotenv";
import Project from '../models/Project';
import Apartment from '../models/Apartment';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/apartments';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if projects exist
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('🚀 Seeding projects...');

      const projects = await Project.insertMany([
        { name: 'Marina Bay Towers' },
        { name: 'Golden Gate Residences' },
        { name: 'Central Park Apartments' },
        { name: 'Sunset Boulevard Complex' },
        { name: 'Ocean View Estates' },
      ]);

      console.log('✅ Projects inserted');
      
      // Get inserted project IDs & names
      const projectMap = projects.reduce((acc, project) => {
        acc[project.name] = project; // Map project name to full project object
        return acc;
      }, {} as Record<string, any>);

      console.log('🚀 Seeding apartments...');
      
      await Apartment.insertMany([
        {
          number: 101,
          name: 'Executive Penthouse',
          description: 'Luxurious penthouse with panoramic city views and premium amenities.',
          price: 4500,
          location: 'Manhattan, NY',
          project: {
            _id: projectMap['Marina Bay Towers']._id,
            name: projectMap['Marina Bay Towers'].name,
          },
        },
        {
          number: 205,
          name: 'Golden Gate Studio',
          description: 'Modern studio apartment with bay views and smart home features.',
          price: 3200,
          location: 'San Francisco, CA',
          project: {
            _id: projectMap['Golden Gate Residences']._id,
            name: projectMap['Golden Gate Residences'].name,
          },
        },
        {
          number: 312,
          name: 'Central Park View',
          description: 'Elegant 2-bedroom apartment overlooking Central Park.',
          price: 5800,
          location: 'Upper East Side, NY',
          project: {
            _id: projectMap['Central Park Apartments']._id,
            name: projectMap['Central Park Apartments'].name,
          },
        },
        {
          number: 418,
          name: 'Sunset Terrace',
          description: 'Spacious apartment with private terrace and Hollywood Hills views.',
          price: 3800,
          location: 'West Hollywood, CA',
          project: {
            _id: projectMap['Sunset Boulevard Complex']._id,
            name: projectMap['Sunset Boulevard Complex'].name,
          },
        },
        {
          number: 521,
          name: 'Ocean Breeze Loft',
          description: 'Contemporary loft with floor-to-ceiling windows and ocean views.',
          price: 4200,
          location: 'Malibu, CA',
          project: {
            _id: projectMap['Ocean View Estates']._id,
            name: projectMap['Ocean View Estates'].name,
          },
        },
        {
          number: 108,
          name: 'Harbor View Suite',
          description: 'Waterfront apartment with marina access and luxury finishes.',
          price: 3600,
          location: 'Marina District, SF',
          project: {
            _id: projectMap['Marina Bay Towers']._id,
            name: projectMap['Marina Bay Towers'].name,
          },
        },
        {
          number: 627,
          name: 'Garden Oasis',
          description: 'Ground floor apartment with private garden and modern kitchen.',
          price: 2900,
          location: 'Brooklyn, NY',
          project: {
            _id: projectMap['Central Park Apartments']._id,
            name: projectMap['Central Park Apartments'].name,
          },
        },
        {
          number: 733,
          name: 'Skyline Sanctuary',
          description: 'High-floor apartment with 360-degree city views and rooftop access.',
          price: 4800,
          location: 'Beverly Hills, CA',
          project: {
            _id: projectMap['Sunset Boulevard Complex']._id,
            name: projectMap['Sunset Boulevard Complex'].name,
          },
        },
      ]);

      console.log('✅ Apartments inserted');
    } else {
      console.log('✅ Database already seeded, skipping...');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
