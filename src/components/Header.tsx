'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const cities = [
  'Бишкек',
  'Ош',
  'Джалал-Абад',
  'Каракол',
  'Токмок',
  'Нарын',
  'Талас',
  'Баткен',
  'Чолпон-Ата',
  'Кызыл-Кия'
];

// User type definition
type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  role: string;
  authProvider?: string;
};

const Header = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  // Check if user is logged in on component mount and when path changes
  useEffect(() => {
    checkUserAuth();
  }, [pathname]);
  
  // Check user authentication from localStorage
  const checkUserAuth = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser) as User;
        setUser(userData);
        setIsLoggedIn(userData.isLoggedIn);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking user auth:', error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    
    // Redirect to home page
    router.push('/');
  };

  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || 'У';
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-6">
            <div className="relative w-10 h-10 mr-2">
              {/* Placeholder for logo - replace with your actual logo */}
              <div className="absolute inset-0 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                ПС
              </div>
            </div>
            <span className="text-xl font-bold text-blue-700">ПрофиСервис</span>
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <span className="mr-1">{selectedCity}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
                {cities.map((city) => (
                  <button
                    key={city}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left"
                    onClick={() => {
                      setSelectedCity(city);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn && user ? (
            <>
              {/* Notifications icon with badge */}
              <Link href="/client-profile?tab=messages" className="relative text-gray-700 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  1
                </span>
              </Link>
              
              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 mr-2">
                    {getInitials(user.name)}
                  </div>
                  <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    </div>
                    
                    <Link 
                      href="/client-profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Мой профиль
                    </Link>
                    <Link 
                      href="/client-profile?tab=messages"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Сообщения
                    </Link>
                    <Link 
                      href="/client-profile?tab=orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Мои заказы
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-blue-50"
                        onClick={handleLogout}
                      >
                        Выйти
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/specialist-login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
                Вход для специалистов
              </Link>
              <Link href="/client-login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Вход для клиентов
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;