'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Тип для услуг мастера
type Service = {
  name: string;
  price: number;
  unit: string;
};

// Тип для отзывов
type Review = {
  id: number;
  author: string;
  date: string;
  rating: number;
  text: string;
};

// Тип для мастеров
type Master = {
  id: number;
  name: string;
  avatar: string;
  title: string;
  status: 'online' | 'offline';
  isVerified: boolean;
  hasGuarantee: boolean;
  rating: number;
  reviewCount: number;
  qualifications?: string[];
  services?: Service[];
  areas?: string[];
  reviews?: Review[];
};

// Интерфейс для пропсов компонента
interface MastersListProps {
  selectedMasterId?: number;
}

const MastersList: React.FC<MastersListProps> = ({ 
  selectedMasterId 
}) => {
  const router = useRouter();
  const [failedImages, setFailedImages] = useState<number[]>([]);
  const [expandedMaster, setExpandedMaster] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleImageError = (masterId: number) => {
    setFailedImages(prev => [...prev, masterId]);
  };

  const handleChatClick = (masterId: number) => {
    router.push(`/conversations/${masterId}`);
  };

  // Моковые данные мастеров для примера
  const masters: Master[] = [
    {
      id: 1,
      name: 'Бакыт Асанов',
      avatar: '/avatars/avatar-1.jpg',
      title: 'Сантехник',
      status: 'online',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.97,
      reviewCount: 1115,
      qualifications: ['Специалист сдал экзамен по услугам: сантехника, мелкий ремонт, мебель, электрика.'],
      services: [
        { name: 'Устранение засоров', price: 2500, unit: 'усл.' },
        { name: 'Установка смесителя', price: 3500, unit: 'шт.' },
        { name: 'Замена труб', price: 2500, unit: 'м.п.' },
        { name: 'Установка ванны', price: 12000, unit: 'шт.' },
        { name: 'Установка унитаза', price: 4500, unit: 'шт.' },
        { name: 'Замена сифона', price: 2000, unit: 'шт.' },
        { name: 'Монтаж полотенцесушителя', price: 5000, unit: 'шт.' },
        { name: 'Установка душевой кабины', price: 15000, unit: 'шт.' },
        { name: 'Ремонт бачка унитаза', price: 3000, unit: 'усл.' },
        { name: 'Подключение стиральной машины', price: 3500, unit: 'шт.' }
      ],
      areas: ['Балашиха', 'Котельники', 'Реутов', 'БКЛ', 'Бутовская'],
      reviews: [
        { id: 1, author: 'Айбек К.', date: '15.05.2023', rating: 5, text: 'Отличный специалист! Работа выполнена быстро и качественно.' },
        { id: 2, author: 'Мирлан Т.', date: '20.04.2023', rating: 5, text: 'Приехал вовремя, все починил, убрал за собой. Рекомендую!' },
        { id: 3, author: 'Гульназ И.', date: '10.03.2023', rating: 4, text: 'Хороший мастер, но немного опоздал. В целом работой довольна.' }
      ]
    },
    {
      id: 2,
      name: 'Азамат Шералиев',
      avatar: '/avatars/avatar-3.jpg',
      title: 'Электрик',
      status: 'offline',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.9,
      reviewCount: 873,
      qualifications: ['Специалист сдал экзамен по услугам: электромонтажные работы, освещение.'],
      services: [
        { name: 'Замена проводки', price: 3500, unit: 'м.п.' },
        { name: 'Установка розеток', price: 750, unit: 'шт.' },
        { name: 'Монтаж люстры', price: 2000, unit: 'шт.' },
        { name: 'Подключение бытовой техники', price: 1500, unit: 'шт.' },
        { name: 'Поиск и устранение КЗ', price: 3000, unit: 'усл.' },
        { name: 'Установка автоматов защиты', price: 900, unit: 'шт.' },
        { name: 'Установка электросчетчика', price: 5000, unit: 'шт.' },
        { name: 'Монтаж светильников', price: 1800, unit: 'шт.' },
        { name: 'Установка теплого пола', price: 2500, unit: 'м²' },
        { name: 'Монтаж электрощита', price: 7000, unit: 'шт.' }
      ],
      areas: ['Бишкек', 'Центр', 'Джал', 'Аламедин'],
      reviews: [
        { id: 1, author: 'Нурлан О.', date: '25.05.2023', rating: 5, text: 'Азамат - профессионал своего дела. Быстро и качественно заменил проводку.' },
        { id: 2, author: 'Айнура С.', date: '18.04.2023', rating: 5, text: 'Очень аккуратный и вежливый мастер. Сделал всё как просила.' },
        { id: 3, author: 'Данияр М.', date: '05.03.2023', rating: 4, text: 'Работа выполнена хорошо, только материалы дороговаты.' }
      ]
    },
    {
      id: 3,
      name: 'Айбек Токтоболотов',
      avatar: '/avatars/avatar-4.jpg',
      title: 'Мастер отделочных работ',
      status: 'online',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.95,
      reviewCount: 642,
      qualifications: ['Специалист сдал экзамен по услугам: поклейка обоев, покраска, монтаж гипсокартона.'],
      services: [
        { name: 'Поклейка обоев', price: 350, unit: 'м²' },
        { name: 'Шпаклевка стен', price: 400, unit: 'м²' },
        { name: 'Монтаж гипсокартона', price: 850, unit: 'м²' },
        { name: 'Покраска стен', price: 300, unit: 'м²' },
        { name: 'Укладка ламината', price: 450, unit: 'м²' },
        { name: 'Укладка плитки', price: 900, unit: 'м²' },
        { name: 'Штукатурка стен', price: 550, unit: 'м²' },
        { name: 'Установка потолочных плинтусов', price: 350, unit: 'м.п.' },
        { name: 'Монтаж натяжного потолка', price: 800, unit: 'м²' },
        { name: 'Установка межкомнатных дверей', price: 5000, unit: 'шт.' }
      ],
      areas: ['Бишкек', 'Ош', 'Чолпон-Ата'],
      reviews: [
        { id: 1, author: 'Зарина К.', date: '10.06.2023', rating: 5, text: 'Отличный результат! Стены идеально ровные, обои поклеены аккуратно.' },
        { id: 2, author: 'Руслан Д.', date: '22.05.2023', rating: 5, text: 'Делал ремонт в гостиной. Работой очень доволен, рекомендую!' },
        { id: 3, author: 'Жылдыз С.', date: '15.04.2023', rating: 4, text: 'Качественно, но немного дольше по срокам, чем договаривались.' }
      ]
    },
    {
      id: 4,
      name: 'Гулназ Омурбекова',
      avatar: '/avatars/avatar-2.jpg',
      title: 'Репетитор математики',
      status: 'online',
      isVerified: true,
      hasGuarantee: false,
      rating: 5.0,
      reviewCount: 219,
      qualifications: ['Высшее педагогическое образование, 10 лет опыта преподавания.'],
      services: [
        { name: 'Индивидуальные занятия', price: 1200, unit: 'час' },
        { name: 'Подготовка к ОРТ', price: 1500, unit: 'час' },
        { name: 'Групповые занятия', price: 800, unit: 'час/чел.' },
        { name: 'Онлайн консультация', price: 900, unit: 'час' },
        { name: 'Разбор сложных тем', price: 1300, unit: 'час' },
        { name: 'Подготовка к олимпиадам', price: 1700, unit: 'час' },
        { name: 'Помощь с домашними заданиями', price: 1000, unit: 'час' },
        { name: 'Занятия для начальной школы', price: 900, unit: 'час' },
        { name: 'Занятия для средней школы', price: 1100, unit: 'час' },
        { name: 'Подготовка к экзаменам', price: 1600, unit: 'час' }
      ],
      areas: ['Бишкек', 'Онлайн'],
      reviews: [
        { id: 1, author: 'Алтынай Б.', date: '20.06.2023', rating: 5, text: 'Благодаря Гулназ мой сын сдал ОРТ на 234 балла! Очень благодарны!' },
        { id: 2, author: 'Максат К.', date: '15.05.2023', rating: 5, text: 'Замечательный педагог. Объясняет сложные темы простым языком.' },
        { id: 3, author: 'Салтанат М.', date: '28.04.2023', rating: 5, text: 'Занимались подготовкой к олимпиаде. Результат превзошел ожидания!' }
      ]
    },
    {
      id: 5,
      name: 'Эрмек Таалайбеков',
      avatar: '/avatars/avatar-5.jpg',
      title: 'Мастер по ремонту бытовой техники',
      status: 'offline',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.8,
      reviewCount: 429,
      qualifications: ['Сертифицированный специалист по ремонту холодильников, стиральных машин.'],
      services: [
        { name: 'Ремонт холодильников', price: 3500, unit: 'усл.' },
        { name: 'Ремонт стиральных машин', price: 3000, unit: 'усл.' },
        { name: 'Ремонт посудомоечных машин', price: 3500, unit: 'усл.' },
        { name: 'Ремонт микроволновых печей', price: 2000, unit: 'усл.' },
        { name: 'Ремонт электроплит', price: 2500, unit: 'усл.' },
        { name: 'Ремонт духовых шкафов', price: 3000, unit: 'усл.' },
        { name: 'Ремонт кондиционеров', price: 4000, unit: 'усл.' },
        { name: 'Ремонт водонагревателей', price: 3500, unit: 'усл.' },
        { name: 'Ремонт пылесосов', price: 2000, unit: 'усл.' },
        { name: 'Диагностика техники', price: 1000, unit: 'усл.' }
      ],
      areas: ['Бишкек', 'Кара-Балта', 'Токмок'],
      reviews: [
        { id: 1, author: 'Кубат М.', date: '05.06.2023', rating: 5, text: 'Отремонтировал холодильник, который не работал 3 дня. Спас все продукты!' },
        { id: 2, author: 'Айгерим Н.', date: '20.05.2023', rating: 4, text: 'Хороший специалист, но цены немного высокие.' },
        { id: 3, author: 'Бакыт С.', date: '10.04.2023', rating: 5, text: 'Спас мою стиральную машину от утилизации. Теперь как новая!' }
      ]
    }
  ];

  // Категории для фильтрации
  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'repair', name: 'Ремонт и строительство' },
    { id: 'beauty', name: 'Красота и здоровье' },
    { id: 'education', name: 'Образование' },
    { id: 'it', name: 'IT и компьютерная помощь' },
    { id: 'cleaning', name: 'Уборка и помощь по хозяйству' }
  ];

  // Фильтрация мастеров по запросу и категории
  const filteredMasters = masters.filter(master => {
    const matchesSearch = searchQuery === '' || 
      master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      master.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || (
      (selectedCategory === 'repair' && ['Сантехник', 'Электрик', 'Мастер отделочных работ'].includes(master.title)) ||
      (selectedCategory === 'education' && master.title.includes('Репетитор')) ||
      (selectedCategory === 'it' && master.title.includes('IT')) ||
      (selectedCategory === 'beauty' && master.title.includes('Красота')) ||
      (selectedCategory === 'cleaning' && master.title.includes('Уборка'))
    );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Поиск */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по имени или специализации"
              className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          {/* Категории */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Список мастеров */}
        <div className="divide-y divide-gray-200 max-w-4xl mx-auto border-t border-b border-gray-200">
          {filteredMasters.map(master => (
            <div 
              key={master.id}
              className="py-4 px-2"
            >
              <div className="flex items-start">
                {/* Аватар */}
                <div className="flex-shrink-0 mr-4 flex flex-col items-center">
                  <div className="w-14 h-14 relative mb-1">
                    {master.avatar && !failedImages.includes(master.id) ? (
                      <Image 
                        src={master.avatar}
                        alt={master.name} 
                        width={56} 
                        height={56} 
                        className="object-cover rounded-full"
                        onError={() => handleImageError(master.id)}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg text-gray-500 bg-gray-100 border border-gray-200">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className={`text-center text-xs ${master.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                    {master.status === 'online' ? 'Онлайн' : 'Офлайн'}
                  </div>
                </div>
                
                {/* Основная информация */}
                <div className="flex-1">
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-gray-900">{master.name}</h3>
                    <p className="text-sm text-gray-600">{master.title}</p>
                    
                    {/* Проверка документов и гарантии */}
                    <div className="flex items-center gap-4 mt-1">
                      {master.isVerified && (
                        <div className="flex items-center text-gray-600 text-xs">
                          <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Паспорт проверен
                        </div>
                      )}
                      {master.hasGuarantee && (
                        <div className="flex items-center text-gray-600 text-xs">
                          <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Гарантия
                        </div>
                      )}
                    </div>
                    
                    {/* Квалификация */}
                    {master.qualifications && master.qualifications.length > 0 && (
                      <div className="mt-1">
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-green-600">Квалификация подтверждена</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-700">
                          {master.qualifications[0]}
                        </div>
                      </div>
                    )}
                    
                    {/* Услуги мастера */}
                    {master.services && master.services.length > 0 && (
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2">
                          {master.services.slice(0, 3).map((service, index) => (
                            <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              <span className="text-gray-900">{service.name}</span>
                              <span className="text-gray-600"> · от {service.price} сом</span>
                            </div>
                          ))}
                          {master.services.length > 3 && (
                            <button
                              onClick={() => setExpandedMaster(expandedMaster === master.id ? null : master.id)}
                              className="text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
                            >
                              +{master.services.length - 3}
                            </button>
                          )}
                        </div>
                        {expandedMaster === master.id && (
                          <div className="mt-2 grid grid-cols-1 gap-1">
                            {master.services.map((service, index) => (
                              <div key={index} className="flex justify-between text-xs">
                                <span className="text-gray-700">{service.name}</span>
                                <span className="text-gray-900 font-medium">{service.price} сом/{service.unit}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Выезд к клиенту */}
                    {master.areas && master.areas.length > 0 && (
                      <div className="mt-2 text-xs">
                        <div className="text-gray-800">Выезд к клиенту</div>
                        <div className="text-gray-600">{master.areas.join(', ')}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Правая колонка с рейтингом и кнопками */}
                <div className="ml-4 flex flex-col items-end space-y-4">
                  {/* Рейтинг */}
                  <div className="flex items-center">
                    <span className="text-amber-400 font-bold mr-1">{master.rating}</span>
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-xs text-gray-600 ml-1">{master.reviewCount} отзывов</span>
                  </div>
                  
                  {/* Кнопки */}
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      href={`/masters/${master.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Смотреть профиль
                    </Link>
                    <button
                      onClick={() => handleChatClick(master.id)}
                      className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Написать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredMasters.length === 0 && (
            <div className="text-center py-8 bg-gray-50">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Специалисты не найдены</h3>
              <p className="text-gray-700 text-sm">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MastersList; 