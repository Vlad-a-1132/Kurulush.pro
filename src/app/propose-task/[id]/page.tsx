'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
      <div className="max-w-3xl mx-auto flex justify-center items-center h-64">
        <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
  );
}

// Компонент для получения параметров URL
function TaskParamsWrapper({ children }: { children: (masterId: string) => React.ReactNode }) {
  const params = useParams();
  const masterId = params.id as string;
  
  return <>{children(masterId)}</>;
}

// Компонент, содержащий логику формы
function TaskFormContent({ masterId }: { masterId: string }) {
  const router = useRouter();
  
  const [master, setMaster] = useState<Master | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    address: '',
    date: '',
    time: '',
    attachments: [] as File[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Загрузка данных о мастере
  useEffect(() => {
    const loadMasterData = () => {
      setIsLoading(true);
      
      // Mock master data - in a real application, this would come from an API
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

      // Имитация задержки загрузки данных
      setTimeout(() => {
        setMaster(mastersData[masterId] || null);
        setIsLoading(false);
      }, 300);
    };

    loadMasterData();
  }, [masterId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...fileList] }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would send the form data to your API
      console.log('Task proposal submitted:', { masterId, ...formData });
      
      setSuccessMessage('Ваше задание успешно отправлено мастеру!');
      setTimeout(() => {
        router.push(`/masters/${masterId}`);
      }, 2000);
    } catch (error) {
      setErrorMessage('Произошла ошибка при отправке задания. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Рендеринг загрузки
  if (isLoading) {
    return <TaskFormLoading />;
  }

  // Мастер не найден
  if (!master) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Мастер не найден</h1>
          <p className="text-gray-600 mb-6">Извините, запрашиваемый мастер не найден.</p>
          <Link href="/masters" className="btn-yellow px-4 py-2 rounded-md">
            Вернуться к списку мастеров
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
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
            <h1 className="text-2xl font-bold mb-4">Предложить задание</h1>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                <SafeImage
                  src={master.avatar}
                  alt={master.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  fallbackText={getInitials(master.name)}
                />
              </div>
              <div>
                <h2 className="font-bold text-lg">{master.name}</h2>
                <p className="text-gray-600">{master.title}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                {successMessage}
              </div>
            )}
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {errorMessage}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-1 text-gray-700">
                Название задания *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Например: Установка смесителя в ванной"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block font-medium mb-1 text-gray-700">
                Категория *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-white"
              >
                <option value="">Выберите категорию</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1 text-gray-700">
                Описание задания *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Детально опишите, что нужно сделать..."
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="budget" className="block font-medium mb-1 text-gray-700">
                  Бюджет (сом)
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Укажите ваш бюджет"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block font-medium mb-1 text-gray-700">
                  Адрес
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Укажите адрес"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="date" className="block font-medium mb-1 text-gray-700">
                  Дата
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block font-medium mb-1 text-gray-700">
                  Время
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block font-medium mb-1 text-gray-700">
                Прикрепить файлы (фото, документы)
              </label>
              <div className="mt-1 flex items-center">
                <label htmlFor="file-upload" className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition">
                  <span>Выбрать файлы</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="ml-3 text-gray-500 text-sm">До 5 файлов, максимум 10MB каждый</p>
              </div>
              
              {formData.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-yandex-yellow text-black rounded-md font-medium btn-yellow ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-yandex-yellow-hover'
                }`}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить задание'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Основной компонент страницы
export default function ProposeTask() {
  return (
    <Suspense fallback={<TaskFormLoading />}>
      <TaskParamsWrapper>
        {(masterId) => <TaskFormContent masterId={masterId} />}
      </TaskParamsWrapper>
    </Suspense>
  );
} 