'use client';

import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { Master } from '@/types';

interface MasterCardProps {
  master: Master;
}

const MasterCard = ({ master }: MasterCardProps) => {
  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yandex-yellow' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    );
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="p-5">
        <div className="flex items-start">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4 flex-shrink-0">
            <SafeImage
              src={master.avatar}
              alt={master.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              fallbackText={getInitials(master.name)}
            />
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <h3 className="font-bold text-lg mr-2">{master.name}</h3>
              {master.isVerified && (
                <svg className="w-5 h-5 text-yandex-yellow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              )}
              <span className={`ml-2 inline-block w-2 h-2 rounded-full ${master.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            
            <div className="text-gray-700 text-sm mb-1">{master.title}</div>
            
            <div className="flex items-center mb-2">
              {renderStars(master.rating)}
              <span className="ml-1 text-sm text-gray-700">{master.rating}</span>
              <span className="ml-2 text-sm text-gray-600">({master.reviewCount} отзывов)</span>
            </div>
            
            {master.qualifications && (
              <div className="flex flex-wrap gap-1 mb-3">
                {master.qualifications.slice(0, 2).map((qualification, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-black rounded-full">
                    {qualification}
                  </span>
                ))}
                {master.qualifications.length > 2 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-black rounded-full">
                    +{master.qualifications.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {master.services && master.services.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-sm mb-2">Примеры услуг:</h4>
            <ul className="space-y-1 text-sm">
              {master.services.slice(0, 2).map((service) => (
                <li key={service.id} className="flex justify-between">
                  <span>{service.name}</span>
                  <span className="font-semibold">{service.price} сом/{service.unit}</span>
                </li>
              ))}
              {master.services.length > 2 && (
                <li className="text-xs text-gray-600">и еще {master.services.length - 2} услуг</li>
              )}
            </ul>
          </div>
        )}
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link 
            href={`/masters/${master.id}`}
            className="px-4 py-2 text-center bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium text-sm btn-yellow"
          >
            Профиль
          </Link>
          <Link 
            href={`/chat?master=${master.id}`}
            className="px-4 py-2 text-center border border-black text-black rounded-md hover:bg-gray-100 transition text-sm btn-outline"
          >
            Написать
          </Link>
          <Link 
            href={`/propose-task/${master.id}`}
            className="col-span-2 px-4 py-2 text-center border border-yandex-yellow text-black rounded-md hover:bg-yandex-yellow hover:bg-opacity-10 transition text-sm"
          >
            Предложить задание
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MasterCard; 