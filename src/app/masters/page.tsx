'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Типы для мастеров
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
  experience: string;
  education: string;
  portfolio: {
    id: number;
    image: string;
    title: string;
    description: string;
  }[];
  services: {
    id: number;
    name: string;
    price: number;
    unit: string;
  }[];
};

export default function MastersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Моковые данные мастеров для примера
  const masters: Master[] = [
    {
      id: 1,
      name: 'Базарбаев Чынгыз',
      avatar: '/avatars/avatar-1.jpg',
      title: 'Сантехник',
      status: 'online',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.8,
      reviewCount: 56,
      experience: '5 лет опыта работы сантехником',
      education: 'Профессиональное образование в области сантехнических работ',
      portfolio: [
        {
          id: 1,
          image: '/portfolio/plumber1.jpg',
          title: 'Установка раковины',
          description: 'Установка и подключение современной раковины в ванной комнате'
        },
        {
          id: 2,
          image: '/portfolio/plumber2.jpg',
          title: 'Ремонт смесителя',
          description: 'Замена неисправного смесителя на кухне'
        },
        {
          id: 3,
          image: '/portfolio/plumber3.jpg',
          title: 'Монтаж канализации',
          description: 'Полная замена канализационной системы в квартире'
        }
      ],
      services: [
        { id: 1, name: 'Установка смесителя', price: 1500, unit: 'шт.' },
        { id: 2, name: 'Замена труб', price: 3500, unit: 'м.п.' },
        { id: 3, name: 'Устранение течи', price: 1200, unit: 'точка' },
        { id: 4, name: 'Монтаж радиатора отопления', price: 5000, unit: 'шт.' }
      ]
    },
    {
      id: 2,
      name: 'Алымбеков Аскар',
      avatar: '/avatars/avatar-3.jpg',
      title: 'Электрик',
      status: 'offline',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.9,
      reviewCount: 73,
      experience: '8 лет опыта работы электриком',
      education: 'Высшее техническое образование, специализация - электротехника',
      portfolio: [
        {
          id: 1,
          image: '/portfolio/electrician1.jpg',
          title: 'Замена проводки',
          description: 'Полная замена электропроводки в трехкомнатной квартире'
        },
        {
          id: 2,
          image: '/portfolio/electrician2.jpg',
          title: 'Установка люстры',
          description: 'Монтаж и подключение сложной люстры с пультом управления'
        },
        {
          id: 3,
          image: '/portfolio/electrician3.jpg',
          title: 'Ремонт розеток',
          description: 'Установка новых розеток и выключателей'
        }
      ],
      services: [
        { id: 1, name: 'Замена электропроводки', price: 2500, unit: 'м.п.' },
        { id: 2, name: 'Установка розеток/выключателей', price: 500, unit: 'шт.' },
        { id: 3, name: 'Монтаж освещения', price: 1500, unit: 'точка' },
        { id: 4, name: 'Диагностика электросети', price: 2000, unit: 'услуга' }
      ]
    },
    {
      id: 3,
      name: 'Жанат Тентимишов',
      avatar: '/avatars/avatar-4.jpg',
      title: 'Репетитор по английскому',
      status: 'online',
      isVerified: true,
      hasGuarantee: false,
      rating: 5.0,
      reviewCount: 42,
      experience: '10 лет преподавания английского языка',
      education: 'Магистр лингвистики, сертификаты TEFL и IELTS 8.5',
      portfolio: [
        {
          id: 1,
          image: '/portfolio/teacher1.jpg',
          title: 'Подготовка к IELTS',
          description: 'Студент сдал IELTS на 7.5 после 3 месяцев занятий'
        },
        {
          id: 2,
          image: '/portfolio/teacher2.jpg',
          title: 'Разговорный английский',
          description: 'Групповые занятия по разговорному английскому'
        },
        {
          id: 3,
          image: '/portfolio/teacher3.jpg',
          title: 'Бизнес-английский',
          description: 'Курс делового английского для сотрудников компании'
        }
      ],
      services: [
        { id: 1, name: 'Индивидуальные занятия', price: 1200, unit: 'час' },
        { id: 2, name: 'Групповые занятия (до 3 человек)', price: 800, unit: 'час/чел.' },
        { id: 3, name: 'Подготовка к IELTS/TOEFL', price: 1500, unit: 'час' },
        { id: 4, name: 'Разговорный клуб', price: 500, unit: 'занятие' }
      ]
    }
  ];

  // Список категорий для фильтрации
  const categories = [
    { id: 'all', name: 'Все специальности' },
    { id: 'repair', name: 'Ремонт и строительство' },
    { id: 'beauty', name: 'Красота и здоровье' },
    { id: 'education', name: 'Образование' },
    { id: 'it', name: 'IT и компьютерная помощь' },
    { id: 'cleaning', name: 'Уборка и помощь по дому' }
  ];

  // Фильтрация мастеров по поиску и категории
  const filteredMasters = masters.filter(master => {
    const matchesSearch = searchQuery === '' || 
      master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      master.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || (
      (selectedCategory === 'repair' && ['Сантехник', 'Электрик'].includes(master.title)) ||
      (selectedCategory === 'education' && master.title.includes('Репетитор'))
    );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Мастера и специалисты</h1>
      <p className="text-gray-700 mb-8">Найдите опытных профессионалов для решения ваших задач</p>
      
      {/* Поиск и фильтры */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по имени или специализации"
              className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 lg:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Список мастеров */}
      <div className="space-y-8">
        {filteredMasters.length > 0 ? (
          filteredMasters.map(master => (
            <div key={master.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Основная информация о мастере */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Аватар и статус */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="relative">
                      <div className="w-32 h-32 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold text-blue-600">
                        {master.avatar ? (
                          <Image 
                            src={master.avatar} 
                            alt={master.name} 
                            width={128} 
                            height={128} 
                            className="object-cover"
                          />
                        ) : (
                          master.name.charAt(0)
                        )}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${master.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="mt-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${master.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {master.status === 'online' ? 'Онлайн' : 'Офлайн'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Данные о мастере */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{master.name}</h2>
                      {master.isVerified && (
                        <div className="flex items-center text-blue-700 bg-blue-50 px-2 py-1 rounded-md text-xs">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                          </svg>
                          Паспорт проверен
                        </div>
                      )}
                      {master.hasGuarantee && (
                        <div className="flex items-center text-green-700 bg-green-50 px-2 py-1 rounded-md text-xs">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Гарантия на работу
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-800 text-lg mb-4">{master.title}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-4">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg 
                            key={star}
                            className={`w-5 h-5 ${star <= Math.floor(master.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-900">{master.rating}</span>
                      </div>
                      <span className="text-gray-700">{master.reviewCount} отзывов</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Опыт работы</h3>
                        <p className="text-gray-700">{master.experience}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Образование</h3>
                        <p className="text-gray-700">{master.education}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link 
                        href={`/master/${master.id}`}
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      >
                        Подробнее о мастере
                      </Link>
                      <Link 
                        href={`/create-task?specialist=${master.id}`}
                        className="inline-block ml-4 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                      >
                        Предложить задание
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Портфолио */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Портфолио и выполненные работы</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {master.portfolio.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200 relative">
                        <div className="h-full w-full flex items-center justify-center text-gray-500">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        {/* В реальном приложении здесь будет подгружаться фотография работы */}
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-700 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Услуги и цены */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Услуги и цены</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Услуга</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Цена</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ед. изм.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {master.services.map(service => (
                        <tr key={service.id}>
                          <td className="py-4 px-4 text-gray-900">{service.name}</td>
                          <td className="py-4 px-4 text-right font-medium text-gray-900">{service.price} сом</td>
                          <td className="py-4 px-4 text-gray-700">{service.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Специалисты не найдены</h3>
            <p className="text-gray-700">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
          </div>
        )}
      </div>
    </div>
  );
} 