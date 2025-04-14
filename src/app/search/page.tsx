'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const specialty = searchParams.get('specialty') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  // Эмуляция загрузки данных с сервера
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Мок-данные результатов поиска
      const mockResults = [
        {
          id: 1,
          name: 'Чынгыз Базарбаев',
          specialty: 'Сантехник',
          rating: 4.8,
          reviews: 56,
          price: 'от 1000 сом',
          avatar: '/avatars/avatar-1.jpg',
          location: 'Бишкек',
          description: 'Опытный сантехник. Установка и ремонт сантехнического оборудования. Быстро и качественно.',
          tags: ['установка', 'ремонт', 'сантехника']
        },
        {
          id: 2,
          name: 'Айгуль Алиева',
          specialty: 'Мастер маникюра',
          rating: 4.9,
          reviews: 124,
          price: 'от 800 сом',
          avatar: '/avatars/avatar-2.jpg',
          location: 'Бишкек',
          description: 'Профессиональный мастер маникюра и педикюра. Работаю с качественными материалами.',
          tags: ['маникюр', 'педикюр', 'дизайн ногтей']
        },
        {
          id: 3,
          name: 'Айдана Мамбетова',
          specialty: 'Дизайнер',
          rating: 4.7,
          reviews: 38,
          price: 'от 2000 сом',
          avatar: '/avatars/avatar-3.jpg',
          location: 'Удаленно',
          description: 'Разработка логотипов, фирменного стиля, полиграфии и веб-дизайна. Опыт более 5 лет.',
          tags: ['логотипы', 'фирменный стиль', 'веб-дизайн']
        },
        {
          id: 4,
          name: 'Данияр Касымов',
          specialty: 'Репетитор английского',
          rating: 5.0,
          reviews: 72,
          price: 'от 600 сом/час',
          avatar: '/avatars/avatar-4.jpg',
          location: 'Бишкек, онлайн',
          description: 'Преподаю английский язык для всех уровней. Индивидуальный подход к каждому ученику.',
          tags: ['английский', 'репетитор', 'онлайн']
        },
        {
          id: 5,
          name: 'Болот Дуйшеев',
          specialty: 'Сборщик мебели',
          rating: 4.6,
          reviews: 29,
          price: 'от 1500 сом',
          avatar: '/avatars/avatar-6.jpg',
          location: 'Бишкек',
          description: 'Профессиональная сборка мебели любой сложности. Опыт работы более 7 лет.',
          tags: ['сборка мебели', 'ремонт мебели']
        }
      ];
      
      // Фильтрация результатов по запросу
      const filteredResults = mockResults.filter(result => {
        if (specialty) {
          return result.specialty.toLowerCase() === specialty.toLowerCase() ||
                 result.tags.some(tag => tag.toLowerCase() === specialty.toLowerCase());
        } else if (query) {
          return result.name.toLowerCase().includes(query.toLowerCase()) ||
                 result.specialty.toLowerCase().includes(query.toLowerCase()) ||
                 result.description.toLowerCase().includes(query.toLowerCase()) ||
                 result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        }
        return true;
      });
      
      setResults(filteredResults);
      setIsLoading(false);
    };
    
    fetchResults();
  }, [query, specialty]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Вернуться на главную
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">
        {specialty ? `Результаты поиска: ${specialty}` : 
         query ? `Результаты поиска: ${query}` : 
         'Все специалисты'}
      </h1>
      
      <p className="text-gray-700 mb-8">
        {isLoading ? 'Поиск специалистов...' : 
         `Найдено ${results.length} специалистов`}
      </p>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((specialist) => (
            <div key={specialist.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center font-bold text-lg text-blue-600 bg-blue-100">
                      {specialist.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{specialist.name}</h2>
                    <p className="text-blue-600">{specialist.specialty}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-2">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="text-gray-800 text-sm">{specialist.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm">{specialist.reviews} отзывов</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{specialist.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {specialist.tags.map((tag: string, index: number) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">{specialist.location}</div>
                    <div className="font-semibold">{specialist.price}</div>
                  </div>
                  <Link 
                    href={`/specialist/${specialist.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Специалисты не найдены</h2>
          <p className="text-gray-600 mb-4">
            По вашему запросу не найдено ни одного специалиста. Попробуйте изменить параметры поиска или создать задачу.
          </p>
          <Link
            href="/create-task"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
          >
            + Разместить задачу
          </Link>
        </div>
      )}
    </div>
  );
} 