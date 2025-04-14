'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Тип для задач
type Task = {
  id: number;
  title: string;
  category: string;
  description: string;
  budget: string;
  location: string;
  date: string;
  status: 'new' | 'active' | 'completed';
  responseCount: number;
  viewCount: number;
};

export default function JobBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Категории задач
  const categories = [
    'Все категории',
    'Ремонт и строительство',
    'Бытовые услуги',
    'Красота и здоровье',
    'IT и программирование',
    'Дизайн и оформление',
    'Обучение и репетиторство',
    'Транспорт и перевозки'
  ];

  // Статусы задач
  const statuses = [
    'Все статусы',
    'Новые',
    'Активные',
    'Завершенные'
  ];

  // Мок-данные для задач
  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Установка смесителя в ванной',
      category: 'Ремонт и строительство',
      description: 'Нужно установить новый смеситель в ванной комнате. Смеситель уже куплен.',
      budget: '1500 сом',
      location: 'Бишкек, центр',
      date: '15.05.2025',
      status: 'new',
      responseCount: 3,
      viewCount: 12
    },
    {
      id: 2,
      title: 'Создание лого для магазина одежды',
      category: 'Дизайн и оформление',
      description: 'Требуется разработать современный логотип для нового магазина женской одежды.',
      budget: '3000-5000 сом',
      location: 'Удаленно',
      date: '12.05.2025',
      status: 'active',
      responseCount: 8,
      viewCount: 27
    },
    {
      id: 3,
      title: 'Репетитор по математике для подготовки к ОРТ',
      category: 'Обучение и репетиторство',
      description: 'Ищу опытного репетитора для подготовки к ОРТ по математике. Занятия 2 раза в неделю.',
      budget: '500 сом/час',
      location: 'Бишкек, мкр. Асанбай',
      date: '10.05.2025',
      status: 'active',
      responseCount: 5,
      viewCount: 18
    },
    {
      id: 4,
      title: 'Перевозка мебели из старой квартиры в новую',
      category: 'Транспорт и перевозки',
      description: 'Необходимо перевезти мебель из двухкомнатной квартиры. Расстояние около 5 км.',
      budget: '2000 сом',
      location: 'Бишкек, мкр. Джал',
      date: '18.05.2025',
      status: 'new',
      responseCount: 2,
      viewCount: 9
    },
    {
      id: 5,
      title: 'Настройка 1С Бухгалтерия',
      category: 'IT и программирование',
      description: 'Требуется настройка 1С Бухгалтерия для небольшого торгового предприятия.',
      budget: '10000 сом',
      location: 'Бишкек',
      date: '08.05.2025',
      status: 'completed',
      responseCount: 4,
      viewCount: 15
    },
    {
      id: 6,
      title: 'Маникюр и педикюр на дому',
      category: 'Красота и здоровье',
      description: 'Ищу мастера для маникюра и педикюра с выездом на дом.',
      budget: '1200 сом',
      location: 'Бишкек, мкр. Восток-5',
      date: '20.05.2025',
      status: 'new',
      responseCount: 7,
      viewCount: 21
    }
  ];

  // Фильтрация задач
  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || selectedCategory === 'Все категории' || 
                           task.category === selectedCategory;
    
    let matchesStatus = true;
    if (selectedStatus && selectedStatus !== 'Все статусы') {
      if (selectedStatus === 'Новые') matchesStatus = task.status === 'new';
      else if (selectedStatus === 'Активные') matchesStatus = task.status === 'active';
      else if (selectedStatus === 'Завершенные') matchesStatus = task.status === 'completed';
    }
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться на главную
          </Link>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Доска объявлений</h1>
          <Link
            href="/create-task"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Разместить задачу
          </Link>
        </div>
        
        {/* Фильтры и поиск */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-4">
            <div className="font-medium mb-2">Поиск задач</div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введите ключевое слово"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-medium mb-2">Категория</div>
              <select
                value={selectedCategory || 'Все категории'}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <div className="font-medium mb-2">Статус</div>
              <select
                value={selectedStatus || 'Все статусы'}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Список задач */}
        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/tasks/${task.id}`} className="text-xl font-bold text-blue-600 hover:underline">
                    {task.title}
                  </Link>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === 'new' ? 'bg-green-100 text-green-800' : 
                    task.status === 'active' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status === 'new' ? 'Новая' : 
                     task.status === 'active' ? 'Активная' : 
                     'Завершена'}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded mr-2">
                    {task.category}
                  </span>
                  <span className="text-gray-600 text-sm">{task.date}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{task.description}</p>
                
                <div className="flex flex-wrap gap-y-2">
                  <div className="mr-6 flex items-center">
                    <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-700">{task.budget}</span>
                  </div>
                  
                  <div className="mr-6 flex items-center">
                    <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">{task.location}</span>
                  </div>
                  
                  <div className="mr-6 flex items-center">
                    <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-gray-700">Откликов: {task.responseCount}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-gray-700">Просмотров: {task.viewCount}</span>
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
            <h2 className="text-xl font-bold text-gray-700 mb-2">Задачи не найдены</h2>
            <p className="text-gray-600 mb-4">
              По вашему запросу не найдено ни одной задачи. Попробуйте изменить параметры поиска или создайте свою задачу.
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
    </div>
  );
} 