'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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

  // Популярные категории строительства и ремонта
  const popularCategories = [
    { name: 'Ремонт', icon: '/image/molotok.png' },
    { name: 'Отделка', icon: '/image/vakil.png' },
    { name: 'Электрика', icon: '/image/lka.png' },
    { name: 'Водопровод', icon: '/image/voda.png' },
    { name: 'Дизайн', icon: '/image/desing.png' },
    { name: 'Крыша', icon: '/image/krusha.png' }
  ];

  return (
    <section className="bg-white py-8 md:py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
          Для любой задачи есть профи
        </h1>
        
        <p className="text-gray-700 mb-8 text-sm md:text-base">
          15724349 клиентов доверили дела профи
        </p>
        
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Услуга или специалист"
                className="flex-grow px-4 py-3 md:py-4 rounded-lg md:rounded-l-lg md:rounded-r-none border border-gray-300 focus:outline-none focus:border-black text-gray-800 bg-white text-sm md:text-base"
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 md:py-4 bg-yandex-yellow text-black rounded-lg md:rounded-l-none md:rounded-r-lg hover:bg-yandex-yellow-hover transition flex-shrink-0 font-medium text-sm md:text-base btn-yellow"
              >
                Найти
              </button>
            </div>
          </form>
          
          {/* Новый блок по строительству и ремонту */}
          <div className="bg-white p-6 mb-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-3 text-center">
              Найди надежных мастеров по строительству и ремонту в Кыргызстане
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link 
                href="/masters?category=construction" 
                className="px-6 py-3 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium text-sm md:text-base btn-yellow"
              >
                Найти мастера
              </Link>
              <Link 
                href="/create-task" 
                className="px-6 py-3 border border-black text-black rounded-md hover:bg-gray-100 transition text-sm md:text-base btn-outline"
              >
                Разместить заказ
              </Link>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-bold text-black mb-4">Популярные категории:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {popularCategories.map((category) => (
                  <Link 
                    key={category.name} 
                    href={`/search?category=${encodeURIComponent(category.name)}`}
                    className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:shadow-md transition text-center"
                  >
                    <div className="w-8 h-8 mx-auto mb-2 relative">
                      <Image 
                        src={category.icon} 
                        alt={category.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <Link href="/create-task">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 text-left mb-4 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base md:text-lg">Специалисты</h3>
                <button className="text-gray-400 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 text-xs md:text-sm mb-4">
                Черновик • Трубы: материал не могу определить. • Демонтировать: расширительный бак. • Площадь: 30 м². • Отопление: центральное.
              </p>
              <div className="flex flex-wrap gap-2">
                {specialists.map((specialist) => (
                  <div key={specialist.id} className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-xs font-semibold bg-gray-100 text-black">
                      {specialist.initials}
                    </div>
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                  10+
                </div>
              </div>
            </div>
          </Link>
          
          <div className="text-center mb-6">
            <Link 
              href="/job-board" 
              className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 border border-black rounded-lg hover:bg-gray-50 transition text-black font-medium text-sm md:text-base btn-outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Доска объявлений
            </Link>
          </div>

          <div className="text-center mt-6">
            <div className="mb-2 text-black text-sm">Популярные запросы:</div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {['сантехник', 'электрик', 'маникюр', 'парикмахер', 'репетитор английского', 'няня', 'массаж'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs md:text-sm text-gray-800 hover:bg-gray-100 transition"
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