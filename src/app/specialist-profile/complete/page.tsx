'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
  role: string;
  phoneNumber?: string;
  category?: string;
  specialty?: string;
  profileCompleted?: boolean;
}

export default function CompleteProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    category: '',
    specialty: '',
    description: '',
    experience: '',
    address: '',
    availableDays: [] as string[],
    availableHoursStart: '09:00',
    availableHoursEnd: '18:00',
    priceRange: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Categories options
  const categories = [
    'Ремонт и строительство',
    'Красота и здоровье',
    'Цифровые услуги',
    'Образование',
    'Бытовые услуги'
  ];

  // Specialties based on category
  const specialtiesByCategory: Record<string, string[]> = {
    'Ремонт и строительство': ['Сантехник', 'Электрик', 'Плотник', 'Маляр', 'Плиточник'],
    'Красота и здоровье': ['Парикмахер', 'Массажист', 'Косметолог', 'Мастер маникюра', 'Стилист'],
    'Цифровые услуги': ['Программист', 'Дизайнер', 'SEO-специалист', 'Копирайтер', 'Видеограф'],
    'Образование': ['Репетитор', 'Тренер', 'Преподаватель', 'Коуч', 'Инструктор'],
    'Бытовые услуги': ['Клининг', 'Повар', 'Няня', 'Курьер', 'Садовник']
  };

  const weekDays = [
    { id: 'mon', label: 'Пн' },
    { id: 'tue', label: 'Вт' },
    { id: 'wed', label: 'Ср' },
    { id: 'thu', label: 'Чт' },
    { id: 'fri', label: 'Пт' },
    { id: 'sat', label: 'Сб' },
    { id: 'sun', label: 'Вс' },
  ];

  // Load user data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
      
      // Pre-fill form data if available
      if (userData.phoneNumber) setFormData(prev => ({ ...prev, phoneNumber: userData.phoneNumber || '' }));
      if (userData.category) setFormData(prev => ({ ...prev, category: userData.category || '' }));
      if (userData.specialty) setFormData(prev => ({ ...prev, specialty: userData.specialty || '' }));
      
      // If profile is already complete, redirect to main profile
      if (userData.profileCompleted) {
        router.push('/specialist-profile');
      }
    } else {
      // If not logged in, redirect to login
      router.push('/specialist-login');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => {
      const days = [...prev.availableDays];
      if (days.includes(day)) {
        return { ...prev, availableDays: days.filter(d => d !== day) };
      } else {
        return { ...prev, availableDays: [...days, day] };
      }
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Телефон обязателен';
    }
    
    if (!formData.category) {
      newErrors.category = 'Выберите категорию';
    }
    
    if (!formData.specialty) {
      newErrors.specialty = 'Выберите специализацию';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Добавьте описание';
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Укажите опыт работы';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Укажите адрес';
    }
    
    if (formData.availableDays.length === 0) {
      newErrors.availableDays = 'Выберите дни работы';
    }
    
    if (!formData.priceRange.trim()) {
      newErrors.priceRange = 'Укажите стоимость услуг';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // In a real app, this would send data to the server
        // For this mock, we'll just update localStorage
        
        // Wait for "API" call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (user) {
          const updatedUser = {
            ...user,
            phoneNumber: formData.phoneNumber,
            category: formData.category,
            specialty: formData.specialty,
            profileCompleted: true,
          };
          
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Redirect to profile page
          router.push('/specialist-profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setErrors({ form: 'Ошибка при сохранении профиля. Пожалуйста, попробуйте позже.' });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Завершите настройку профиля</h1>
        <p className="text-gray-700 mb-8">Заполните информацию, чтобы начать получать заказы</p>
        
        {errors.form && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {errors.form}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
              Номер телефона*
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+996 555 123-45-67"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isLoading}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Категория услуг*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) => {
                handleChange(e);
                // Reset specialty when category changes
                setFormData(prev => ({ ...prev, specialty: '' }));
              }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isLoading}
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="specialty" className="block text-gray-700 font-medium mb-2">
              Специализация*
            </label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.specialty ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isLoading || !formData.category}
            >
              <option value="">Выберите специализацию</option>
              {formData.category && specialtiesByCategory[formData.category]?.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Описание услуг*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Расскажите о своем опыте, квалификации и услугах, которые вы предоставляете"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isLoading}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">
                Опыт работы*
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Например: 5 лет"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>
            
            <div>
              <label htmlFor="priceRange" className="block text-gray-700 font-medium mb-2">
                Стоимость услуг*
              </label>
              <input
                type="text"
                id="priceRange"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                placeholder="Например: от 1000 сом до 5000 сом"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.priceRange ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              {errors.priceRange && <p className="text-red-500 text-sm mt-1">{errors.priceRange}</p>}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Адрес*
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="г. Бишкек, ул. Примерная, д. 123"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isLoading}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Рабочие дни*
            </label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleDayToggle(day.label)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    formData.availableDays.includes(day.label)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  disabled={isLoading}
                >
                  {day.label}
                </button>
              ))}
            </div>
            {errors.availableDays && <p className="text-red-500 text-sm mt-1">{errors.availableDays}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="availableHoursStart" className="block text-gray-700 font-medium mb-2">
                Время работы с*
              </label>
              <input
                type="time"
                id="availableHoursStart"
                name="availableHoursStart"
                value={formData.availableHoursStart}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="availableHoursEnd" className="block text-gray-700 font-medium mb-2">
                Время работы до*
              </label>
              <input
                type="time"
                id="availableHoursEnd"
                name="availableHoursEnd"
                value={formData.availableHoursEnd}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition relative"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Сохранение...</span>
                </div>
              ) : 'Сохранить и продолжить'}
            </button>
            
            <p className="text-center text-gray-700 text-sm mt-4">
              Вы сможете дополнить свой профиль позже
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 