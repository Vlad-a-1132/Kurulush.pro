import Link from 'next/link';
import { Metadata } from 'next';
import { categories } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Категории услуг - ПрофиСервис',
  description: 'Выберите категорию услуг и найдите подходящего специалиста на ПрофиСервис',
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Категории услуг</h1>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          Выберите категорию услуг, чтобы найти подходящего специалиста для решения ваших задач
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            href={`/categories/${category.id}`} 
            key={category.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition duration-300"
          >
            <div className="h-40 relative bg-gray-100 flex items-center justify-center">
              <span className="text-7xl">{category.icon}</span>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-black">{category.name}</h2>
              <p className="text-gray-700 mb-4">{category.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold text-sm text-black mb-2">Популярные услуги:</h3>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.slice(0, 4).map((subcategory) => (
                    <span 
                      key={subcategory}
                      className="text-xs px-2 py-1 bg-gray-100 text-black rounded-full"
                    >
                      {subcategory}
                    </span>
                  ))}
                  {category.subcategories.length > 4 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-black rounded-full">
                      +{category.subcategories.length - 4}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="inline-block w-full text-center py-2 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium btn-yellow">
                Перейти к категории
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 