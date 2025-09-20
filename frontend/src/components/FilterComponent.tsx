import React from 'react';
import ProjectSelector from './ProjectSelector';
import { ApartmentFilter } from '@/types/apartmentFilter';
import { ProjectOption } from '@/types/ProjectOption';

interface FilterComponentProps {
  filters: ApartmentFilter;
  onFilterChange: (filters: ApartmentFilter) => void;
  onApplyFilters: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filters, onFilterChange, onApplyFilters }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handleProjectSelect = (selectedOption: ProjectOption | null) => {
    onFilterChange({
      ...filters,
      projectId: selectedOption ? selectedOption.value : '',
    });
  };

  const applyFilters = () => {
    onApplyFilters();
  };

  const resetFilters = () => {
    const resetFilter = { name: '', unitNumber: '', projectId: '' };
    onFilterChange(resetFilter);
  };

  return (
    <div className="space-y-6">
      {/* Apartment Name Input */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Apartment Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Search by apartment name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-700 focus:bg-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Unit Number Input */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Unit Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <input
            type="text"
            name="unitNumber"
            value={filters.unitNumber}
            onChange={handleInputChange}
            placeholder="Unit number..."
            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-700 focus:bg-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Project Selector */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Project
        </label>
        <ProjectSelector
          onProjectSelect={handleProjectSelect}
          selectedProjectId={filters.projectId}
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={applyFilters}
          className="w-full group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Apartments
        </button>

        <button
          onClick={resetFilters}
          className="w-full group bg-gray-700 border border-gray-600 text-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-600 hover:border-gray-500 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default React.memo(FilterComponent);
