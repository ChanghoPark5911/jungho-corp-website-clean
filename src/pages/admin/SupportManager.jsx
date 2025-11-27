import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 고객센터 관리 페이지
 * - FAQ 관리
 * - 카테고리 관리
 */
const SupportManager = () => {
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [editingFaq, setEditingFaq] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // 인증 확인
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-new/login');
    }
  }, [navigate]);

  // 데이터 로드
  useEffect(() => {
    loadFaqData();
  }, []);

  const loadFaqData = async () => {
    try {
      const response = await fetch('/data/admin-faqs.json');
      const data = await response.json();
      setFaqData(data);
      setLoading(false);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      setLoading(false);
    }
  };

  // 데이터 저장
  const saveFaqData = () => {
    setSaveStatus('저장 중...');
    
    try {
      localStorage.setItem('admin-faq-data', JSON.stringify(faqData));
      setSaveStatus('✅ 저장 완료!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('❌ 저장 실패');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDelete = (faqId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const newFaqs = faqData.faqs.filter(f => f.id !== faqId);
      setFaqData({ ...faqData, faqs: newFaqs });
    }
  };

  const handleAdd = (newFaq) => {
    const maxId = faqData.faqs.reduce((max, f) => Math.max(max, f.id || 0), 0);
    const faqWithId = { 
      ...newFaq, 
      id: maxId + 1,
      views: 0,
      helpful: 0
    };
    setFaqData({ ...faqData, faqs: [...faqData.faqs, faqWithId] });
    setShowAddForm(false);
  };

  const handleEdit = (updatedFaq) => {
    const newFaqs = faqData.faqs.map(f => 
      f.id === updatedFaq.id ? updatedFaq : f
    );
    setFaqData({ ...faqData, faqs: newFaqs });
    setEditingFaq(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin-new/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 상단 네비게이션 */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin-new/dashboard')}
                className="mr-4 text-gray-600 dark:text-gray-300 hover:text-primary-600"
              >
                ← 대시보드
              </button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                고객센터 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {saveStatus && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  {saveStatus}
                </span>
              )}
              <button
                onClick={saveFaqData}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                저장
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            FAQ 목록 ({faqData?.faqs?.length || 0}개)
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <span className="mr-2">+</span>
            FAQ 추가
          </button>
        </div>

        {/* FAQ 목록 */}
        <div className="space-y-4">
          {faqData?.faqs?.map((faq) => (
            <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded mb-2">
                    {faq.category}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                    Q. {faq.question}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    A. {faq.answer}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  조회 {faq.views}회 · 도움됨 {faq.helpful}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingFaq(faq)}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 px-3 py-1 rounded text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가/수정 폼 */}
        {(showAddForm || editingFaq) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {editingFaq ? 'FAQ 수정' : '새 FAQ 추가'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                💡 상세 편집 기능은 다음 단계에서 구현됩니다.
              </p>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingFaq(null);
                }}
                className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SupportManager;

