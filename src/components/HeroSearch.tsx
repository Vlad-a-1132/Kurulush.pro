'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const HeroSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would navigate to the search results page
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Данные о специалистах, которые сейчас показываются в категории
  const specialists = [
    { id: 1, img: '/avatars/avatar-1.jpg', initials: 'ЧБ' },
    { id: 2, img: '/avatars/avatar-2.jpg', initials: 'АА' },
    { id: 3, img: '/avatars/avatar-3.jpg', initials: 'АМ' },
    { id: 4, img: '/avatars/avatar-4.jpg', initials: 'ДК' },
    { id: 5, img: '/avatars/avatar-5.jpg', initials: 'ЖА' },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Для любой задачи есть профи
        </h1>
        
        <p className="text-gray-700 mb-8">
          15724349 клиентов доверили дела профи
        </p>
        
        <div className="w-full mx-auto">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Услуга или специалист"
                className="flex-grow px-6 py-4 rounded-l-lg border border-gray-300 focus:outline-none text-gray-800 bg-gray-50"
              />
              <button
                type="submit"
                className="w-64 py-4 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition flex-shrink-0 font-medium"
              >
                Найти
              </button>
            </div>
          </form>
          
          <Link href="/create-task">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-left mb-4 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Специалисты</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Черновик • Трубы: материал не могу определить. • Демонтировать: расширительный бак. • Площадь: 30 м². • Отопление: центральное.
              </p>
              <div className="flex">
                {specialists.map((specialist, index) => (
                  <div key={specialist.id} className="w-8 h-8 rounded-full bg-gray-200 -ml-2 first:ml-0 border-2 border-white overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-xs font-semibold bg-blue-100 text-blue-600">
                      {specialist.initials}
                    </div>
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-100 -ml-2 border-2 border-white flex items-center justify-center text-xs font-medium">
                  10+
                </div>
              </div>
            </div>
          </Link>
          
          <div className="text-center mb-6">
            <Link 
              href="/job-board" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Доска объявлений
            </Link>
          </div>

          <div className="text-center mt-6 text-gray-800 text-sm">
            <div className="mb-2">Популярные запросы:</div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {['сантехник', 'электрик', 'маникюр', 'парикмахер', 'репетитор английского', 'няня', 'массаж'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-800 hover:bg-gray-100 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;