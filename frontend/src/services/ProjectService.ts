import axios from 'axios';
import { ProjectOption } from '@/types/ProjectOption';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getProjects = async (search = ''): Promise<ProjectOption[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/projects`, { params: { 'name': search } });

    return data.data.map((project: { name: string }) => ({
      value: project.name,
      label: project.name,
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};
