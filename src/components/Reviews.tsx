'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock data for reviews
const allReviews = [
  {
    id: 1,
    name: 'Азамат К.',
    avatar: '/avatars/avatar-1.jpg',
    role: 'Клиент',
    rating: 5,
    text: 'Нашел отличного сантехника через этот сервис. Пришел вовремя, все сделал быстро и качественно. Цены адекватные, все прозрачно. Буду обращаться еще!',
    specialist: 'Чынгыз Б., сантехник',
    date: '15.03.2025',
  },
  {
    id: 2,
    name: 'Айнура Т.',
    avatar: '/avatars/avatar-2.jpg',
    role: 'Клиент',
    rating: 5,
    text: 'Регулярно пользуюсь услугами мастеров маникюра через эту платформу. Очень удобно выбирать по отзывам и портфолио. Последний мастер превзошел все ожидания!',
    specialist: 'Айгуль А., мастер маникюра',
    date: '02.04.2025',
  },
  {
    id: 3,
    name: 'Бакыт Н.',
    avatar: '/avatars/avatar-3.jpg',
    role: 'Клиент',
    rating: 4,
    text: 'Заказывал дизайн логотипа. Фрилансер выполнил работу в срок, внес все правки по моим пожеланиям. За 2000 сомов получил отличный результат. Единственное - хотелось бы больше вариантов на выбор.',
    specialist: 'Айдана М., дизайнер',
    date: '27.03.2025',
  },
  {
    id: 4,
    name: 'Гульнара О.',
    avatar: '/avatars/avatar-4.jpg',
    role: 'Клиент',
    rating: 5,
    text: 'Нашла через сервис репетитора по английскому для сына. За три месяца занятий прогресс колоссальный! Вся организация через платформу: оплата, расписание, материалы. Очень удобно!',
    specialist: 'Данияр К., репетитор по английскому',
    date: '10.04.2025',
  },
  {
    id: 5,
    name: 'Жаныл А.',
    avatar: '/avatars/avatar-5.jpg',
    role: 'Специалист',
    rating: 5,
    text: 'Работаю на платформе уже полгода как косметолог. Постоянный поток клиентов, удобная система бронирования и оплаты. Комиссия адекватная, все честно и прозрачно.',
    date: '05.04.2025',
  },
  {
    id: 6,
    name: 'Эрмек С.',
    avatar: '/avatars/avatar-6.jpg',
    role: 'Клиент',
    rating: 4,
    text: 'Заказывал сборку мебели. Мастер собрал все быстро и качественно за 1500 сомов. Единственное - немного опоздал, но предупредил заранее.',
    specialist: 'Болот Д., сборщик мебели',
    date: '20.03.2025',
  },
];

const Reviews = () => {
  const [activeReviews, setActiveReviews] = useState(allReviews.slice(0, 3));
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(allReviews.length / 3);

  const handleNextPage = () => {
    const nextPage = (currentPage + 1) % totalPages;
    setCurrentPage(nextPage);
    setActiveReviews(allReviews.slice(nextPage * 3, nextPage * 3 + 3));
  };

  const handlePrevPage = () => {
    const prevPage = (currentPage - 1 + totalPages) % totalPages;
    setCurrentPage(prevPage);
    setActiveReviews(allReviews.slice(prevPage * 3, prevPage * 3 + 3));
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Отзывы о нашем сервисе</h2>
        <p className="text-gray-800 text-center mb-10 max-w-2xl mx-auto">
          Более 10,000 клиентов нашли подходящих специалистов на нашей платформе. Вот что они говорят о нас.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {activeReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  {/* Placeholder for avatar */}
                  <div className="w-full h-full flex items-center justify-center font-bold text-blue-600 bg-blue-100">
                    {review.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-800">{review.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg 
                    key={index}
                    className={`w-5 h-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-800 mb-4">{review.text}</p>
              
              {review.specialist && (
                <div className="text-sm text-gray-800 italic">
                  Специалист: {review.specialist}
                </div>
              )}
              
              <div className="text-sm text-gray-700 mt-2">
                {review.date}
              </div>
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handlePrevPage}
              className="px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50 transition"
            >
              ← Предыдущие
            </button>
            <button 
              onClick={handleNextPage}
              className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
            >
              Следующие →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;