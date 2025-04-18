'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MastersModal from '@/components/MastersModal';

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
  qualifications?: string[];
  services?: {
    name: string;
    price: number;
    unit: string;
  }[];
  areas?: string[];
};

function CreateTaskContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [taskName, setTaskName] = useState('');
  const [showError, setShowError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublished, setIsPublished] = useState(false);
  const [showMastersModal, setShowMastersModal] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);

  // Предустановленные категории задач
  const taskCategories = [
    'Ремонт и строительство', 'Отделка помещений', 'Электрика', 
    'Сантехника', 'Дизайн интерьера', 'Кровельные работы',
    'Установка смесителя', 'Монтаж проводки', 'Поклейка обоев',
    'Разработка дизайн-проекта', 'Ремонт кровли', 'Стяжка пола'
  ];

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
        { name: 'Герметизация ванны', price: 8000, unit: 'усл.' },
        { name: 'Устранение течи', price: 1500, unit: 'усл.' },
        { name: 'Устранение засоров', price: 6500, unit: 'усл.' }
      ],
      areas: ['Балашиха', 'Котельники', 'Реутов', 'БКЛ', 'Бутовская']
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
        { name: 'Установка розеток/выключателей', price: 750, unit: 'шт.' },
        { name: 'Монтаж люстры', price: 2000, unit: 'шт.' }
      ],
      areas: ['Бишкек', 'Центр', 'Джал', 'Аламедин']
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
        { name: 'Монтаж гипсокартона', price: 850, unit: 'м²' }
      ],
      areas: ['Бишкек', 'Ош', 'Чолпон-Ата']
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
        { name: 'Групповые занятия', price: 800, unit: 'час/чел.' }
      ],
      areas: ['Бишкек', 'Онлайн']
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
        { name: 'Ремонт холодильника', price: 3000, unit: 'усл.' },
        { name: 'Ремонт стиральной машины', price: 3500, unit: 'усл.' },
        { name: 'Диагностика техники', price: 1000, unit: 'усл.' }
      ],
      areas: ['Бишкек', 'Кара-Балта', 'Токмок']
    }
  ];

  // Проверяем, был ли передан специалист через URL-параметры
  useEffect(() => {
    const specialistId = searchParams.get('specialist');
    if (specialistId) {
      const foundMaster = masters.find(m => m.id === parseInt(specialistId));
      if (foundMaster) {
        setSelectedMaster(foundMaster);
      }
    }
  }, [searchParams]);

  const handleContinue = () => {
    if (!taskName || taskName.length < 5) {
      setShowError(true);
      return;
    }
    // Переходим к следующему шагу
    setCurrentStep(currentStep + 1);
    
    // В реальном приложении здесь мы бы навигировали между этапами заполнения задачи
    // Имитируем переходы между этапами для демонстрации
    if (currentStep >= 3) {
      setIsPublished(true);
    }
  };

  const handleCategoryClick = (category: string) => {
    setTaskName(category);
    setShowError(false);
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 1: return '25 %';
      case 2: return '50 %';
      case 3: return '75 %';
      case 4: return '100 %';
      default: return '25 %';
    }
  };

  const getStepName = () => {
    switch (currentStep) {
      case 1: return 'Название задачи';
      case 2: return 'Детали задачи';
      case 3: return 'Бюджет и сроки';
      case 4: return 'Публикация';
      default: return 'Название задачи';
    }
  };

  const handleSelectMaster = (masterId: number) => {
    const master = masters.find(m => m.id === masterId);
    if (master) {
      setSelectedMaster(master);
    }
  };

  const renderStepContent = () => {
    if (isPublished) {
      return (
        <div className="bg-green-50 rounded-lg p-8 text-center border border-green-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Задача успешно опубликована!</h2>
          <p className="text-gray-700 mb-6">
            Ваша задача "{taskName}" уже доступна специалистам. Скоро вы начнете получать отклики.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/client-profile?tab=orders" 
              className="px-6 py-3 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium btn-yellow"
            >
              Перейти к моим задачам
            </Link>
            <Link 
              href="/masters" 
              className="px-6 py-3 border border-black text-black rounded-md hover:bg-gray-100 transition btn-outline"
            >
              Посмотреть мастеров
            </Link>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <>
            {showError && (
              <div className="bg-orange-100 rounded-lg p-4 mb-4">
                <div className="text-orange-800 font-medium">Слишком короткое название</div>
              </div>
            )}
            
            <h1 className="text-3xl font-bold mb-4">Как назвать задачу?</h1>
            
            <p className="text-gray-700 mb-6">
              Название поможет специалистам быстрее понять, что нужно сделать
            </p>
            
            <div className="mb-6">
              <input
                type="text"
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  if (e.target.value.length >= 5) {
                    setShowError(false);
                  }
                }}
                placeholder="Например: Починить протекающий кран"
                className={`w-full p-4 border ${showError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black`}
              />
              {showError && (
                <p className="text-red-500 text-sm mt-1">Пожалуйста, введите название задачи (минимум 5 символов)</p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {taskCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-full text-sm"
                >
                  {category}
                </button>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">Детали задачи</h1>
            
            <p className="text-gray-700 mb-6">
              Опишите подробно, что нужно сделать
            </p>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Описание задачи</label>
              <textarea
                rows={6}
                placeholder="Опишите, что необходимо сделать, укажите детали и особенности..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Категория</label>
              <select className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                <option value="">Выберите категорию</option>
                <option value="repair">Ремонт и строительство</option>
                <option value="finishing">Отделка помещений</option>
                <option value="electrical">Электрика</option>
                <option value="plumbing">Сантехника</option>
                <option value="design">Дизайн интерьера</option>
                <option value="roof">Кровельные работы</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Адрес</label>
              <input
                type="text"
                placeholder="Введите адрес или выберите 'Удаленно'"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-black" />
                  <span className="ml-2 text-gray-700">Удаленная работа</span>
                </label>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">Бюджет и сроки</h1>
            
            <p className="text-gray-700 mb-6">
              Укажите примерный бюджет и когда нужно выполнить задачу
            </p>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Бюджет (сом)</label>
              <input
                type="number"
                placeholder="Укажите сумму"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-black" />
                  <span className="ml-2 text-gray-700">По договоренности</span>
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Срок выполнения</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Дата начала</label>
                  <input
                    type="date"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Дата окончания</label>
                  <input
                    type="date"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-black" />
                  <span className="ml-2 text-gray-700">Срочно (в течение 24 часов)</span>
                </label>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">Проверьте и опубликуйте</h1>
            
            <p className="text-gray-700 mb-6">
              Проверьте данные перед публикацией задачи
            </p>
            
            <div className="mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{taskName}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Описание:</h3>
                  <p className="text-gray-900">Описание будет добавлено после заполнения формы.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700">Категория:</h3>
                  <p className="text-gray-900">Категория будет добавлена после заполнения формы.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700">Адрес:</h3>
                  <p className="text-gray-900">Адрес будет добавлен после заполнения формы.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700">Бюджет:</h3>
                  <p className="text-gray-900">Бюджет будет добавлен после заполнения формы.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700">Срок выполнения:</h3>
                  <p className="text-gray-900">Срок будет добавлен после заполнения формы.</p>
                </div>

                {selectedMaster && (
                  <div>
                    <h3 className="font-medium text-gray-700">Выбранный специалист:</h3>
                    <div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="flex">
                        <div className="mr-3 flex-shrink-0">
                          <div className="relative w-12 h-12">
                            {selectedMaster.avatar ? (
                              <Image 
                                src={selectedMaster.avatar} 
                                alt={selectedMaster.name} 
                                width={48} 
                                height={48} 
                                className="object-cover rounded-full" 
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-gray-600 bg-gray-100">
                                {selectedMaster.name.split(' ')[0].charAt(0) + selectedMaster.name.split(' ')[1].charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-center">
                            <span className={`${selectedMaster.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                              {selectedMaster.status === 'online' ? 'Онлайн' : 'Офлайн'}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center">
                            <h4 className="text-base font-medium text-gray-900 mr-2">{selectedMaster.name}</h4>
                            {selectedMaster.isVerified && (
                              <div className="flex items-center text-gray-600 text-xs mr-2">
                                <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Паспорт проверен
                              </div>
                            )}
                            {selectedMaster.hasGuarantee && (
                              <div className="flex items-center text-gray-600 text-xs">
                                <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Гарантия
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{selectedMaster.title}</p>
                          
                          <div className="mt-2 flex items-center">
                            <span className="text-yellow-500 font-medium text-sm mr-1">{selectedMaster.rating}</span>
                            <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs text-gray-600 ml-1">{selectedMaster.reviewCount} отзывов</span>
                          </div>
                          
                          {/* Квалификация */}
                          {selectedMaster.qualifications && selectedMaster.qualifications.length > 0 && (
                            <div className="mt-2">
                              <div className="flex items-center text-xs text-green-600 mb-1">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Квалификация подтверждена
                              </div>
                              <p className="text-xs text-gray-700">{selectedMaster.qualifications[0]}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button 
                          onClick={() => setShowMastersModal(true)}
                          className="text-gray-700 hover:text-black text-sm"
                        >
                          Изменить специалиста
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-black" defaultChecked={true} />
                <span className="ml-2 text-gray-700">Я принимаю <Link href="/terms" className="text-gray-700 hover:text-black underline">условия использования</Link> и <Link href="/privacy" className="text-gray-700 hover:text-black underline">политику конфиденциальности</Link>.</span>
              </label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Левая панель */}
          <div className="w-full md:w-1/4">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Задача</span>
                <span className="text-sm text-gray-500">Заполнена на {getStepProgress()}</span>
              </div>
              
              {!isPublished && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yandex-yellow h-2 rounded-full" 
                      style={{ width: getStepProgress() }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {!isPublished && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${currentStep >= 1 ? 'bg-yandex-yellow text-black' : 'bg-gray-200 text-gray-500'}`}>
                      {currentStep > 1 ? '✓' : '1'}
                    </div>
                    <span className={currentStep === 1 ? 'font-medium' : ''}>Название задачи</span>
                  </li>
                  <li className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${currentStep >= 2 ? 'bg-yandex-yellow text-black' : 'bg-gray-200 text-gray-500'}`}>
                      {currentStep > 2 ? '✓' : '2'}
                    </div>
                    <span className={currentStep === 2 ? 'font-medium' : ''}>Детали задачи</span>
                  </li>
                  <li className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${currentStep >= 3 ? 'bg-yandex-yellow text-black' : 'bg-gray-200 text-gray-500'}`}>
                      {currentStep > 3 ? '✓' : '3'}
                    </div>
                    <span className={currentStep === 3 ? 'font-medium' : ''}>Бюджет и сроки</span>
                  </li>
                  <li className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${currentStep >= 4 ? 'bg-yandex-yellow text-black' : 'bg-gray-200 text-gray-500'}`}>
                      {currentStep > 4 ? '✓' : '4'}
                    </div>
                    <span className={currentStep === 4 ? 'font-medium' : ''}>Публикация</span>
                  </li>
                </ul>
              </div>
            )}
            
            <div className="mb-4">
              <div className="font-medium mb-2">Поддержка</div>
              <Link href="/faq" className="text-gray-700 hover:text-black block mb-2">Часто задаваемые вопросы</Link>
              <Link href="/support" className="text-gray-700 hover:text-black block">Написать в поддержку</Link>
            </div>
            
            <div className="mb-4">
              <button 
                onClick={() => setShowMastersModal(true)}
                className="w-full bg-white border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition text-left"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Специалисты</span>
                  <span className="text-gray-500">{masters.length}</span>
                </div>
                {selectedMaster ? (
                  <div className="mt-3">
                    <div className="flex items-start">
                      <div className="mr-3 flex-shrink-0">
                        <div className="relative w-12 h-12">
                          {selectedMaster.avatar ? (
                            <Image 
                              src={selectedMaster.avatar} 
                              alt={selectedMaster.name} 
                              width={48} 
                              height={48} 
                              className="object-cover rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-gray-600 bg-gray-100">
                              {selectedMaster.name.split(' ')[0].charAt(0) + selectedMaster.name.split(' ')[1].charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="mt-1 text-xs text-center">
                          <span className={`${selectedMaster.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                            {selectedMaster.status === 'online' ? 'Онлайн' : 'Офлайн'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900">{selectedMaster.name}</h3>
                        <p className="text-sm text-gray-700">{selectedMaster.title}</p>
                        
                        <div className="flex items-center mt-1 space-x-3">
                          {selectedMaster.isVerified && (
                            <div className="flex items-center text-gray-600 text-xs">
                              <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              Паспорт проверен
                            </div>
                          )}
                          {selectedMaster.hasGuarantee && (
                            <div className="flex items-center text-gray-600 text-xs">
                              <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Гарантия
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-2 flex items-center">
                          <span className="text-yellow-500 font-medium text-sm mr-1">{selectedMaster.rating}</span>
                          <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-gray-600 ml-1">{selectedMaster.reviewCount} отзывов</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <p className="text-gray-700 mb-1">Выберите специалиста для выполнения задачи</p>
                    <div className="flex overflow-hidden">
                      {masters.slice(0, 5).map((master, index) => (
                        <div 
                          key={master.id} 
                          className={`w-8 h-8 rounded-full overflow-hidden ${index > 0 ? '-ml-2' : ''} border-2 border-white`}
                        >
                          {master.avatar ? (
                            <Image 
                              src={master.avatar} 
                              alt={master.name} 
                              width={32} 
                              height={32} 
                              className="object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-600 bg-gray-100">
                              {master.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      ))}
                      {masters.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 -ml-2 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +{masters.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
          
          {/* Правая панель */}
          <div className="w-full md:w-3/4">
            {renderStepContent()}
            
            {!isPublished && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="px-6 py-3 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium btn-yellow"
                >
                  Продолжить
                </button>
                <Link
                  href="/job-board"
                  className="px-6 py-3 border border-black text-black rounded-md hover:bg-gray-100 transition text-center btn-outline"
                >
                  Отмена
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно со списком мастеров */}
      <MastersModal 
        isOpen={showMastersModal} 
        onClose={() => setShowMastersModal(false)} 
        onSelectMaster={handleSelectMaster}
        selectedMasterId={selectedMaster?.id}
      />
    </div>
  );
}

export default function CreateTask() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CreateTaskContent />
    </Suspense>
  );
} 