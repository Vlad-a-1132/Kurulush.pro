import Link from 'next/link';
import { categories } from '@/data/categories';

const CategoryBlocks = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Наши категории услуг</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition duration-300">
              <div className="h-32 relative bg-gray-100 flex items-center justify-center">
                <span className="text-6xl">{category.icon}</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black">{category.name}</h3>
                <p className="text-gray-700 mb-4">{category.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-black mb-2">Популярные услуги:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 5).map((subcategory) => (
                      <Link 
                        href={`/masters?specialty=${encodeURIComponent(subcategory)}`} 
                        key={subcategory}
                        className="text-xs px-2 py-1 bg-gray-100 text-black rounded-full hover:bg-gray-200"
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href={`/categories/${category.id}`}
                  className="inline-block w-full text-center py-2 bg-yandex-yellow text-black rounded-md hover:bg-yandex-yellow-hover transition font-medium btn-yellow"
                >
                  Все мастера
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBlocks;