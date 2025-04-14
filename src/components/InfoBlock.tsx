const InfoBlock = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Как это работает</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Выберите услугу</h3>
            <p className="text-gray-800">
              Найдите нужного специалиста, используя поиск или категории. Просмотрите профили, отзывы и рейтинги.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Свяжитесь и обсудите</h3>
            <p className="text-gray-800">
              Обсудите детали работы, сроки и стоимость напрямую со специалистом через платформу.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Получите услугу</h3>
            <p className="text-gray-800">
              Получите качественную услугу и оставьте отзыв о работе специалиста, чтобы помочь другим клиентам.
            </p>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Преимущества нашей платформы</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Проверенные специалисты</h4>
                <p className="text-gray-800 text-sm">Все специалисты проходят проверку и подтверждают свою квалификацию.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Безопасные платежи</h4>
                <p className="text-gray-800 text-sm">Оплата через защищенные системы с гарантией возврата средств.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Честные отзывы</h4>
                <p className="text-gray-800 text-sm">Реальные отзывы от клиентов, которые уже воспользовались услугами.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Поддержка 24/7</h4>
                <p className="text-gray-800 text-sm">Наша команда поддержки всегда готова помочь вам с любыми вопросами.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBlock;