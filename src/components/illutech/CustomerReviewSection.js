import React, { useState, useEffect, useRef } from 'react';

const CustomerReviewSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const reviews = [
    {
      id: 1,
      name: '김미영',
      rating: 5,
      content: '거실 조명을 바꾸고 나니 집이 완전히 달라졌어요! 전문가 상담도 정말 도움이 많이 되었습니다.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    },
    {
      id: 2,
      name: '박준호',
      rating: 5,
      content: '스마트 조명 시스템을 설치했는데 정말 편리해요. 음성으로 제어할 수 있어서 아이들도 좋아합니다.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    },
    {
      id: 3,
      name: '이수진',
      rating: 5,
      content: '카페 조명을 전문적으로 설치해주셔서 고객들이 많이 칭찬해주세요. 분위기가 완전히 바뀌었어요!',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    }
  ];

  const stats = {
    averageRating: 4.9,
    totalReviews: 2847,
    satisfiedCustomers: 98
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            고객 후기
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            실제 고객들의 생생한 후기를 확인해보세요
          </p>
        </div>

        {/* 통계 */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">{stats.averageRating}</div>
            <div className="flex justify-center text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-6 h-6 ${i < Math.floor(stats.averageRating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <p className="text-gray-600">평균 평점</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">{stats.totalReviews.toLocaleString()}</div>
            <p className="text-gray-600">총 리뷰 수</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">{stats.satisfiedCustomers}%</div>
            <p className="text-gray-600">고객 만족도</p>
          </div>
        </div>

        {/* 후기 캐러셀 */}
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 후기 내용 */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 ${
                    currentReview === index ? 'border-2 border-orange-500' : 'border border-gray-200'
                  }`}
                  onClick={() => setCurrentReview(index)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-orange-600 font-bold">{review.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.content}</p>
                </div>
              ))}
            </div>

            {/* 설치 전후 비교 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">설치 전후 비교</h3>
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`transition-all duration-300 ${
                    currentReview === index ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">설치 전</h4>
                      <img 
                        src={review.beforeAfter.before} 
                        alt="설치 전"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">설치 후</h4>
                      <img 
                        src={review.beforeAfter.after} 
                        alt="설치 후"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 더 많은 후기 버튼 */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.5s' }}
        >
          <button
            onClick={() => window.open('https://www.illutech.co.kr/reviews', '_blank')}
            className="inline-flex items-center bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            더 많은 후기 보기
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewSection; 