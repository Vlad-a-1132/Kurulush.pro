'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data for specific conversation
const mockSpecialist = {
  id: 1,
  name: 'Базарбаев Чынгыз',
  role: 'Сантехник',
  avatar: '/avatars/specialist-1.jpg',
  rating: 4.8,
  online: true,
};

// Mock messages
const initialMessages = [
  {
    id: 1,
    senderId: 'client',
    text: 'Здравствуйте! Мне нужно установить новый смеситель в ванной. Сможете помочь?',
    timestamp: '12.04.2025 10:15',
  },
  {
    id: 2,
    senderId: 'specialist',
    text: 'Добрый день! Да, конечно. Когда вам было бы удобно?',
    timestamp: '12.04.2025 10:20',
  },
  {
    id: 3,
    senderId: 'client',
    text: 'Может быть, завтра во второй половине дня?',
    timestamp: '12.04.2025 10:25',
  },
  {
    id: 4,
    senderId: 'specialist',
    text: 'Завтра после 15:00 подойдет. Какой у вас смеситель - настенный или на стойке?',
    timestamp: '12.04.2025 10:30',
  },
  {
    id: 5,
    senderId: 'client',
    text: 'На стойке. Я купил новый, нужно заменить старый.',
    timestamp: '12.04.2025 10:35',
  },
  {
    id: 6,
    senderId: 'specialist',
    text: 'Хорошо, тогда предлагаю встречу в 16:00. Сообщите, пожалуйста, свой адрес.',
    timestamp: '12.04.2025 10:40',
  },
  {
    id: 7,
    senderId: 'client',
    text: 'Отлично! Адрес: г. Бишкек, ул. Пушкина, д. 10, кв. 42.',
    timestamp: '12.04.2025 10:45',
  },
  {
    id: 8,
    senderId: 'specialist',
    text: 'Записал. Буду у вас завтра в 16:00. Стоимость работы - 1500 сомов. Подходит?',
    timestamp: '12.04.2025 10:50',
  },
  {
    id: 9,
    senderId: 'client',
    text: 'Да, подходит.',
    timestamp: '12.04.2025 10:55',
  },
  {
    id: 10,
    senderId: 'specialist',
    text: 'Добрый день! Когда вам будет удобно, чтобы я приехал для установки смесителя?',
    timestamp: '12.04.2025 14:30',
  },
];

export default function ConversationPage() {
  const router = useRouter();
  const params = useParams();
  const conversationId = params.id;
  
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when they change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add new message to the list
    const newMsg = {
      id: messages.length + 1,
      senderId: 'client',
      text: newMessage.trim(),
      timestamp: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  // Format timestamp to show only the time if the message is from today
  const formatTimestamp = (timestamp: string) => {
    const parts = timestamp.split(' ');
    return parts.length > 1 ? parts[1] : timestamp;
  };

  // Create a new order with this specialist
  const handleCreateOrder = () => {
    alert('В реальном приложении здесь был бы переход к оформлению заказа');
    router.push('/client-profile?tab=orders');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/client-profile?tab=messages" className="text-blue-600 hover:underline flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Назад к сообщениям
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Specialist info header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                {/* Placeholder for specialist avatar */}
                <div className="w-full h-full flex items-center justify-center font-bold text-blue-600 bg-blue-100">
                  {mockSpecialist.name.charAt(0)}
                </div>
              </div>
              {mockSpecialist.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            
            <div>
              <h2 className="font-bold">{mockSpecialist.name}</h2>
              <div className="flex items-center">
                <p className="text-gray-600 text-sm mr-2">{mockSpecialist.role}</p>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-sm">{mockSpecialist.rating}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <button 
              onClick={handleCreateOrder}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Оформить заказ
            </button>
          </div>
        </div>
        
        {/* Messages area */}
        <div className="h-96 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.senderId === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  message.senderId === 'client' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-300 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p 
                  className={`text-xs mt-1 text-right ${
                    message.senderId === 'client' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}