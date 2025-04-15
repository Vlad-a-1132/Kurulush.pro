'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

// Mock data for client profile
const mockProfile = {
  name: 'Адылбеков Рыскелди',
  email: 'ryskeldi.adylbekov@example.com',
  phone: '+996 700 123-45-67',
  avatar: '/avatars/client-avatar.jpg',
  registrationDate: '15.02.2024',
};

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    specialistName: 'Базарбаев Чынгыз',
    specialistAvatar: '/avatars/specialist-1.jpg',
    specialistRole: 'Сантехник',
    lastMessage: 'Добрый день! Когда вам будет удобно, чтобы я приехал для установки смесителя?',
    lastMessageDate: '12.04.2025 14:30',
    unread: true,
  },
  {
    id: 2,
    specialistName: 'Манголов Адилет',
    specialistAvatar: '/avatars/specialist-2.jpg',
    specialistRole: 'Мастер маникюра',
    lastMessage: 'Спасибо за запись! Жду вас завтра в 15:00',
    lastMessageDate: '10.04.2025 18:45',
    unread: false,
  },
  {
    id: 3,
    specialistName: 'Алымбеков Аскар',
    specialistAvatar: '/avatars/specialist-3.jpg',
    specialistRole: 'Электрик',
    lastMessage: 'Работа выполнена. Если возникнут вопросы, обращайтесь!',
    lastMessageDate: '05.04.2025 12:15',
    unread: false,
  },
];

// Mock data for orders
const mockOrders = [
  {
    id: '12345',
    date: '12.04.2025',
    specialistName: 'Базарбаев Чынгыз',
    specialistRole: 'Сантехник',
    service: 'Установка смесителя',
    status: 'В процессе',
    price: '1500 сом',
  },
  {
    id: '12344',
    date: '10.04.2025',
    specialistName: 'Манголов Адилет',
    specialistRole: 'Мастер маникюра',
    service: 'Маникюр с покрытием гель-лаком',
    status: 'Запланирован',
    price: '2000 сом',
  },
  {
    id: '12343',
    date: '05.04.2025',
    specialistName: 'Алымбеков Аскар',
    specialistRole: 'Электрик',
    service: 'Замена проводки',
    status: 'Завершен',
    price: '3500 сом',
  },
  {
    id: '12342',
    date: '20.03.2025',
    specialistName: 'Тентимишов Жанат',
    specialistRole: 'Репетитор по английскому',
    service: '10 занятий по английскому языку',
    status: 'Завершен',
    price: '12000 сом',
  },
];

function ClientProfileContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('profile');

  // Set active tab based on URL parameter
  useEffect(() => {
    if (tabParam && ['profile', 'messages', 'orders'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Личный кабинет</h1>
      
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
            История заказов
          </button>
        </nav>
      </div>
      
      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-6">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center font-bold text-2xl text-blue-600">
                  {mockProfile.name.charAt(0)}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    Изменить фото
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{mockProfile.name}</h2>
                <p className="text-gray-900">На платформе с {mockProfile.registrationDate}</p>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-700">Email</p>
                    <p className="text-gray-900">{mockProfile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Телефон</p>
                    <p className="text-gray-900">{mockProfile.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Место проживания</p>
                    <p className="text-gray-900">{mockProfile.registrationDate}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                    Редактировать профиль
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Предпочтения</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Предпочитаемые типы услуг</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-200 text-gray-900 px-3 py-1 rounded-full text-sm">
                      Сантехника
                    </span>
                    <span className="bg-gray-200 text-gray-900 px-3 py-1 rounded-full text-sm">
                      Ремонт
                    </span>
                    <span className="bg-gray-200 text-gray-900 px-3 py-1 rounded-full text-sm">
                      Уборка
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      + Добавить
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Настройки уведомлений</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">Email уведомления</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">SMS уведомления</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Статистика</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-gray-900 mt-1">Завершенных заказов</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">3</p>
                  <p className="text-gray-900 mt-1">Активных чатов</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">8</p>
                  <p className="text-gray-900 mt-1">Оставлено отзывов</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Безопасность</h3>
              
              <div className="space-y-4">
                <div>
                  <button className="flex items-center text-gray-900 hover:text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Изменить пароль
                  </button>
                </div>
                <div>
                  <button className="flex items-center text-gray-900 hover:text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Настройки конфиденциальности
                  </button>
                </div>
                <div>
                  <button className="flex items-center text-gray-900 hover:text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Журнал активности
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-10 border-t border-gray-200 pt-8">
              <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Сообщения</h2>
            <p className="text-gray-900 text-sm">Ваши переписки со специалистами</p>
          </div>
          
          {mockConversations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {mockConversations.map((conversation) => (
                <Link 
                  key={conversation.id} 
                  href={`/conversations/${conversation.id}`}
                  className="block p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                          {/* Placeholder for specialist avatar */}
                          <div className="w-full h-full flex items-center justify-center font-bold text-blue-600 bg-blue-100">
                            {conversation.specialistName.charAt(0)}
                          </div>
                        </div>
                        {conversation.unread && (
                          <span className="absolute top-0 right-0 h-3 w-3 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-900">{conversation.specialistName}</h3>
                        <span className="text-gray-700 text-xs">{conversation.lastMessageDate}</span>
                      </div>
                      <p className="text-gray-900 text-sm">{conversation.specialistRole}</p>
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
              <p className="text-gray-900 mb-4">У вас пока нет сообщений от специалистов</p>
              <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition inline-block">
                Найти специалистов
              </Link>
            </div>
          )}
        </div>
      )}
      
      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">История заказов</h2>
            <p className="text-gray-900 text-sm">Все ваши заказы и их статусы</p>
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
                      Специалист и услуга
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
                          <span className="font-medium">{order.specialistName}</span>
                          <p className="text-xs text-gray-700">{order.specialistRole}</p>
                          <p className="text-sm mt-1 text-gray-900">{order.service}</p>
                        </div>
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
                        {order.status !== 'Завершен' ? (
                          <button className="text-blue-600 hover:text-blue-800 mr-4">
                            Отменить
                          </button>
                        ) : (
                          <button className="text-blue-600 hover:text-blue-800 mr-4">
                            Оставить отзыв
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-800">
                          Подробнее
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-900 mb-4">У вас пока нет заказов</p>
              <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition inline-block">
                Найти специалистов
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ClientProfile() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ClientProfileContent />
    </Suspense>
  );
}