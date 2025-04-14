'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Types
type Service = {
  id: string;
  name: string;
  price: number;
  unit: string;
};

type PortfolioItem = {
  id: string;
  image: string;
  title: string;
  description: string;
};

type Master = {
  id: string;
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
  portfolio: PortfolioItem[];
  services: Service[];
  description: string;
  contactInfo: {
    phone?: string;
    email?: string;
    telegram?: string;
    whatsapp?: string;
  };
};

// Mock data
const mastersData: Master[] = [
  {
    id: '1',
    name: 'Азамат Шералиев',
    avatar: '/avatars/master1.jpg',
    title: 'Сантехник',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.8,
    reviewCount: 156,
    experience: '8 лет',
    education: 'Технический колледж',
    description: 'Профессиональный сантехник с многолетним опытом. Специализируюсь на установке и ремонте сантехнического оборудования любой сложности. Работаю быстро и качественно, даю гарантию на все выполненные работы.',
    contactInfo: {
      phone: '+996 555 123 456',
      telegram: '@azamat_plumber',
      whatsapp: '+996 555 123 456'
    },
    portfolio: [
      {
        id: 'p1',
        image: '/portfolio/plumbing1.jpg',
        title: 'Установка душевой кабины',
        description: 'Полная установка душевой кабины с подключением всех коммуникаций'
      },
      {
        id: 'p2',
        image: '/portfolio/plumbing2.jpg',
        title: 'Замена труб в квартире',
        description: 'Замена старых труб на современные полипропиленовые'
      },
      {
        id: 'p3',
        image: '/portfolio/plumbing3.jpg',
        title: 'Монтаж системы отопления',
        description: 'Установка радиаторов и подключение к центральной системе отопления'
      }
    ],
    services: [
      { id: 's1', name: 'Установка смесителя', price: 800, unit: 'шт.' },
      { id: 's2', name: 'Замена труб', price: 450, unit: 'м' },
      { id: 's3', name: 'Установка унитаза', price: 1500, unit: 'шт.' },
      { id: 's4', name: 'Монтаж радиатора отопления', price: 2000, unit: 'шт.' },
      { id: 's5', name: 'Устранение течи', price: 600, unit: 'точка' }
    ]
  },
  {
    id: '2',
    name: 'Айгуль Сапарова',
    avatar: '/avatars/master2.jpg',
    title: 'Дизайнер интерьера',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 89,
    experience: '6 лет',
    education: 'Кыргызская государственная художественная академия',
    description: 'Дизайнер интерьеров с уникальным видением и чувством стиля. Создаю комфортные и функциональные пространства, которые отражают индивидуальность клиента. Работаю с проектами любой сложности - от небольших квартир до коммерческих помещений.',
    contactInfo: {
      email: 'aigul.design@gmail.com',
      telegram: '@aigul_design',
      whatsapp: '+996 700 234 567'
    },
    portfolio: [
      {
        id: 'p1',
        image: '/portfolio/design1.jpg',
        title: 'Скандинавская гостиная',
        description: 'Проект гостиной в скандинавском стиле с элементами минимализма'
      },
      {
        id: 'p2',
        image: '/portfolio/design2.jpg',
        title: 'Современная кухня',
        description: 'Дизайн-проект кухни с островом и современной техникой'
      },
      {
        id: 'p3',
        image: '/portfolio/design3.jpg',
        title: 'Детская комната',
        description: 'Функциональная и яркая детская комната для дошкольника'
      }
    ],
    services: [
      { id: 's1', name: 'Консультация', price: 1000, unit: 'час' },
      { id: 's2', name: 'Дизайн-проект', price: 15000, unit: 'м²' },
      { id: 's3', name: 'Подбор мебели и материалов', price: 5000, unit: 'проект' },
      { id: 's4', name: 'Авторский надзор', price: 3000, unit: 'день' }
    ]
  },
  {
    id: '3',
    name: 'Бакыт Джумагулов',
    avatar: '/avatars/master3.jpg',
    title: 'Электрик',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.7,
    reviewCount: 124,
    experience: '10 лет',
    education: 'Политехнический колледж',
    description: 'Опытный электрик с сертификатами безопасности. Выполняю все виды электромонтажных работ в жилых и коммерческих помещениях. Обеспечиваю высокое качество и соблюдение всех норм безопасности.',
    contactInfo: {
      phone: '+996 777 345 678',
      telegram: '@bakyt_electrician',
      whatsapp: '+996 777 345 678'
    },
    portfolio: [
      {
        id: 'p1',
        image: '/portfolio/electric1.jpg',
        title: 'Монтаж проводки в новостройке',
        description: 'Полная разводка электропроводки в трехкомнатной квартире'
      },
      {
        id: 'p2',
        image: '/portfolio/electric2.jpg',
        title: 'Установка освещения',
        description: 'Монтаж светильников и выключателей в офисном помещении'
      },
      {
        id: 'p3',
        image: '/portfolio/electric3.jpg',
        title: 'Модернизация электрощита',
        description: 'Замена старого электрощита на современный с автоматами'
      }
    ],
    services: [
      { id: 's1', name: 'Диагностика электропроводки', price: 500, unit: 'точка' },
      { id: 's2', name: 'Замена/установка розеток и выключателей', price: 300, unit: 'шт.' },
      { id: 's3', name: 'Монтаж проводки', price: 350, unit: 'м' },
      { id: 's4', name: 'Установка люстры/светильника', price: 700, unit: 'шт.' },
      { id: 's5', name: 'Сборка электрощита', price: 3000, unit: 'шт.' }
    ]
  }
];

export default function MasterProfile() {
  const params = useParams();
  const masterId = params.id as string;
  
  // Find the master by ID
  const master = mastersData.find(m => m.id === masterId);
  
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'services' | 'reviews'>('about');
  
  if (!master) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Мастер не найден</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-300">Извините, запрашиваемый мастер не найден.</p>
          <Link href="/masters" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Вернуться к списку мастеров
          </Link>
        </div>
      </div>
    );
  }
  
  // Render stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };
  
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Master header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 dark:bg-gray-800">
        <div className="md:flex items-center">
          <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
            <div className="relative">
              <Image
                src={master.avatar || '/avatars/default.jpg'}
                alt={master.name}
                width={150}
                height={150}
                className="rounded-full border-4 border-blue-100 dark:border-blue-900"
              />
              <span 
                className={`absolute bottom-2 right-2 w-4 h-4 rounded-full ${
                  master.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                } border-2 border-white dark:border-gray-800`}
              />
            </div>
          </div>
          
          <div className="md:w-3/4 md:pl-6">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{master.name}</h1>
              <div className="flex space-x-2">
                {master.isVerified && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200">
                    Проверенный
                  </span>
                )}
                {master.hasGuarantee && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-200">
                    Гарантия
                  </span>
                )}
                <span className={`px-2 py-1 text-xs rounded-full ${
                  master.status === 'online' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {master.status === 'online' ? 'Онлайн' : 'Офлайн'}
                </span>
              </div>
            </div>
            
            <h2 className="text-lg text-blue-600 mb-2 dark:text-blue-400">{master.title}</h2>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(master.rating)}
              </div>
              <span className="text-gray-600 dark:text-gray-300">
                {master.rating} ({master.reviewCount} отзывов)
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Опыт: </span>
                  {master.experience}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Образование: </span>
                  {master.education}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Link 
                href={`/propose-task/${master.id}`} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Предложить задание
              </Link>
              <button 
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"
              >
                Написать сообщение
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6 dark:bg-gray-800">
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'about'
                ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            О мастере
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'portfolio'
                ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Портфолио
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'services'
                ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Услуги и цены
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'reviews'
                ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Отзывы
          </button>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'about' && (
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">О мастере</h3>
              <p className="text-gray-600 mb-6 dark:text-gray-300">{master.description}</p>
              
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Контактная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {master.contactInfo.phone && (
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500 dark:text-gray-400">phone</span>
                    <p className="text-gray-600 dark:text-gray-300">{master.contactInfo.phone}</p>
                  </div>
                )}
                {master.contactInfo.email && (
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500 dark:text-gray-400">email</span>
                    <p className="text-gray-600 dark:text-gray-300">{master.contactInfo.email}</p>
                  </div>
                )}
                {master.contactInfo.telegram && (
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500 dark:text-gray-400">send</span>
                    <p className="text-gray-600 dark:text-gray-300">{master.contactInfo.telegram}</p>
                  </div>
                )}
                {master.contactInfo.whatsapp && (
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500 dark:text-gray-400">whatsapp</span>
                    <p className="text-gray-600 dark:text-gray-300">{master.contactInfo.whatsapp}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'portfolio' && (
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Портфолио работ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {master.portfolio.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden dark:bg-gray-700">
                    <div className="aspect-w-16 aspect-h-9 relative h-48">
                      <Image
                        src={item.image || '/portfolio/default.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium mb-2 text-gray-800 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Услуги и цены</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Услуга
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Цена (сом)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Единица
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {master.services.map(service => (
                      <tr key={service.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {service.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {service.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {service.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Отзывы клиентов</h3>
                <div>
                  <span className="text-3xl font-bold text-gray-800 dark:text-white">{master.rating}</span>
                  <div className="flex my-1">
                    {renderStars(master.rating)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{master.reviewCount} отзывов</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-center text-gray-500 italic dark:text-gray-400">
                  Здесь будут отображаться отзывы клиентов.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 