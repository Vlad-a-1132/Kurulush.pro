'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: 'Как работает ПрофиСервис?',
      answer: 'ПрофиСервис - это платформа, соединяющая клиентов с проверенными специалистами. Вы создаете задачу, описывая что нужно сделать, указываете бюджет и срок, а специалисты предлагают свои услуги. Вы выбираете подходящего исполнителя и платите только после успешного выполнения работы.'
    },
    {
      id: 2,
      question: 'Как создать новую задачу?',
      answer: 'Чтобы создать новую задачу, нажмите на кнопку "Специалисты" на главной странице. Заполните форму с названием задачи, затем следуйте дальнейшим инструкциям для добавления деталей, бюджета и сроков.'
    },
    {
      id: 3,
      question: 'Как выбрать подходящего специалиста?',
      answer: 'После размещения задачи вы получите отклики от специалистов. Изучите их профили, просмотрите рейтинг, отзывы и портфолио. Также обратите внимание на стоимость услуг и сроки выполнения. Выберите специалиста, который наилучшим образом соответствует вашим требованиям.'
    },
    {
      id: 4,
      question: 'Как происходит оплата?',
      answer: 'ПрофиСервис использует безопасную систему оплаты. Деньги замораживаются на вашем счету при заказе услуги и перечисляются специалисту только после того, как вы подтвердите выполнение работы. Это гарантирует защиту как клиента, так и специалиста.'
    },
    {
      id: 5,
      question: 'Что делать, если услуга оказана некачественно?',
      answer: 'Если качество оказанной услуги вас не устраивает, сначала обсудите проблему со специалистом - часто многие вопросы решаются путем диалога. Если договориться не удалось, обратитесь в службу поддержки. Наши специалисты рассмотрят спор и предложат справедливое решение.'
    },
    {
      id: 6,
      question: 'Как стать специалистом на платформе?',
      answer: 'Чтобы стать специалистом, зарегистрируйтесь через "Вход для специалистов", заполните профиль, загрузите портфолио и документы, подтверждающие вашу квалификацию. После проверки модераторами вы сможете откликаться на задачи и получать заказы.'
    }
  ];

  const toggleQuestion = (id: number) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться на главную
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Часто задаваемые вопросы</h1>
        
        <div className="space-y-4">
          {faqData.map((item) => (
            <div 
              key={item.id} 
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50"
                onClick={() => toggleQuestion(item.id)}
              >
                {item.question}
                <svg 
                  className={`w-5 h-5 transition-transform ${expandedQuestion === item.id ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedQuestion === item.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">Не нашли ответ на свой вопрос?</p>
          <Link 
            href="/support" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Написать в поддержку
          </Link>
        </div>
      </div>
    </div>
  );
} 