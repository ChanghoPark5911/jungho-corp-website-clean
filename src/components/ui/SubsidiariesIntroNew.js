import React from 'react';

const SubsidiariesIntroNew = ({ data }) => {
  if (!data) return null;

  const { title, description, subsidiaries } = data;

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* 상단 제목 및 설명 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            {title.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* 4개 계열사 2x2 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {subsidiaries.map((company, index) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
            >
              {/* 회사 아이콘 */}
              <div className="flex items-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mr-4"
                  style={{ backgroundColor: company.color + '20' }}
                >
                  {company.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {company.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500">
                    {company.subtitle}
                  </p>
                </div>
              </div>

              {/* 설명 */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {company.description}
              </p>

              {/* 자세히 보기 버튼 */}
              <button
                className="w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: company.color }}
                onClick={() => window.location.href = company.path}
              >
                자세히 보기 →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubsidiariesIntroNew;
