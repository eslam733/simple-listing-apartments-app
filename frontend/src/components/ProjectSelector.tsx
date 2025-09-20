import React from 'react';
import AsyncSelect from 'react-select/async';
import { ProjectOption } from '@/types/ProjectOption';
import { getProjects } from '@/services/ProjectService';

interface ProjectSelectorProps {
  onProjectSelect: (selectedProject: ProjectOption | null) => void;
  selectedProjectId?: string;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onProjectSelect, selectedProjectId }) => {
  const loadOptions = async (inputValue: string): Promise<ProjectOption[]> => {
    return await getProjects(inputValue);
  };

  const fetchSelectedProject = async (projectId?: string): Promise<ProjectOption | null> => {
    if (!projectId) return null;
    const projects = await getProjects('');
    const selectedProject = projects.find(project => project.value === projectId);
    return selectedProject || null;
  };

  const [selectedProject, setSelectedProject] = React.useState<ProjectOption | null>(null);

  React.useEffect(() => {
    const setSelected = async () => {
      const project = await fetchSelectedProject(selectedProjectId);
      setSelectedProject(project);
    };
    setSelected();
  }, [selectedProjectId]);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4b5563' : '#374151',
      borderColor: state.isFocused ? '#a855f7' : '#4b5563',
      borderRadius: '12px',
      borderWidth: '1px',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(168, 85, 247, 0.5)' : 'none',
      minHeight: '48px',
      paddingLeft: '8px',
      paddingRight: '8px',
      transition: 'all 0.2s',
      '&:hover': {
        borderColor: state.isFocused ? '#a855f7' : '#6b7280',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: '14px',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#ffffff',
      fontSize: '14px',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#ffffff',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#374151',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      border: '1px solid #4b5563',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#a855f7'
        : state.isFocused
        ? '#4b5563'
        : '#374151',
      color: state.isSelected ? 'white' : '#ffffff',
      padding: '12px 16px',
      fontSize: '14px',
      '&:active': {
        backgroundColor: state.isSelected ? '#a855f7' : '#6b7280',
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#9ca3af',
      '&:hover': {
        color: '#d1d5db',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={(option) => {
          setSelectedProject(option);
          onProjectSelect(option);
        }}
        placeholder="Select project..."
        defaultOptions
        value={selectedProject}
        className="w-full"
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default ProjectSelector;
