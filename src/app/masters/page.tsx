'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';

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
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
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
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Установка раковины',
          description: 'Установка и подключение современной раковины в ванной комнате'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1521207418485-99c705420785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Ремонт смесителя',
          description: 'Замена неисправного смесителя на кухне'
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1556911220-bda9f7f4ec2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
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
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
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
          image: 'https://images.unsplash.com/photo-1555963966-b7ae5242ff5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Замена проводки',
          description: 'Полная замена электропроводки в трехкомнатной квартире'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1629771697156-9c5fedfc2117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Установка люстры',
          description: 'Монтаж и подключение сложной люстры с пультом управления'
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1507148892603-f1746f32ab01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
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
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: 'Мастер отделочных работ',
      status: 'online',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.9,
      reviewCount: 91,
      experience: '10 лет опыта в отделочных работах',
      education: 'Строительный колледж, специальность "Технология отделочных работ"',
      portfolio: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Отделка стен',
          description: 'Шпаклевка и покраска стен в новой квартире'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Укладка плитки',
          description: 'Облицовка ванной комнаты керамической плиткой'
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1556909114-44e3e9399a2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Монтаж гипсокартона',
          description: 'Установка подвесного потолка и межкомнатных перегородок'
        }
      ],
      services: [
        { id: 1, name: 'Шпаклевка стен', price: 350, unit: 'м²' },
        { id: 2, name: 'Покраска стен', price: 280, unit: 'м²' },
        { id: 3, name: 'Поклейка обоев', price: 400, unit: 'м²' },
        { id: 4, name: 'Укладка плитки', price: 850, unit: 'м²' }
      ]
    },
    {
      id: 4,
      name: 'Гульжан Алмазова',
      avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
      title: 'Дизайнер интерьера',
      status: 'online',
      isVerified: true,
      hasGuarantee: false,
      rating: 5.0,
      reviewCount: 48,
      experience: '7 лет опыта в дизайне интерьеров',
      education: 'Кыргызская государственная художественная академия, факультет дизайна',
      portfolio: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Дизайн гостиной',
          description: 'Проект современной гостиной в минималистичном стиле'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Планировка квартиры',
          description: '3D-визуализация и планировка двухкомнатной квартиры'
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
          title: 'Дизайн кухни',
          description: 'Проект кухни-студии в современном стиле'
        }
      ],
      services: [
        { id: 1, name: 'Консультация', price: 1500, unit: 'час' },
        { id: 2, name: 'Планировочное решение', price: 10000, unit: 'проект' },
        { id: 3, name: '3D-визуализация', price: 1200, unit: 'м²' },
        { id: 4, name: 'Полный дизайн-проект', price: 3000, unit: 'м²' }
      ]
    }
  ];

  // Список категорий для фильтрации
  const categories = [
    { id: 'all', name: 'Все специальности' },
    { id: 'repair', name: 'Ремонт и строительство' },
    { id: 'repair_general', name: '🔨 Ремонт' },
    { id: 'repair_capital', name: 'Капитальный ремонт' },
    { id: 'repair_cosmetic', name: 'Косметический ремонт' },
    { id: 'repair_turnkey', name: 'Ремонт квартир под ключ' },
    { id: 'repair_house', name: 'Ремонт домов/коттеджей' },
    { id: 'repair_office', name: 'Ремонт офисов и коммерческих помещений' },
    { id: 'repair_demolition', name: 'Демонтажные работы' },
    { id: 'repair_plaster', name: 'Штукатурные и малярные работы' },
    
    { id: 'finishing', name: '🎨 Отделка' },
    { id: 'finishing_rough', name: 'Черновая отделка' },
    { id: 'finishing_final', name: 'Чистовая отделка' },
    { id: 'finishing_walls', name: 'Отделка стен' },
    { id: 'finishing_ceiling', name: 'Отделка потолков' },
    { id: 'finishing_floor', name: 'Отделка полов' },
    { id: 'finishing_tile', name: 'Облицовка плиткой' },
    { id: 'finishing_decor', name: 'Декоративные элементы' },
    
    { id: 'electrical', name: '💡 Электрика' },
    { id: 'electrical_wiring', name: 'Монтаж электропроводки' },
    { id: 'electrical_sockets', name: 'Установка розеток и выключателей' },
    { id: 'electrical_panels', name: 'Монтаж электрощитов' },
    { id: 'electrical_lighting', name: 'Установка освещения' },
    { id: 'electrical_smart', name: 'Умный дом / системы автоматизации' },
    { id: 'electrical_troubleshoot', name: 'Поиск и устранение неисправностей' },
    { id: 'electrical_house', name: 'Электроснабжение частных домов' },
    
    { id: 'plumbing', name: '🚰 Водопровод' },
    { id: 'plumbing_pipes', name: 'Монтаж труб' },
    { id: 'plumbing_fixtures', name: 'Установка сантехники' },
    { id: 'plumbing_filters', name: 'Установка фильтров и счетчиков воды' },
    { id: 'plumbing_sewage', name: 'Канализация' },
    { id: 'plumbing_heating', name: 'Отопление' },
    { id: 'plumbing_water_heaters', name: 'Водонагреватели / бойлеры' },
    { id: 'plumbing_maintenance', name: 'Ремонт и обслуживание' },
    
    { id: 'design', name: '🖼️ Дизайн' },
    { id: 'design_interior', name: 'Дизайн интерьера' },
    { id: 'design_home', name: 'Дизайн квартиры/дома' },
    { id: 'design_3d', name: '3D-визуализация' },
    { id: 'design_materials', name: 'Подбор материалов' },
    { id: 'design_replanning', name: 'Дизайн с перепланировкой' },
    { id: 'design_supervision', name: 'Авторский надзор' },
    { id: 'design_commercial', name: 'Коммерческий дизайн' },
    
    { id: 'roof', name: '🏠 Крыша' },
    { id: 'roof_installation', name: 'Монтаж кровли' },
    { id: 'roof_repair', name: 'Ремонт кровли' },
    { id: 'roof_insulation', name: 'Утепление крыши' },
    { id: 'roof_waterproofing', name: 'Гидроизоляция' },
    { id: 'roof_soffit', name: 'Подшивка свесов' },
    { id: 'roof_gutter', name: 'Установка водосточной системы' },
    { id: 'roof_maintenance', name: 'Очистка и обслуживание кровли' }
  ];

  // Фильтрация мастеров по поиску и категории
  const filteredMasters = masters.filter(master => {
    const matchesSearch = searchQuery === '' || 
      master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      master.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || (
      (selectedCategory === 'repair' && ['Сантехник', 'Электрик'].includes(master.title)) ||
      (selectedCategory === 'electrical' && master.title.includes('Электрик')) ||
      (selectedCategory === 'plumbing' && master.title.includes('Сантехник')) ||
      (selectedCategory === 'design' && master.title.includes('Дизайнер'))
    );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2 text-black">Мастера и специалисты</h1>
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
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id} className={category.id.includes('_') ? 'pl-6' : ''}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Список мастеров */}
      <div className="space-y-6">
        {filteredMasters.length > 0 ? (
          filteredMasters.map(master => (
            <div key={master.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Основная информация о мастере */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Аватар и статус */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold text-gray-600">
                        {master.avatar ? (
                          <SafeImage 
                            src={master.avatar} 
                            alt={master.name} 
                            width={96} 
                            height={96} 
                            className="object-cover"
                            fallbackText={master.name.charAt(0)}
                          />
                        ) : (
                          master.name.charAt(0)
                        )}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${master.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${master.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {master.status === 'online' ? 'Онлайн' : 'Офлайн'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Данные о мастере */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold text-black">{master.name}</h2>
                      {master.isVerified && (
                        <div className="flex items-center text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md text-xs">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Проверен
                        </div>
                      )}
                      {master.hasGuarantee && (
                        <div className="flex items-center text-green-700 bg-green-50 px-2 py-0.5 rounded-md text-xs">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Гарантия
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-800 text-base mb-3">{master.title}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-3">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg 
                            key={star}
                            className={`w-4 h-4 ${star <= Math.floor(master.rating) ? 'text-yandex-yellow' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="ml-1 text-black font-medium">{master.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm">{master.reviewCount} отзывов</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-black mb-1">Опыт работы</h3>
                        <p className="text-gray-700 text-sm">{master.experience}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-black mb-1">Образование</h3>
                        <p className="text-gray-700 text-sm">{master.education}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link 
                        href={`/masters/${master.id}`}
                        className="inline-block px-4 py-2 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium text-sm"
                      >
                        Подробнее
                      </Link>
                      <Link 
                        href={`/create-task?specialist=${master.id}`}
                        className="inline-block px-4 py-2 border border-black text-black rounded-md hover:bg-gray-50 transition text-sm"
                      >
                        Предложить задание
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Портфолио */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-base font-semibold text-black mb-4">Портфолио и выполненные работы</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {master.portfolio.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-40 bg-gray-200 relative">
                        {item.image ? (
                          <SafeImage
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-500">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-black text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-700 text-xs">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Услуги и цены */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-base font-semibold text-black mb-4">Услуги и цены</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Услуга</th>
                        <th className="py-2 px-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Цена</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ед. изм.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {master.services.map(service => (
                        <tr key={service.id}>
                          <td className="py-3 px-4 text-sm text-black">{service.name}</td>
                          <td className="py-3 px-4 text-right font-medium text-black text-sm">{service.price} сом</td>
                          <td className="py-3 px-4 text-gray-700 text-sm">{service.unit}</td>
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
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg font-medium text-black mb-2">Специалисты не найдены</h3>
            <p className="text-gray-700">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
          </div>
        )}
      </div>
    </div>
  );
} 