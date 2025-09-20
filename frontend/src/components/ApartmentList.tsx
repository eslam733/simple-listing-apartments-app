import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Apartment } from '@/types/apartment';

interface ApartmentListProps {
  apartments: Apartment[];
}

const ApartmentList: React.FC<ApartmentListProps> = ({ apartments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {apartments.length > 0 ? (
        apartments.map((apartment) => (
          <Link key={apartment._id} href={`/apartment/${apartment._id}`}>
            <div className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer">
              {/* Apartment Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src="/images/apartment.webp"
                  layout="fill"
                  objectFit="cover"
                  alt="Apartment"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  ${apartment.price.toLocaleString()}
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Unit Number */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-200">
                    {apartment.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Unit #{apartment.number}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-3 text-gray-300">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">{apartment.location}</span>
                </div>

                {/* Project */}
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm text-gray-300">
                    Project: <span className="font-semibold text-purple-400">{apartment.project.name}</span>
                  </span>
                </div>

                {/* View Details Button */}
                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center justify-between text-purple-400 group-hover:text-pink-400 transition-colors duration-200">
                    <span className="font-semibold">View Details</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center py-16">
          <div className="w-24 h-24 bg-gray-800/50 border border-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No apartments found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your filters to see more results</p>
          <Link href="/apartment/create">
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Add First Apartment
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default React.memo(ApartmentList);
