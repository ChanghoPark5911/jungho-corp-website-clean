import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedProductCards = () => {
  return (
    <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(5,150,105,0.1),transparent_50%)]"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-section-title mb-6" style={{color: '#059669', fontSize: '2.5rem'}}>
            주요 제품 라인업
          </h2>
          <p className="text-body max-w-3xl mx-auto" style={{color: '#000000'}}>
            정호그룹의 검증된 조명제어 솔루션을 만나보세요
          </p>
        </div>
        
        {/* 움직이는 제품 카드들 */}
        <div className="relative h-96 mb-16">
          {/* Energy Manager 5 카드 */}
          <div className="absolute top-0 right-0 w-80 h-48 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-1 animate-float">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                                 <h3 className="text-xl font-bold mb-2" style={{color: '#000000'}}>Energy Manager 5</h3>
                 <p className="text-sm mb-3" style={{color: '#000000'}}>ARM Cortex-A53 | 256 Points</p>
                 <p className="text-sm leading-relaxed" style={{color: '#000000'}}>
                   차세대 중앙제어 시스템으로 최대 256개 조명을 통합 관리
                 </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                                 <div className="text-xs" style={{color: '#000000'}}>TCP/IP</div>
              </div>
            </div>
          </div>

          {/* IPC CRC1200 카드 */}
          <div className="absolute top-20 left-10 w-80 h-48 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:-rotate-1 animate-float-delayed">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                                 <h3 className="text-xl font-bold mb-2" style={{color: '#000000'}}>IPC CRC1200</h3>
                 <p className="text-sm mb-3" style={{color: '#000000'}}>100-242V | 30W | Modbus RTU</p>
                 <p className="text-sm leading-relaxed" style={{color: '#000000'}}>
                   산업용 조명제어로 견고한 성능과 뛰어난 확장성을 제공
                 </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                                 <div className="text-xs" style={{color: '#000000'}}>Modbus RTU</div>
              </div>
            </div>
          </div>

          {/* Magic CLARUS 카드 (반사 효과) */}
          <div className="absolute bottom-0 right-20 w-80 h-48 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-1 animate-float-reverse">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                                 <h3 className="text-xl font-bold mb-2" style={{color: '#000000'}}>Magic CLARUS</h3>
                 <p className="text-sm mb-3" style={{color: '#000000'}}>921.1MHz FSK | 무선</p>
                 <p className="text-sm leading-relaxed" style={{color: '#000000'}}>
                   무선 조명제어의 혁신적 솔루션을 경험해보세요
                 </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                                 <div className="text-xs" style={{color: '#000000'}}>무선 통신</div>
              </div>
            </div>
          </div>

          {/* 전체 제품 보기 카드 */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80 h-48 bg-gradient-to-br from-primary-600/90 to-primary-800/90 backdrop-blur-sm rounded-xl border border-primary-500/50 shadow-2xl transform transition-all duration-700 hover:scale-105 animate-float-slow">
            <div className="p-6 h-full flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
                             <h3 className="text-xl font-bold mb-2" style={{color: '#000000'}}>전체 제품 보기</h3>
               <p className="text-sm mb-4" style={{color: '#000000'}}>TLS4 | DDU | DMU | 그 외</p>
               <p className="text-sm" style={{color: '#000000'}}>
                 정호그룹의 모든 조명제어 제품을 만나보세요
               </p>
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="text-center">
          <Link 
            to="/business" 
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
          >
            <span>📋 전체 제품 카탈로그 보기</span>
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnimatedProductCards; 