'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SafeImage from '@/components/SafeImage';

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
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
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
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Установка душевой кабины',
        description: 'Полная установка душевой кабины с подключением всех коммуникаций'
      },
      {
        id: 'p2',
        image: 'https://images.unsplash.com/photo-1594631661960-32018a8413fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Замена труб в квартире',
        description: 'Замена старых труб на современные полипропиленовые'
      },
      {
        id: 'p3',
        image: 'https://images.unsplash.com/photo-1532522750741-628fde798c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
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
    avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
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
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Скандинавская гостиная',
        description: 'Проект гостиной в скандинавском стиле с элементами минимализма'
      },
      {
        id: 'p2',
        image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Современная кухня',
        description: 'Дизайн-проект кухни с островом и современной техникой'
      },
      {
        id: 'p3',
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
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
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
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
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Монтаж проводки в новостройке',
        description: 'Полная разводка электропроводки в трехкомнатной квартире'
      },
      {
        id: 'p2',
        image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Установка освещения',
        description: 'Монтаж светильников и выключателей в офисном помещении'
      },
      {
        id: 'p3',
        image: 'https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
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
  },
  {
    id: '4',
    name: 'Нурлан Сабитов',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    title: 'Мастер отделочных работ',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 87,
    experience: '12 лет',
    education: 'Строительный колледж',
    description: 'Профессиональный отделочник с большим опытом работы. Выполняю все виды отделочных работ: шпаклевка, покраска, поклейка обоев, укладка плитки, монтаж гипсокартона. Работаю качественно и в срок.',
    contactInfo: {
      phone: '+996 700 987 654',
      telegram: '@nurlan_master',
      whatsapp: '+996 700 987 654'
    },
    portfolio: [
      {
        id: 'p1',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Отделка стен в спальне',
        description: 'Шпаклевка и покраска стен в спальне'
      },
      {
        id: 'p2',
        image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Укладка плитки в ванной',
        description: 'Полная отделка ванной комнаты плиткой'
      },
      {
        id: 'p3',
        image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
        title: 'Монтаж гипсокартона',
        description: 'Создание перегородки из гипсокартона с дверным проемом'
      }
    ],
    services: [
      { id: 's1', name: 'Шпаклевка стен', price: 350, unit: 'м²' },
      { id: 's2', name: 'Покраска стен', price: 300, unit: 'м²' },
      { id: 's3', name: 'Поклейка обоев', price: 400, unit: 'м²' },
      { id: 's4', name: 'Укладка плитки', price: 850, unit: 'м²' },
      { id: 's5', name: 'Монтаж гипсокартона', price: 700, unit: 'м²' }
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
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-black">Мастер не найден</h1>
          <p className="text-gray-600 mb-6">Извините, запрашиваемый мастер не найден.</p>
          <Link href="/masters" className="px-4 py-2 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium">
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
        <span key={i} className={`text-lg ${i <= rating ? 'text-yandex-yellow' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      {/* Master header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="md:flex items-center">
          <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-2xl font-bold text-gray-400">
                {master.avatar ? (
                  <SafeImage 
                    src={master.avatar} 
                    alt={master.name} 
                    width={128} 
                    height={128} 
                    className="object-cover" 
                    fallbackText={master.name.charAt(0)}
                  />
                ) : (
                  master.name.charAt(0)
                )}
              </div>
              <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${master.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
          </div>
          
          <div className="md:w-3/4 md:pl-6">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-black">{master.name}</h1>
              <div className="flex space-x-2">
                {master.isVerified && (
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                    Проверен
                  </span>
                )}
                {master.hasGuarantee && (
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                    Гарантия
                  </span>
                )}
                <span className={`px-2 py-1 text-xs rounded-full ${
                  master.status === 'online' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {master.status === 'online' ? 'Онлайн' : 'Офлайн'}
                </span>
              </div>
            </div>
            
            <h2 className="text-lg text-gray-700 mb-2">{master.title}</h2>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(master.rating)}
              </div>
              <span className="text-gray-600">
                {master.rating} ({master.reviewCount} отзывов)
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium text-black">Опыт: </span>
                  {master.experience}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium text-black">Образование: </span>
                  {master.education}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Link 
                href={`/propose-task/${master.id}`} 
                className="px-4 py-2 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium"
              >
                Предложить задание
              </Link>
              <button 
                className="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-50 transition"
              >
                Написать сообщение
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs navigation */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'about'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            О мастере
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'portfolio'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Портфолио
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'services'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Услуги и цены
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'reviews'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Отзывы
          </button>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'about' && (
            <div>
              <h3 className="text-lg font-medium mb-4 text-black">О мастере</h3>
              <p className="text-gray-600 mb-6">{master.description}</p>
              
              <h3 className="text-lg font-medium mb-4 text-black">Контактная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {master.contactInfo.phone && (
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500">phone</span>
                    <p className="text-gray-600">{master.contactInfo.phone}</p>
                  </div>
                )}
                {master.contactInfo.email && (
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500">email</span>
                    <p className="text-gray-600">{master.contactInfo.email}</p>
                  </div>
                )}
                {master.contactInfo.telegram && (
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500">send</span>
                    <p className="text-gray-600">{master.contactInfo.telegram}</p>
                  </div>
                )}
                {master.contactInfo.whatsapp && (
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500">whatsapp</span>
                    <p className="text-gray-600">{master.contactInfo.whatsapp}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'portfolio' && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Портфолио</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {master.portfolio.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-40 bg-gray-100 relative rounded overflow-hidden">
                      {item.image ? (
                        <SafeImage
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {activeTab === 'services' && (
            <div>
              <h3 className="text-lg font-medium mb-4 text-black">Услуги и цены</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Услуга
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Цена (сом)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Единица
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {master.services.map(service => (
                      <tr key={service.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          {service.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                          {service.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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
                <h3 className="text-lg font-medium text-black">Отзывы клиентов</h3>
                <div>
                  <span className="text-3xl font-bold text-black">{master.rating}</span>
                  <div className="flex my-1">
                    {renderStars(master.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{master.reviewCount} отзывов</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-center text-gray-500 italic">
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