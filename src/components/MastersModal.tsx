'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MastersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMaster?: (masterId: number) => void;
  selectedMasterId?: number;
}

// Категории специалистов
const specialties = [
  'Все специальности',
  'Сантехник',
  'Электрик',
  'Маникюр',
  'Парикмахер',
  'Массажист',
  'Косметолог',
  'Программист',
  'Дизайнер',
  'Репетитор',
  'Клинер'
];

type Service = {
  name: string;
  price: number;
  unit: string;
};

type Review = {
  id: number;
  author: string;
  date: string;
  rating: number;
  text: string;
};

// Тип для мастеров
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
  qualifications: string[];
  areas?: string[];
  services: Service[];
  reviews: Review[];
};

// Моковые данные мастеров
const masters: Master[] = [
  // Мастера по ремонту
  {
    id: 1,
    name: 'Чынгыз Базарбаев',
    avatar: '/avatars/avatar-1.jpg',
    title: 'Сантехник',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.8,
    reviewCount: 56,
    qualifications: ['Сертифицированный сантехник', '10 лет опыта', 'Гарантия на работы'],
    areas: ['Бишкек', 'Чуйская область'],
    services: [
      { name: 'Установка смесителя', price: 1000, unit: 'шт' },
      { name: 'Замена труб', price: 2500, unit: 'точка' },
      { name: 'Установка унитаза', price: 2000, unit: 'шт' },
      { name: 'Прочистка канализации', price: 1500, unit: 'услуга' },
      { name: 'Установка ванны', price: 3500, unit: 'шт' }
    ],
    reviews: [
      { id: 1, author: 'Алмаз К.', date: '15.04.2025', rating: 5, text: 'Отличный мастер! Быстро установил смеситель.' },
      { id: 2, author: 'Гульнара М.', date: '12.04.2025', rating: 4, text: 'Хорошая работа по замене труб.' },
      { id: 3, author: 'Бакыт Д.', date: '10.04.2025', rating: 5, text: 'Установил ванну, все сделал аккуратно.' }
    ]
  },
  {
    id: 2,
    name: 'Азамат Жумабеков',
    avatar: '/avatars/avatar-2.jpg',
    title: 'Электрик',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 78,
    qualifications: ['Сертифицированный электрик', '8 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Замена проводки', price: 2000, unit: 'точка' },
      { name: 'Установка розеток', price: 500, unit: 'шт' },
      { name: 'Монтаж люстры', price: 1000, unit: 'шт' },
      { name: 'Диагностика', price: 1000, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Нурлан Т.', date: '14.04.2025', rating: 5, text: 'Быстро заменил проводку.' },
      { id: 2, author: 'Айгуль М.', date: '11.04.2025', rating: 5, text: 'Отличная работа!' }
    ]
  },
  {
    id: 3,
    name: 'Нурлан Сыдыков',
    avatar: '/avatars/avatar-3.jpg',
    title: 'Мастер отделочных работ',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.7,
    reviewCount: 93,
    qualifications: ['Специалист по отделке', '15 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Поклейка обоев', price: 350, unit: 'м²' },
      { name: 'Шпаклевка стен', price: 400, unit: 'м²' },
      { name: 'Покраска стен', price: 300, unit: 'м²' }
    ],
    reviews: [
      { id: 1, author: 'Айбек М.', date: '13.04.2025', rating: 5, text: 'Отлично выполнил работу!' },
      { id: 2, author: 'Динара С.', date: '10.04.2025', rating: 4, text: 'Качественная работа.' }
    ]
  },
  // ... добавьте остальных мастеров по ремонту ...

  // Мастера красоты
  {
    id: 16,
    name: 'Айгуль Алиева',
    avatar: '/avatars/avatar-16.jpg',
    title: 'Мастер маникюра',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 124,
    qualifications: ['Сертифицированный мастер', '5 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Маникюр классический', price: 800, unit: 'услуга' },
      { name: 'Маникюр аппаратный', price: 1000, unit: 'услуга' },
      { name: 'Покрытие гель-лак', price: 600, unit: 'услуга' },
      { name: 'Дизайн ногтей', price: 200, unit: 'ноготь' }
    ],
    reviews: [
      { id: 1, author: 'Мээрим А.', date: '14.04.2025', rating: 5, text: 'Лучший мастер маникюра!' },
      { id: 2, author: 'Салтанат К.', date: '12.04.2025', rating: 5, text: 'Очень аккуратная работа.' }
    ]
  },
  {
    id: 17,
    name: 'Жылдыз Бакирова',
    avatar: '/avatars/avatar-17.jpg',
    title: 'Парикмахер-стилист',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.85,
    reviewCount: 167,
    qualifications: ['Сертифицированный стилист', '7 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Женская стрижка', price: 1000, unit: 'услуга' },
      { name: 'Окрашивание', price: 3000, unit: 'услуга' },
      { name: 'Укладка', price: 800, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Айгерим К.', date: '14.04.2025', rating: 5, text: 'Прекрасный мастер!' },
      { id: 2, author: 'Нургуль М.', date: '11.04.2025', rating: 5, text: 'Очень довольна результатом.' }
    ]
  },
  // ... добавьте остальных мастеров красоты ...

  // Репетиторы
  {
    id: 31,
    name: 'Данияр Асанов',
    avatar: '/avatars/avatar-31.jpg',
    title: 'Репетитор по математике',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.95,
    reviewCount: 89,
    qualifications: ['Кандидат физико-математических наук', '12 лет опыта'],
    areas: ['Бишкек', 'Онлайн'],
    services: [
      { name: 'Подготовка к ОРТ', price: 800, unit: 'час' },
      { name: 'Школьная программа', price: 600, unit: 'час' },
      { name: 'Высшая математика', price: 1000, unit: 'час' }
    ],
    reviews: [
      { id: 1, author: 'Эрмек К.', date: '13.04.2025', rating: 5, text: 'Отличный преподаватель!' },
      { id: 2, author: 'Айдай М.', date: '10.04.2025', rating: 5, text: 'Очень доступно объясняет.' }
    ]
  },
  {
    id: 32,
    name: 'Айгерим Сатыбалдиева',
    avatar: '/avatars/avatar-32.jpg',
    title: 'Репетитор по английскому',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 145,
    qualifications: ['Магистр лингвистики', '8 лет опыта'],
    areas: ['Бишкек', 'Онлайн'],
    services: [
      { name: 'Разговорный английский', price: 700, unit: 'час' },
      { name: 'Подготовка к IELTS', price: 1000, unit: 'час' },
      { name: 'Бизнес английский', price: 900, unit: 'час' }
    ],
    reviews: [
      { id: 1, author: 'Бермет А.', date: '15.04.2025', rating: 5, text: 'Отличный преподаватель!' },
      { id: 2, author: 'Чынгыз К.', date: '12.04.2025', rating: 5, text: 'Помогла подготовиться к IELTS.' }
    ]
  },
  // ... добавьте остальных репетиторов ...

  // IT-специалисты
  {
    id: 46,
    name: 'Бакыт Жолдошев',
    avatar: '/avatars/avatar-46.jpg',
    title: 'Программист',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.85,
    reviewCount: 42,
    qualifications: ['Full-stack разработчик', '6 лет опыта'],
    areas: ['Бишкек', 'Удаленно'],
    services: [
      { name: 'Создание сайта', price: 20000, unit: 'проект' },
      { name: 'Доработка сайта', price: 1000, unit: 'час' },
      { name: 'Консультация', price: 1500, unit: 'час' }
    ],
    reviews: [
      { id: 1, author: 'Тимур С.', date: '12.04.2025', rating: 5, text: 'Отличный специалист!' },
      { id: 2, author: 'Жылдыз А.', date: '09.04.2025', rating: 4, text: 'Хорошая работа.' }
    ]
  },
  {
    id: 47,
    name: 'Эрлан Жумабаев',
    avatar: '/avatars/avatar-47.jpg',
    title: 'Системный администратор',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.8,
    reviewCount: 78,
    qualifications: ['Сертифицированный специалист', '5 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Настройка сети', price: 2000, unit: 'услуга' },
      { name: 'Установка ПО', price: 1000, unit: 'услуга' },
      { name: 'Удаление вирусов', price: 1500, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Марат К.', date: '14.04.2025', rating: 5, text: 'Быстро решил проблему!' },
      { id: 2, author: 'Айнура С.', date: '11.04.2025', rating: 5, text: 'Профессиональный подход.' }
    ]
  },
  // ... добавьте остальных IT-специалистов ...

  // Клининг
  {
    id: 61,
    name: 'Айнура Токтосунова',
    avatar: '/avatars/avatar-61.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.75,
    reviewCount: 156,
    qualifications: ['Профессиональный клинер', '4 года опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 4000, unit: 'услуга' },
      { name: 'Поддерживающая уборка', price: 2500, unit: 'услуга' },
      { name: 'Мытье окон', price: 300, unit: 'м²' }
    ],
    reviews: [
      { id: 1, author: 'Назгуль К.', date: '15.04.2025', rating: 5, text: 'Очень чисто убрала!' },
      { id: 2, author: 'Максат О.', date: '11.04.2025', rating: 4, text: 'Хорошая работа.' }
    ]
  },
  {
    id: 62,
    name: 'Гульмира Асанова',
    avatar: '/avatars/avatar-62.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.7,
    reviewCount: 112,
    qualifications: ['Профессиональный клинер', '3 года опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Уборка квартир', price: 3000, unit: 'услуга' },
      { name: 'Химчистка мебели', price: 1500, unit: 'место' },
      { name: 'Уборка после ремонта', price: 5000, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Айжан Т.', date: '15.04.2025', rating: 5, text: 'Отличная уборка!' },
      { id: 2, author: 'Бакыт М.', date: '12.04.2025', rating: 4, text: 'Хорошая работа.' }
    ]
  },
  // ... добавьте остальных клинеров ...

  // Добавляем оставшихся мастеров по ремонту (4-15)
  {
    id: 4,
    name: 'Максат Алиев',
    avatar: '/avatars/avatar-4.jpg',
    title: 'Электрик',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 82,
    qualifications: ['Сертифицированный электрик', '7 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Замена проводки', price: 2000, unit: 'точка' },
      { name: 'Установка люстры', price: 1000, unit: 'шт' }
    ],
    reviews: [
      { id: 1, author: 'Эрмек Т.', date: '14.04.2025', rating: 5, text: 'Отличная работа!' }
    ]
  },
  {
    id: 5,
    name: 'Тимур Касымов',
    avatar: '/avatars/avatar-5.jpg',
    title: 'Плиточник',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.8,
    reviewCount: 64,
    qualifications: ['Мастер по укладке плитки', '9 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Укладка плитки', price: 800, unit: 'м²' },
      { name: 'Затирка швов', price: 200, unit: 'м²' }
    ],
    reviews: [
      { id: 1, author: 'Айбек Н.', date: '13.04.2025', rating: 5, text: 'Качественная работа!' }
    ]
  },
  // ... добавьте мастеров с id 6-15

  // Добавляем оставшихся мастеров красоты (18-30)
  {
    id: 18,
    name: 'Салтанат Мамбетова',
    avatar: '/avatars/avatar-18.jpg',
    title: 'Визажист',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.95,
    reviewCount: 138,
    qualifications: ['Профессиональный визажист', '6 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Дневной макияж', price: 2000, unit: 'услуга' },
      { name: 'Свадебный макияж', price: 4000, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Мээрим К.', date: '15.04.2025', rating: 5, text: 'Превосходный макияж!' }
    ]
  },
  // ... добавьте мастеров с id 19-30

  // Добавляем оставшихся репетиторов (33-45)
  {
    id: 33,
    name: 'Бакыт Асанов',
    avatar: '/avatars/avatar-33.jpg',
    title: 'Репетитор по физике',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.85,
    reviewCount: 92,
    qualifications: ['Кандидат физ-мат наук', '10 лет опыта'],
    areas: ['Бишкек', 'Онлайн'],
    services: [
      { name: 'Подготовка к ОРТ', price: 800, unit: 'час' },
      { name: 'Школьная программа', price: 600, unit: 'час' }
    ],
    reviews: [
      { id: 1, author: 'Азамат К.', date: '14.04.2025', rating: 5, text: 'Отличный преподаватель!' }
    ]
  },
  // ... добавьте репетиторов с id 34-45

  // Добавляем оставшихся IT-специалистов (48-60)
  {
    id: 48,
    name: 'Айдар Токтогулов',
    avatar: '/avatars/avatar-48.jpg',
    title: 'Web-разработчик',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 73,
    qualifications: ['Full-stack разработчик', '5 лет опыта'],
    areas: ['Бишкек', 'Удаленно'],
    services: [
      { name: 'Создание сайта', price: 25000, unit: 'проект' },
      { name: 'Доработка функционала', price: 1200, unit: 'час' }
    ],
    reviews: [
      { id: 1, author: 'Нурлан М.', date: '13.04.2025', rating: 5, text: 'Отличный специалист!' }
    ]
  },
  // ... добавьте IT-специалистов с id 49-60

  // Добавляем оставшихся клинеров (63-75)
  {
    id: 63,
    name: 'Назгуль Жумабаева',
    avatar: '/avatars/avatar-63.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.8,
    reviewCount: 94,
    qualifications: ['Профессиональный клинер', '5 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 3500, unit: 'услуга' },
      { name: 'Мытье окон', price: 250, unit: 'м²' }
    ],
    reviews: [
      { id: 1, author: 'Гульмира Т.', date: '15.04.2025', rating: 5, text: 'Очень чисто убрала!' }
    ]
  },
  {
    id: 64,
    name: 'Айнура Сатыбалдиева',
    avatar: '/avatars/avatar-64.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 87,
    qualifications: ['Профессиональный клинер', '4 года опыта'],
    areas: ['Бишкек', 'Чуйская область'],
    services: [
      { name: 'Генеральная уборка', price: 3500, unit: 'услуга' },
      { name: 'Мытье окон', price: 250, unit: 'м²' },
      { name: 'Уборка после ремонта', price: 4500, unit: 'услуга' },
      { name: 'Химчистка мебели', price: 800, unit: 'место' },
      { name: 'Уборка офиса', price: 2500, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Эльмира К.', date: '14.04.2025', rating: 5, text: 'Отличная работа, все чисто!' },
      { id: 2, author: 'Максат Б.', date: '10.04.2025', rating: 5, text: 'Рекомендую!' }
    ]
  },
  {
    id: 65,
    name: 'Жылдыз Асанова',
    avatar: '/avatars/avatar-65.jpg',
    title: 'Клинер',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.7,
    reviewCount: 65,
    qualifications: ['Профессиональный клинер', '3 года опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 3000, unit: 'услуга' },
      { name: 'Мытье окон', price: 200, unit: 'м²' },
      { name: 'Уборка после ремонта', price: 4000, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Нурлан Т.', date: '13.04.2025', rating: 5, text: 'Быстро и качественно!' }
    ]
  },
  {
    id: 66,
    name: 'Бермет Токтосунова',
    avatar: '/avatars/avatar-66.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.8,
    reviewCount: 92,
    qualifications: ['Профессиональный клинер', '6 лет опыта'],
    areas: ['Бишкек', 'Чуйская область'],
    services: [
      { name: 'Генеральная уборка', price: 3800, unit: 'услуга' },
      { name: 'Мытье окон', price: 300, unit: 'м²' },
      { name: 'Химчистка ковров', price: 350, unit: 'м²' }
    ],
    reviews: [
      { id: 1, author: 'Айдай М.', date: '12.04.2025', rating: 5, text: 'Превосходная работа!' }
    ]
  },
  {
    id: 67,
    name: 'Гулназ Эшматова',
    avatar: '/avatars/avatar-67.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.6,
    reviewCount: 78,
    qualifications: ['Профессиональный клинер', '4 года опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 3200, unit: 'услуга' },
      { name: 'Мытье окон', price: 220, unit: 'м²' },
      { name: 'Уборка офиса', price: 2800, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Азамат К.', date: '11.04.2025', rating: 5, text: 'Отличный сервис!' }
    ]
  },
  {
    id: 68,
    name: 'Айпери Маматова',
    avatar: '/avatars/avatar-68.jpg',
    title: 'Клинер',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 84,
    qualifications: ['Профессиональный клинер', '5 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 3600, unit: 'услуга' },
      { name: 'Мытье окон', price: 280, unit: 'м²' },
      { name: 'Химчистка мебели', price: 750, unit: 'место' }
    ],
    reviews: [
      { id: 1, author: 'Бактыгуль Н.', date: '10.04.2025', rating: 5, text: 'Всё отлично!' }
    ]
  },
  {
    id: 69,
    name: 'Нуржан Кадырбекова',
    avatar: '/avatars/avatar-69.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.7,
    reviewCount: 71,
    qualifications: ['Профессиональный клинер', '3 года опыта'],
    areas: ['Бишкек', 'Чуйская область'],
    services: [
      { name: 'Генеральная уборка', price: 3400, unit: 'услуга' },
      { name: 'Мытье окон', price: 240, unit: 'м²' },
      { name: 'Уборка после ремонта', price: 4200, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Чынара А.', date: '09.04.2025', rating: 5, text: 'Рекомендую всем!' }
    ]
  },
  {
    id: 70,
    name: 'Салтанат Жумагулова',
    avatar: '/avatars/avatar-70.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.8,
    reviewCount: 89,
    qualifications: ['Профессиональный клинер', '5 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 3700, unit: 'услуга' },
      { name: 'Мытье окон', price: 270, unit: 'м²' },
      { name: 'Химчистка ковров', price: 380, unit: 'м²' }
    ],
    reviews: [
      { id: 1, author: 'Мирлан Б.', date: '08.04.2025', rating: 5, text: 'Качественная работа!' }
    ]
  },
  {
    id: 71,
    name: 'Айжан Токтогулова',
    avatar: '/avatars/avatar-71.jpg',
    title: 'Клинер',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.6,
    reviewCount: 76,
    qualifications: ['Профессиональный клинер', '4 года опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 3300, unit: 'услуга' },
      { name: 'Мытье окон', price: 230, unit: 'м²' },
      { name: 'Уборка офиса', price: 2900, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Эрмек К.', date: '07.04.2025', rating: 5, text: 'Всем советую!' }
    ]
  },
  {
    id: 72,
    name: 'Мээрим Сыдыкова',
    avatar: '/avatars/avatar-72.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 95,
    qualifications: ['Профессиональный клинер', '6 лет опыта'],
    areas: ['Бишкек', 'Чуйская область'],
    services: [
      { name: 'Генеральная уборка', price: 3900, unit: 'услуга' },
      { name: 'Мытье окон', price: 290, unit: 'м²' },
      { name: 'Химчистка мебели', price: 850, unit: 'место' }
    ],
    reviews: [
      { id: 1, author: 'Айгуль Т.', date: '06.04.2025', rating: 5, text: 'Профессиональный подход!' }
    ]
  },
  {
    id: 73,
    name: 'Нургуль Алымкулова',
    avatar: '/avatars/avatar-73.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.7,
    reviewCount: 82,
    qualifications: ['Профессиональный клинер', '4 года опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 3400, unit: 'услуга' },
      { name: 'Мытье окон', price: 250, unit: 'м²' },
      { name: 'Уборка после ремонта', price: 4300, unit: 'услуга' }
    ],
    reviews: [
      { id: 1, author: 'Жаныш М.', date: '05.04.2025', rating: 5, text: 'Отличный сервис!' }
    ]
  },
  {
    id: 74,
    name: 'Асель Токтобекова',
    avatar: '/avatars/avatar-74.jpg',
    title: 'Клинер',
    status: 'offline',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.8,
    reviewCount: 88,
    qualifications: ['Профессиональный клинер', '5 лет опыта'],
    areas: ['Бишкек'],
    services: [
      { name: 'Генеральная уборка', price: 3600, unit: 'услуга' },
      { name: 'Мытье окон', price: 260, unit: 'м²' },
      { name: 'Химчистка ковров', price: 370, unit: 'м²' }
    ],
    reviews: [
      { id: 1, author: 'Бегимай К.', date: '04.04.2025', rating: 5, text: 'Быстро и качественно!' }
    ]
  },
  {
    id: 75,
    name: 'Динара Жумабаева',
    avatar: '/avatars/avatar-75.jpg',
    title: 'Клинер',
    status: 'online',
    isVerified: true,
    hasGuarantee: true,
    rating: 4.9,
    reviewCount: 91,
    qualifications: ['Профессиональный клинер', '6 лет опыта'],
    areas: ['Бишкек', 'Чуйская область'],
    services: [
      { name: 'Генеральная уборка', price: 3800, unit: 'услуга' },
      { name: 'Мытье окон', price: 280, unit: 'м²' },
      { name: 'Химчистка мебели', price: 800, unit: 'место' }
    ],
    reviews: [
      { id: 1, author: 'Алтынай Н.', date: '03.04.2025', rating: 5, text: 'Превосходная работа!' }
    ]
  }
];

const MastersModal: React.FC<MastersModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectMaster, 
  selectedMasterId 
}) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все специальности');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const toggleServices = (masterId: number) => {
    setExpandedServices(prev => 
      prev.includes(masterId) 
        ? prev.filter(id => id !== masterId)
        : [...prev, masterId]
    );
  };

  const toggleReviews = (masterId: number) => {
    setExpandedReviews(prev => 
      prev.includes(masterId) 
        ? prev.filter(id => id !== masterId)
        : [...prev, masterId]
    );
  };

  // Закрываем модальное окно при клике вне его содержимого
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Запрещаем прокрутку страницы при открытом модальном окне
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Filter masters based on search query and selected specialty
  const filteredMasters = masters.filter(master => {
    const matchesSearch = master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         master.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'Все специальности' || 
                            master.title.toLowerCase() === selectedSpecialty.toLowerCase();
    
    return matchesSearch && matchesSpecialty;
  });

  const handleChatClick = (masterId: number) => {
    router.push(`/conversations/${masterId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div 
        ref={modalRef}
        className="w-full h-full flex flex-col"
      >
        {/* Верхняя панель с заголовком и кнопкой закрытия */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Выберите специалиста</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Боковая панель с фильтрами */}
          <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-gray-200">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full p-3 border-0 focus:outline-none text-sm focus:ring-0"
            >
              {specialties.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Основной контент */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Поиск */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по имени или специальности"
                  className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Список мастеров */}
            <div className="overflow-y-auto flex-1 px-4">
              <div className="max-w-3xl mx-auto">
                {filteredMasters.map(master => (
                  <div 
                    key={master.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 p-4 my-2 rounded-lg ${selectedMasterId === master.id ? 'bg-gray-50 border border-gray-300' : ''}`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Аватар и основная информация */}
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center font-bold text-blue-600 bg-blue-100">
                              {master.name.charAt(0)}
                            </div>
                          </div>
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${master.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg">{master.name}</h3>
                          <p className="text-gray-600">{master.title}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center text-yellow-400">
                              <span>★</span>
                              <span className="ml-1 text-gray-900">{master.rating}</span>
                            </div>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-600">{master.reviewCount} отзывов</span>
                          </div>
                        </div>
                      </div>

                      {/* Услуги и цены */}
                      <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                        <h4 className="font-medium mb-2">Услуги и цены:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {master.services.slice(0, expandedServices.includes(master.id) ? undefined : 4).map((service, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">{service.name}</span>
                              <span className="font-medium">от {service.price} сом/{service.unit}</span>
                            </div>
                          ))}
                        </div>
                        {master.services.length > 4 && (
                          <button 
                            onClick={() => toggleServices(master.id)}
                            className="text-blue-600 text-sm mt-2 hover:underline flex items-center"
                          >
                            {expandedServices.includes(master.id) ? (
                              <>Скрыть<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                            ) : (
                              <>+{master.services.length - 4} услуг<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Отзывы */}
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Последние отзывы:</h4>
                      <div className="space-y-3">
                        {master.reviews.slice(0, expandedReviews.includes(master.id) ? undefined : 2).map((review) => (
                          <div key={review.id} className="text-sm">
                            <div className="flex items-center">
                              <span className="font-medium">{review.author}</span>
                              <span className="mx-2 text-gray-400">•</span>
                              <div className="flex items-center text-yellow-400">
                                <span>★</span>
                                <span className="ml-1 text-gray-900">{review.rating}</span>
                              </div>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{review.text}</p>
                          </div>
                        ))}
                      </div>
                      {master.reviews.length > 2 && (
                        <button 
                          onClick={() => toggleReviews(master.id)}
                          className="text-blue-600 text-sm mt-2 hover:underline flex items-center"
                        >
                          {expandedReviews.includes(master.id) ? (
                            <>Скрыть отзывы<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                          ) : (
                            <>Показать все {master.reviews.length} отзывов<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Кнопка написать */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleChatClick(master.id)}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        Написать
                      </button>
                    </div>
                  </div>
                ))}

                {filteredMasters.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg my-4">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Специалисты не найдены</h3>
                    <p className="text-gray-700 text-sm">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MastersModal; 