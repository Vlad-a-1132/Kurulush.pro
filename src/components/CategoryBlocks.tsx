import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 'repair',
    title: 'Мастера по ремонту',
    description: 'Сантехники, электрики, мастера по ремонту бытовой техники, сборщики мебели и другие специалисты.',
    image: '/image/santihnik copy.jpeg',
    specialties: ['Сантехник', 'Электрик', 'Ремонт бытовой техники', 'Сборка мебели', 'Отделочные работы']
  },
  {
    id: 'beauty',
    title: 'Мастера красоты',
    description: 'Парикмахеры, мастера маникюра и педикюра, косметологи, визажисты и другие специалисты.',
    image: '/image/Bjuti-master.jpg',
    specialties: ['Парикмахер', 'Маникюр и педикюр', 'Косметолог', 'Визажист', 'Массажист']
  },
  {
    id: 'freelance',
    title: 'Фрилансеры',
    description: 'Дизайнеры, программисты, копирайтеры, фотографы, видеографы и другие специалисты.',
    image: '/image/freelancer_1.jpg',
    specialties: ['Дизайнер', 'Программист', 'Копирайтер', 'Фотограф', 'Видеограф']
  },
  {
    id: 'tutors',
    title: 'Репетиторы',
    description: 'Репетиторы по школьным предметам, иностранным языкам, музыке, искусству и другим направлениям.',
    image: '/image/repetiror.jpeg',
    specialties: ['Математика', 'Иностранные языки', 'Физика', 'Музыка', 'Химия']
  }
];

const CategoryBlocks = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Наши категории специалистов</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="h-48 relative bg-gray-200">
                {/* Отображаем реальное изображение категории */}
                <Image 
                  src={category.image} 
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{category.title}</h3>
                <p className="text-gray-800 mb-4">{category.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Популярные специальности:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.specialties.map((specialty) => (
                      <Link 
                        href={`/search?specialty=${encodeURIComponent(specialty)}`} 
                        key={specialty}
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-800 rounded-full hover:bg-blue-100"
                      >
                        {specialty}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href={`/masters?category=${category.id}`}
                  className="inline-block w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Все специалисты
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