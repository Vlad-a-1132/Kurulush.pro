'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function ClientRegistration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors, general: '' };
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
      valid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
      valid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
      valid = false;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // In a real app, we would send this data to an API
        console.log('Registration data:', formData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store user info in localStorage (in a real app, you would use secure cookies and tokens)
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          isLoggedIn: true,
          role: 'client',
          registrationDate: new Date().toLocaleDateString('ru-RU')
        }));
        
        // Redirect to profile page
        router.push('/client-profile');
      } catch (error) {
        setErrors({
          ...errors,
          general: 'Ошибка регистрации. Пожалуйста, попробуйте позже.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call the Google OAuth API
      console.log('Google login initiated');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data from Google
      const googleUser = {
        name: 'Анна Смирнова',
        email: 'anna.smirnova@gmail.com',
        isLoggedIn: true,
        role: 'client',
        authProvider: 'google',
        registrationDate: new Date().toLocaleDateString('ru-RU')
      };
      
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(googleUser));
      
      // Redirect to client profile
      router.push('/client-profile');
    } catch (error) {
      setErrors({
        ...errors,
        general: 'Ошибка входа через Google. Пожалуйста, попробуйте позже.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Регистрация клиента | ПрофиСервис</title>
      </Head>
    
      <div className="max-w-md mx-auto my-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">Регистрация клиента</h1>
        <p className="text-center text-gray-700 mb-8">
          Зарегистрируйтесь, чтобы получить доступ к услугам профессионалов
        </p>
        
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {errors.general}
          </div>
        )}
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition mb-6 relative"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
            
            <svg viewBox="0 0 48 48" width="20" height="20">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            <span>Зарегистрироваться через Google</span>
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">или зарегистрируйтесь с помощью email</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <p className="text-gray-600 text-xs mt-1">Пароль должен содержать минимум 6 символов</p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Подтвердите пароль
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition relative"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Регистрация...</span>
                </div>
              ) : 'Зарегистрироваться'}
            </button>
            
            <p className="text-gray-600 text-xs mt-4">
              Регистрируясь, вы соглашаетесь с <Link href="#" className="text-blue-600 hover:underline">условиями использования</Link> и <Link href="#" className="text-blue-600 hover:underline">политикой конфиденциальности</Link>.
            </p>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Уже есть аккаунт?{' '}
              <Link href="/client-login" className="text-blue-600 hover:underline font-medium">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}