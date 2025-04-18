'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import { Master } from '@/types';

// Mock master data
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

// Message type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'master';
  timestamp: Date;
  read: boolean;
}

// Mock initial messages
const initialChats: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      text: 'Здравствуйте! Я хотел бы узнать, сможете ли вы помочь с заменой смесителя в ванной?',
      sender: 'user',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true
    },
    {
      id: '2',
      text: 'Добрый день! Да, конечно, я могу помочь с заменой смесителя. Какая модель смесителя у вас?',
      sender: 'master',
      timestamp: new Date(Date.now() - 82800000), // 23 hours ago
      read: true
    },
    {
      id: '3',
      text: 'У меня модель Grohe Eurosmart.',
      sender: 'user',
      timestamp: new Date(Date.now() - 79200000), // 22 hours ago
      read: true
    },
    {
      id: '4',
      text: 'Отлично, я знаком с этой моделью. Когда вам было бы удобно, чтобы я приехал?',
      sender: 'master',
      timestamp: new Date(Date.now() - 75600000), // 21 hours ago
      read: true
    }
  ],
  '2': [
    {
      id: '1',
      text: 'Здравствуйте! Мне нужна консультация по дизайну гостиной. Можете помочь?',
      sender: 'user',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      read: true
    },
    {
      id: '2',
      text: 'Добрый день! Конечно, я с удовольствием проконсультирую вас по дизайну гостиной. Какая площадь помещения и какой стиль вас интересует?',
      sender: 'master',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: true
    }
  ],
  '3': []
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const masterId = searchParams.get('master') || '1';
  const master = mastersData[masterId];
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading chat history
    setIsLoading(true);
    setTimeout(() => {
      setMessages(initialChats[masterId] || []);
      setIsLoading(false);
    }, 500);
  }, [masterId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      read: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate master response
    setTimeout(() => {
      const masterResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Спасибо за сообщение! Я отвечу вам в ближайшее время.`,
        sender: 'master',
        timestamp: new Date(),
        read: false
      };
      
      setMessages(prev => [...prev, masterResponse]);
    }, 1500);
  };

  // Function to format date
  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (messageDay.getTime() === today.getTime()) {
      return 'Сегодня';
    } else if (messageDay.getTime() === yesterday.getTime()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  };
  
  // Function to format time
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  
  messages.forEach(msg => {
    const dateStr = formatMessageDate(msg.timestamp);
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    
    if (lastGroup && lastGroup.date === dateStr) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({ date: dateStr, messages: [msg] });
    }
  });

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
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href={`/masters/${masterId}`} className="text-gray-700 hover:text-black flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться к профилю мастера
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-200 flex items-center">
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
              <h2 className="font-bold text-lg">
                {master.name}
                {master.isVerified && (
                  <svg className="w-4 h-4 text-yandex-yellow inline-block ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                )}
              </h2>
              <p className="text-gray-600 text-sm">{master.title} • {master.status === 'online' ? 'Онлайн' : 'Офлайн'}</p>
            </div>
            <Link 
              href={`/propose-task/${masterId}`}
              className="ml-auto bg-yandex-yellow text-black px-4 py-2 rounded-md font-medium text-sm btn-yellow hover:bg-yandex-yellow-hover"
            >
              Предложить задание
            </Link>
          </div>

          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : groupedMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-gray-500 mb-2">У вас пока нет сообщений с этим мастером</p>
                <p className="text-gray-400 text-sm">Напишите сообщение, чтобы начать общение</p>
              </div>
            ) : (
              groupedMessages.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-4">
                  <div className="text-center mb-2">
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {group.date}
                    </span>
                  </div>
                  {group.messages.map((msg, msgIndex) => (
                    <div 
                      key={msg.id} 
                      className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'master' && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden flex-shrink-0">
                          <SafeImage
                            src={master.avatar}
                            alt={master.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                            fallbackText={getInitials(master.name)}
                          />
                        </div>
                      )}
                      
                      <div 
                        className={`max-w-[75%] px-4 py-2 rounded-lg ${
                          msg.sender === 'user' 
                            ? 'bg-yandex-yellow bg-opacity-20 text-black' 
                            : 'bg-white border border-gray-200 text-black'
                        }`}
                      >
                        <div className="text-sm mb-1">{msg.text}</div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">
                            {formatMessageTime(msg.timestamp)}
                            {msg.sender === 'user' && (
                              <span className="ml-1">
                                {msg.read ? (
                                  <svg className="w-3 h-3 inline-block text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z"></path>
                                  </svg>
                                ) : (
                                  <svg className="w-3 h-3 inline-block text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z"></path>
                                  </svg>
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      
                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 ml-2 overflow-hidden flex-shrink-0">
                          <div className="w-full h-full flex items-center justify-center font-bold text-black bg-gray-100">
                            В
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напишите сообщение..."
                  className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
              </div>
              <button
                type="submit"
                className="ml-2 bg-yandex-yellow text-black p-3 rounded-lg hover:bg-yandex-yellow-hover btn-yellow"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 