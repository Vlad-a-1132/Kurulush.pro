'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import SafeImage from '@/components/SafeImage';
import { Master } from '@/types';

// Отключаем предварительный рендеринг для этой страницы
export const dynamic = 'force-dynamic';

// Компонент загрузки
function TaskFormLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="h-96 flex justify-center items-center">
          <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Компонент для получения параметров URL
function TaskParamsWrapper({ children }: { children: (masterId: string) => React.ReactNode }) {
  const params = useParams();
  const masterId = params?.id as string || '1';
  
  return <>{children(masterId)}</>;
}

// Основной компонент формы задания
function TaskFormContent({ masterId }: { masterId: string }) {
  const [master, setMaster] = useState<Master | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [budget, setBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Загрузка данных о мастере
  useEffect(() => {
    const loadMasterData = () => {
      // Мок данные о мастерах
      const mastersData: Record<string, Master> = {
        '1': {
          id: 1,
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
          qualifications: ['Установка сантехники', 'Ремонт труб', 'Монтаж отопления']
        },
        '2': {
          id: 2,
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
          qualifications: ['Дизайн интерьера', '3D-визуализация', 'Подбор материалов']
        },
        '3': {
          id: 3,
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
          qualifications: ['Монтаж проводки', 'Установка розеток', 'Диагностика неисправностей']
        }
      };

      setMaster(mastersData[masterId] || null);
    };

    loadMasterData();
  }, [masterId]);

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !date || !time || !address) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Clear form
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setAddress('');
      setBudget('');
    }, 1500);
  };

  if (!master) {
    return <TaskFormLoading />;
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href={`/masters/${masterId}`} className="text-gray-700 hover:text-black flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Вернуться к профилю мастера
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Задание успешно отправлено</h2>
            <p className="text-gray-600 mb-6">
              Мастер скоро получит ваше предложение и свяжется с вами. Вы можете отслеживать статус задания в личном кабинете.
            </p>
            <div className="flex justify-center gap-4">
              <Link href={`/masters/${masterId}`} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200">
                Вернуться к профилю мастера
              </Link>
              <Link href="/profile" className="bg-yandex-yellow text-black px-4 py-2 rounded-md font-medium btn-yellow hover:bg-yandex-yellow-hover">
                В личный кабинет
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href={`/masters/${masterId}`} className="text-gray-700 hover:text-black flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться к профилю мастера
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Предложить задание</h1>
            <p className="text-gray-600">Заполните форму, чтобы предложить задание мастеру</p>
          </div>

          <div className="p-6 border-b border-gray-200 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden relative">
              <SafeImage
                src={master.avatar}
                alt={master.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                fallbackText={getInitials(master.name)}
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                master.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}></span>
            </div>
            <div>
              <h2 className="font-bold">
                {master.name}
                {master.isVerified && (
                  <svg className="w-4 h-4 text-yandex-yellow inline-block ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                )}
              </h2>
              <p className="text-sm text-gray-600">{master.title}</p>
            </div>
            <Link 
              href={`/chat?master=${masterId}`}
              className="ml-auto text-gray-600 hover:text-black flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Написать сообщение
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label htmlFor="title" className="block mb-2 font-medium">
                Название задания <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Например: Заменить смеситель в ванной"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 font-medium">
                Описание задания <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black h-32"
                placeholder="Опишите подробно, что нужно сделать. Укажите особенности и требования."
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="date" className="block mb-2 font-medium">
                  Дата <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block mb-2 font-medium">
                  Время <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block mb-2 font-medium">
                Адрес <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Укажите адрес выполнения задания"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="budget" className="block mb-2 font-medium">
                Бюджет (сом)
              </label>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Укажите ваш бюджет (необязательно)"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-yandex-yellow text-black px-6 py-3 rounded-md font-medium btn-yellow hover:bg-yandex-yellow-hover ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправка...
                  </span>
                ) : 'Отправить задание'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Основной компонент страницы
export default function ProposeTaskPage() {
  return (
    <Suspense fallback={<TaskFormLoading />}>
      <TaskParamsWrapper>
        {(masterId) => <TaskFormContent masterId={masterId} />}
      </TaskParamsWrapper>
    </Suspense>
  );
} 