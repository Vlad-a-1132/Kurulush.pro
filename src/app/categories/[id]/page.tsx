import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { categories } from '@/data/categories';
import MasterCard from '@/components/MasterCard';
import { Master } from '@/types';

// Примеры мастеров для каждой категории
const mastersByCategory: Record<string, Master[]> = {
  'repair': [
    {
      id: 1,
      name: 'Азамат Кузнецов',
      avatar: '/avatars/masters/master1.jpg',
      title: 'Мастер ремонта и строительства',
      status: 'online',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.9,
      reviewCount: 127,
      qualifications: ['Ремонт квартир под ключ', 'Отделочные работы', 'Электромонтаж'],
      services: [
        { id: 1, name: 'Ремонт под ключ', price: 5000, unit: 'м²' },
        { id: 2, name: 'Косметический ремонт', price: 2500, unit: 'м²' },
        { id: 3, name: 'Монтаж потолков', price: 450, unit: 'м²' }
      ]
    },
    {
      id: 2,
      name: 'Чынгыз Бакиров',
      avatar: '/avatars/masters/master2.jpg',
      title: 'Строитель, отделочник',
      status: 'offline',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.7,
      reviewCount: 85,
      qualifications: ['Строительство домов', 'Капитальный ремонт', 'Демонтажные работы']
    }
  ],
  'finishing': [
    {
      id: 3,
      name: 'Данияр Алиев',
      avatar: '/avatars/masters/master3.jpg',
      title: 'Мастер отделочных работ',
      status: 'online',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.8,
      reviewCount: 93,
      qualifications: ['Штукатурка', 'Покраска', 'Поклейка обоев']
    }
  ],
  'electrical': [
    {
      id: 4,
      name: 'Максат Исаев',
      avatar: '/avatars/masters/master4.jpg',
      title: 'Электрик',
      status: 'online',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.9,
      reviewCount: 112,
      qualifications: ['Монтаж электропроводки', 'Установка электрооборудования', 'Диагностика неисправностей']
    }
  ],
  'plumbing': [
    {
      id: 5,
      name: 'Тимур Ахметов',
      avatar: '/avatars/masters/master5.jpg',
      title: 'Сантехник',
      status: 'offline',
      isVerified: true,
      hasGuarantee: false,
      rating: 4.6,
      reviewCount: 78,
      qualifications: ['Установка сантехники', 'Монтаж отопления', 'Водоснабжение и канализация']
    }
  ],
  'design': [
    {
      id: 6,
      name: 'Айгуль Мамедова',
      avatar: '/avatars/masters/master6.jpg',
      title: 'Дизайнер интерьера',
      status: 'online',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.8,
      reviewCount: 64,
      qualifications: ['3D-визуализация', 'Разработка дизайн-проекта', 'Подбор материалов']
    }
  ],
  'roof': [
    {
      id: 7,
      name: 'Нурлан Садыков',
      avatar: '/avatars/masters/master7.jpg',
      title: 'Кровельщик',
      status: 'offline',
      isVerified: true,
      hasGuarantee: true,
      rating: 4.7,
      reviewCount: 52,
      qualifications: ['Монтаж кровли', 'Ремонт кровли', 'Гидроизоляция']
    }
  ]
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const category = categories.find(cat => cat.id === params.id);
  
  if (!category) {
    return {
      title: 'Категория не найдена - ПрофиСервис',
      description: 'Запрашиваемая категория услуг не найдена',
    };
  }

  return {
    title: `${category.name} - ПрофиСервис`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categories.find(cat => cat.id === params.id);
  
  if (!category) {
    notFound();
  }
  
  const masters = mastersByCategory[category.id] || [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6">
        <Link href="/categories" className="text-gray-700 hover:text-black flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Вернуться к категориям
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-4xl">{category.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">{category.name}</h1>
            <p className="text-gray-700">{category.description}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Популярные услуги в этой категории:</h2>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((subcategory) => (
              <Link 
                href={`/masters?specialty=${encodeURIComponent(subcategory)}`}
                key={subcategory}
                className="px-3 py-1 bg-gray-100 text-black rounded-full hover:bg-gray-200 text-sm transition"
              >
                {subcategory}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between">
          <Link 
            href={`/masters?category=${category.id}`}
            className="px-6 py-3 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium btn-yellow"
          >
            Все мастера категории
          </Link>
          <Link 
            href="/create-task"
            className="px-6 py-3 border border-black text-black rounded-md hover:bg-gray-100 transition btn-outline"
          >
            Создать задание
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Мастера в категории {category.name}</h2>

      {masters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masters.map((master) => (
            <MasterCard key={master.id} master={master} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Мастера не найдены</h2>
          <p className="text-gray-600 mb-4">
            В данной категории пока нет доступных мастеров. Попробуйте создать задание, чтобы найти специалиста.
          </p>
          <Link
            href="/create-task"
            className="px-6 py-3 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium inline-block btn-yellow"
          >
            Создать задание
          </Link>
        </div>
      )}

      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">Нужен мастер по {category.name.toLowerCase()}?</h2>
        <p className="text-gray-700 mb-4">
          Разместите задание на нашей платформе и получите предложения от проверенных специалистов. 
          Выбирайте лучшие предложения по цене и отзывам!
        </p>
        <Link
          href="/create-task"
          className="px-6 py-3 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium inline-block btn-yellow"
        >
          Разместить задание
        </Link>
      </div>
    </div>
  );
} 