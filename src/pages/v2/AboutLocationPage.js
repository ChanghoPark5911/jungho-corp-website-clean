import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';

const AboutLocationPage = () => {
  const { t, currentLanguage } = useI18n();
  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // 본사 정보
  const headquarters = {
    name: currentLanguage === 'en' ? 'Jungho Group Headquarters' : '정호그룹 본사',
    nameEn: 'Jungho Group Headquarters',
    address: {
      road: currentLanguage === 'en' 
        ? '3F, Jungho Building, 17, Nonhyeon-ro 116-gil, Gangnam-gu, Seoul, Republic of Korea'
        : '서울시 강남구 논현로116길 17 정호빌딩, 3층',
      jibun: currentLanguage === 'en'
        ? '3F, 277-9, Nonhyeon-dong, Gangnam-gu, Seoul, Republic of Korea'
        : '서울시 강남구 논현동 277-9, 3층',
      postal: '06107'
    },
    contact: {
      phone: '02.515.5018',
      fax: '02.515.5019'
    },
    subway: currentLanguage === 'en' ? [
      { line: 'Line 9', station: 'Eonju Station', exit: 'Exit 3', time: '5 min walk', color: 'bg-amber-500' },
      { line: 'Line 9/Bundang', station: 'Seonjeongneung Station', exit: 'Exit 1', time: '15 min walk', color: 'bg-amber-500' },
      { line: 'Line 7', station: 'Hakdong Station', exit: 'Exit 3', time: '10 min walk', color: 'bg-green-600' }
    ] : [
      { line: '9호선', station: '언주역', exit: '3번 출구', time: '도보 5분', color: 'bg-amber-500' },
      { line: '9호선/분당', station: '선정릉역', exit: '1번 출구', time: '도보 15분', color: 'bg-amber-500' },
      { line: '7호선', station: '학동역', exit: '3번 출구', time: '도보 10분', color: 'bg-green-600' }
    ],
    bus: currentLanguage === 'en' ? [
      { type: 'Trunk', numbers: ['147', '463'], stop: 'Get off at Eonju Station Exit 3(4)' },
      { type: 'Branch', numbers: ['3412', '3422', '4211'], stop: 'Get off at Eonju Station Exit 3(4)' }
    ] : [
      { type: '간선', numbers: ['147', '463'], stop: '언주역 3번(4번)출구 하차' },
      { type: '지선', numbers: ['3412', '3422', '4211'], stop: '언주역 3번(4번)출구 하차' }
    ],
    car: currentLanguage === 'en'
      ? 'Due to one-way street in front of Jungho Building, enter through the road between Nonhyeon I-Park and Park Tower'
      : '정호빌딩 앞 도로가 일방통행인 관계로 논현아이파크와 팍스타워 사잇길로 진입',
    mapUrl: 'https://map.kakao.com/link/map/정호빌딩,37.5136,127.0385'
  };

  // 연구소 정보
  const rdCenter = {
    name: currentLanguage === 'en' ? 'R&D Center' : 'R&D센터',
    nameEn: 'R&D Center',
    address: {
      road: currentLanguage === 'en'
        ? 'Clarus Building, 5, Myeonmok-ro 34-gil, Jungnang-gu, Seoul, Republic of Korea'
        : '서울시 중랑구 면목로 34길 5 클라루스 빌딩',
      jibun: currentLanguage === 'en'
        ? '354-6, Myeonmok-dong, Jungnang-gu, Seoul, Republic of Korea'
        : '서울 중랑구 면목동 354-6',
      postal: null
    },
    contact: {
      phone: '02.515.5018',
      email: 'clarus@junghocorp.com'
    },
    subway: currentLanguage === 'en' ? [
      { line: 'Line 7', station: 'Yongmasan Station', exit: 'Exit 1', time: '6 min walk', color: 'bg-green-600' },
      { line: 'Line 7', station: 'Sagajeong Station', exit: 'Exit 4', time: '8 min walk', color: 'bg-green-600' }
    ] : [
      { line: '7호선', station: '용마산역', exit: '1번 출구', time: '도보 6분', color: 'bg-green-600' },
      { line: '7호선', station: '사가정역', exit: '4번 출구', time: '도보 8분', color: 'bg-green-600' }
    ],
    bus: currentLanguage === 'en' ? [
      { type: 'Trunk', numbers: ['240', '272'], stop: 'Get off at Bangyakguk, walk 130m' },
      { type: 'Branch', numbers: ['2112', '2233', '2311'], stop: 'Get off at Bangyakguk, walk 130m' }
    ] : [
      { type: '간선', numbers: ['240', '272'], stop: '방약국앞 하차 후 도보 130M' },
      { type: '지선', numbers: ['2112', '2233', '2311'], stop: '방약국앞 하차 후 도보 130M' }
    ],
    car: currentLanguage === 'en'
      ? 'Exit from Dongbu Expressway at Jangpyeong Bridge → Go straight about 500m toward Junggok/Gunja at Sagajeong intersection'
      : '동부간선도로 장평교에서 진출 → 사가정 사거리에서 중곡/군자 방향 직진 약 500m',
    mapUrl: 'https://map.kakao.com/link/map/클라루스빌딩,37.5769,127.0816'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* 이정표 - 오른쪽 상단 */}
        <motion.div 
          className="absolute top-8 right-8 text-right z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Current Page
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            LOCATION
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
                {currentLanguage === 'en' 
                  ? '📍 Seoul Gangnam · Jungnang' 
                  : '📍 서울 강남 · 중랑'}
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              {currentLanguage === 'en' ? 'Location' : '찾아오시는 길'}
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {currentLanguage === 'en' ? (
                <>
                  Visit our headquarters and R&D center<br />
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">We welcome you anytime</span>
                </>
              ) : (
                <>
                  정호그룹 본사와 R&D 센터로<br />
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">언제든 방문을 환영합니다</span>
                </>
              )}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* 본사 섹션 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 rounded-full shadow-lg mb-4">
                <span className="text-3xl">🏢</span>
                <span className="text-white font-bold text-xl">{headquarters.name}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {headquarters.nameEn}
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 지도 */}
            <motion.div 
              className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              variants={fadeInUp}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8421!2d127.0363!3d37.5136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMwJzQ5LjAiTiAxMjfCsDAyJzE4LjYiRQ!5e0!3m2!1sen!2skr!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="정호그룹 본사 지도"
                className="w-full h-full min-h-[400px]"
              />
            </motion.div>

            {/* 정보 */}
            <motion.div 
              className="space-y-6"
              variants={fadeInUp}
            >
              {/* 주소 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📮</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Address' : '주소'}
                  </h3>
                </div>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><span className="font-semibold text-primary-600 dark:text-primary-400">{currentLanguage === 'en' ? 'Street:' : '도로명:'}</span> {headquarters.address.road}</p>
                  <p><span className="font-semibold text-primary-600 dark:text-primary-400">{currentLanguage === 'en' ? 'Lot:' : '지번:'}</span> {headquarters.address.jibun}</p>
                  <p><span className="font-semibold text-primary-600 dark:text-primary-400">{currentLanguage === 'en' ? 'Postal Code:' : '우편번호:'}</span> {headquarters.address.postal}</p>
                </div>
              </div>

              {/* 연락처 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Contact' : '연락처'}
                  </h3>
                </div>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-primary-600 dark:text-primary-400">{currentLanguage === 'en' ? 'Phone:' : '전화:'}</span> 
                    <a href={`tel:${headquarters.contact.phone.replace(/\./g, '-')}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {headquarters.contact.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-primary-600 dark:text-primary-400">{currentLanguage === 'en' ? 'Fax:' : '팩스:'}</span> 
                    {headquarters.contact.fax}
                  </p>
                </div>
              </div>

              {/* 지하철 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🚊</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Subway' : '지하철'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {headquarters.subway.map((subway, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`px-3 py-1 ${subway.color} text-white rounded-full text-xs font-bold`}>
                        {subway.line}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{subway.station}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{subway.exit} · {subway.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 버스 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🚍</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Bus' : '버스'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {headquarters.bus.map((bus, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          {bus.type}:
                        </span>
                        <div className="flex gap-2">
                          {bus.numbers.map((num, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm font-semibold">
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm ml-2">{bus.stop}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 승용차 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🚙</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'By Car' : '승용차'}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {headquarters.car}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 연구소 섹션 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 rounded-full shadow-lg mb-4">
                <span className="text-3xl">🔬</span>
                <span className="text-white font-bold text-xl">{rdCenter.name}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {rdCenter.nameEn}
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 지도 */}
            <motion.div 
              className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              variants={fadeInUp}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3161.234!2d127.0794!3d37.5769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDM0JzM2LjgiTiAxMjfCsDA0JzUzLjgiRQ!5e0!3m2!1sen!2skr!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="클라루스 연구소 지도"
                className="w-full h-full min-h-[400px]"
              />
            </motion.div>

            {/* 정보 */}
            <motion.div 
              className="space-y-6"
              variants={fadeInUp}
            >
              {/* 주소 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📮</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Address' : '주소'}
                  </h3>
                </div>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><span className="font-semibold text-cyan-600 dark:text-cyan-400">{currentLanguage === 'en' ? 'Street:' : '도로명:'}</span> {rdCenter.address.road}</p>
                  <p><span className="font-semibold text-cyan-600 dark:text-cyan-400">{currentLanguage === 'en' ? 'Lot:' : '지번:'}</span> {rdCenter.address.jibun}</p>
                </div>
              </div>

              {/* 연락처 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Contact' : '연락처'}
                  </h3>
                </div>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">{currentLanguage === 'en' ? 'Phone:' : '전화:'}</span> 
                    <a href={`tel:${rdCenter.contact.phone.replace(/\./g, '-')}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      {rdCenter.contact.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</span> 
                    <a href={`mailto:${rdCenter.contact.email}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      {rdCenter.contact.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* 지하철 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🚊</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Subway' : '지하철'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {rdCenter.subway.map((subway, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`px-3 py-1 ${subway.color} text-white rounded-full text-xs font-bold`}>
                        {subway.line}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{subway.station}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{subway.exit} · {subway.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 버스 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🚍</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Bus' : '버스'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {rdCenter.bus.map((bus, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                          {bus.type}:
                        </span>
                        <div className="flex gap-2">
                          {bus.numbers.map((num, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm font-semibold">
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm ml-2">{bus.stop}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 승용차 */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🚙</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'By Car' : '승용차'}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {rdCenter.car}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutLocationPage;

