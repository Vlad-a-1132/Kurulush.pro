'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, BriefcaseIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

// Mock data for specialist profile
const mockProfile = {
  name: 'Базарбаев Чынгыз',
  email: 'chyngyz.bazarbaev@gmail.com',
  phone: '+996 555 123-45-67',
  avatar: '/avatars/specialist-1.jpg',
  address: 'г. Бишкек, ул. Примерная, д. 123',
  category: 'Ремонт и строительство',
  specialty: 'Сантехник',
  description: 'Профессиональный сантехник с опытом работы более 7 лет. Специализируюсь на установке и ремонте сантехнического оборудования, устранении протечек, замене труб.',
  experience: '7 лет',
  rating: 4.8,
  reviewsCount: 56,
  registrationDate: '10.02.2024',
  availableDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
  availableHours: '9:00 - 19:00',
  priceRange: '1000 сом - 5000 сом',
  portfolio: [
    {
      id: 1,
      title: 'Установка ванны',
      description: 'Установка акриловой ванны с заменой коммуникаций',
      image: '/portfolio/plumber-1.jpg'
    },
    {
      id: 2,
      title: 'Замена смесителя',
      description: 'Замена смесителя на кухне, подключение фильтра для воды',
      image: '/portfolio/plumber-2.jpg'
    },
    {
      id: 3,
      title: 'Ремонт душевой кабины',
      description: 'Устранение протечек и ремонт системы слива в душевой кабине',
      image: '/portfolio/plumber-3.jpg'
    }
  ]
};

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    clientName: 'Алымбеков Аскар',
    clientAvatar: '/avatars/client-avatar.jpg',
    lastMessage: 'Добрый день! Когда вам будет удобно приехать для установки смесителя?',
    lastMessageDate: '12.04.2025 14:30',
    unread: true,
  },
  {
    id: 2,
    clientName: 'Тентимишов Жанат',
    clientAvatar: '/avatars/client-2.jpg',
    lastMessage: 'Спасибо за выполненную работу! Все отлично.',
    lastMessageDate: '10.04.2025 18:45',
    unread: false,
  },
  {
    id: 3,
    clientName: 'Кайсаров Аскат',
    clientAvatar: '/avatars/client-3.jpg',
    lastMessage: 'Здравствуйте! Подскажите, сколько будет стоить замена труб в ванной?',
    lastMessageDate: '05.04.2025 12:15',
    unread: false,
  },
];

// Mock data for orders
const mockOrders = [
  {
    id: '12345',
    date: '12.04.2025',
    clientName: 'Алымбеков Аскар',
    service: 'Установка смесителя',
    address: 'г. Бишкек, ул. Пушкина, д. 10, кв. 42',
    status: 'В процессе',
    price: '1500 сом',
  },
  {
    id: '12344',
    date: '10.04.2025',
    clientName: 'Тентимишов Жанат',
    service: 'Ремонт стиральной машины',
    address: 'г. Бишкек, ул. Ленина, д. 15, кв. 78',
    status: 'Завершен',
    price: '2500 сом',
  },
  {
    id: '12343',
    date: '05.04.2025',
    clientName: 'Кайсаров Аскат',
    service: 'Установка унитаза',
    address: 'г. Бишкек, ул. Гагарина, д. 7, кв. 23',
    status: 'Завершен',
    price: '3000 сом',
  },
  {
    id: '12342',
    date: '20.03.2025',
    clientName: 'Максат уулу Адылбек',
    service: 'Устранение протечки',
    address: 'г. Бишкек, ул. Маяковского, д. 8, кв. 56',
    status: 'Завершен',
    price: '1200 сом',
  },
];

// Interface for user
interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
  role: string;
  phoneNumber?: string;
  category?: string;
  specialty?: string;
  profileCompleted?: boolean;
}

export default function SpecialistProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<User | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(true);

  // Set active tab based on URL parameter
  useEffect(() => {
    if (tabParam && ['profile', 'messages', 'orders'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Check user auth and load profile data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
      setIsProfileComplete(userData.profileCompleted || false);
      
      // If profile is not complete and not already on the complete page
      if (!userData.profileCompleted && !window.location.pathname.includes('/complete')) {
        router.push('/specialist-profile/complete');
      }
    } else {
      router.push('/specialist-login');
    }
  }, [router]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Личный кабинет специалиста</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Профиль
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Сообщения
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Заказы
          </button>
        </nav>
      </div>
      
      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                <div className="w-32 h-32 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center">
                  {/* Placeholder for specialist avatar */}
                  <span className="font-bold text-4xl text-blue-600">
                    {mockProfile.name.charAt(0)}
                  </span>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="font-bold text-gray-900 ml-1">{mockProfile.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">({mockProfile.reviewsCount} отзывов)</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link 
                    href="/specialist-profile/edit"
                    className="text-sm w-full block text-center py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                  >
                    Редактировать профиль
                  </Link>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{user.name || mockProfile.name}</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                    Онлайн
                  </span>
                </div>
                
                <div className="mt-1">
                  <p className="text-blue-600 font-medium">{user.specialty || mockProfile.specialty}</p>
                  <p className="text-gray-700 text-sm">{user.category || mockProfile.category}</p>
                </div>
                
                <div className="mt-4 flex flex-col space-y-2">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 text-gray-600 mr-1.5" />
                    <span className="text-gray-900">{user.email || mockProfile.email}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-600 mr-1.5" />
                    <span className="text-gray-900">{user.phoneNumber || mockProfile.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-600 mr-1.5" />
                    <span className="text-gray-900">{mockProfile.address}</span>
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 text-gray-600 mr-1.5" />
                    <span className="text-gray-900">Опыт работы: {mockProfile.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-600 mr-1.5" />
                    <span className="text-gray-900">
                      Режим работы: {mockProfile.availableDays.join(', ')}, {mockProfile.availableHours}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-2">О себе</h3>
                  <p className="text-gray-900">{mockProfile.description}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Стоимость услуг</h3>
                  <p className="text-gray-900">Диапазон цен: {mockProfile.priceRange}</p>
                  <p className="text-gray-700 text-sm mt-1">Точная стоимость определяется после осмотра и обсуждения деталей</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Портфолио</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockProfile.portfolio.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 relative">
                      {/* Placeholder for portfolio image */}
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
                        <span className="text-blue-600 font-medium">{item.title}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-gray-700 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border border-dashed border-gray-300 rounded-lg flex items-center justify-center h-48 md:h-auto">
                  <Link 
                    href="/specialist-profile/edit"
                    className="text-blue-600 flex flex-col items-center p-6 hover:bg-blue-50 transition w-full h-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="mt-2">Добавить работу</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Сообщения</h2>
            <p className="text-gray-900 text-sm">Ваши переписки с клиентами</p>
          </div>
          
          {mockConversations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {mockConversations.map((conversation) => (
                <Link 
                  key={conversation.id} 
                  href={`/specialist-conversations/${conversation.id}`}
                  className="block p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                          {/* Placeholder for client avatar */}
                          <div className="w-full h-full flex items-center justify-center font-bold text-blue-600 bg-blue-100">
                            {conversation.clientName.charAt(0)}
                          </div>
                        </div>
                        {conversation.unread && (
                          <span className="absolute top-0 right-0 h-3 w-3 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-900">{conversation.clientName}</h3>
                        <span className="text-gray-700 text-xs">{conversation.lastMessageDate}</span>
                      </div>
                      <p className={`text-sm mt-1 ${conversation.unread ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-900 mb-4">У вас пока нет сообщений от клиентов</p>
            </div>
          )}
        </div>
      )}
      
      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Заказы</h2>
            <p className="text-gray-900 text-sm">Все ваши заказы и их статусы</p>
          </div>
          
          <div className="p-4 flex mb-4 gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Все заказы
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
              В процессе
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
              Завершенные
            </button>
          </div>
          
          {mockOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      № заказа
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Клиент и услуга
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Адрес
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Стоимость
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <span className="font-medium">{order.clientName}</span>
                          <p className="text-sm mt-1 text-gray-900">{order.service}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${order.status === 'Завершен' ? 'bg-green-100 text-green-800' : 
                          order.status === 'В процессе' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            Подробнее
                          </button>
                          {order.status !== 'Завершен' && (
                            <button className="text-green-600 hover:text-green-800">
                              Завершить
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-900 mb-4">У вас пока нет заказов</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 