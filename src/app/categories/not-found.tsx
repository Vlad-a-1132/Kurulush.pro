import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-20 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">Категория не найдена</h1>
        <p className="text-gray-700 mb-8">
          Извините, но запрашиваемая категория не существует или была удалена.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/categories" 
            className="px-6 py-3 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium btn-yellow"
          >
            Все категории
          </Link>
          <Link 
            href="/" 
            className="px-6 py-3 border border-black text-black rounded-md hover:bg-gray-100 transition btn-outline"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
} 