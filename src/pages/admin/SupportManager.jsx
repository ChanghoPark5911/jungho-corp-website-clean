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

  // FAQ 데이터 내보내기 (JSON 파일 다운로드)
  const exportFaqData = () => {
    try {
      const faqDataToExport = localStorage.getItem('admin-faq-data');
      const data = faqDataToExport ? JSON.parse(faqDataToExport) : faqData;
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `faqs-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSaveStatus('✅ FAQ 데이터 내보내기 완료!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('내보내기 실패:', error);
      setSaveStatus('❌ 내보내기 실패');
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
                onClick={exportFaqData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                title="FAQ 데이터를 JSON 파일로 다운로드합니다"
              >
                <span className="mr-2">📥</span>
                FAQ 내보내기
              </button>
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

        {/* 영구 저장 안내 */}
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">💾</span>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                📌 영구 저장 방법
              </h3>
              <ol className="text-xs text-green-800 dark:text-green-200 space-y-1 list-decimal list-inside">
                <li>FAQ를 추가/수정한 후 상단의 <strong>"저장"</strong> 버튼을 클릭합니다</li>
                <li>상단의 <strong>"📥 FAQ 내보내기"</strong> 버튼을 클릭하여 JSON 파일을 다운로드합니다</li>
                <li>다운로드한 파일을 <code className="bg-green-100 dark:bg-green-800 px-1 rounded">public/data/admin-faqs.json</code> 파일로 복사합니다</li>
                <li>Git에 커밋하고 푸시하여 배포 사이트에 반영합니다</li>
              </ol>
            </div>
          </div>
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

        {/* 추가 폼 */}
        {showAddForm && (
          <FaqForm
            onSave={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* 수정 폼 */}
        {editingFaq && (
          <FaqForm
            faq={editingFaq}
            onSave={handleEdit}
            onCancel={() => setEditingFaq(null)}
          />
        )}
      </main>
    </div>
  );
};

// FAQ 추가/수정 폼
const FaqForm = ({ faq, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    faq || {
      category: '일반',
      question: '',
      questionEn: '',
      answer: '',
      answerEn: ''
    }
  );

  const categories = ['일반', '계약', '시공', '기술', '기타'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.question || !formData.answer) {
      alert('질문과 답변(한국어)은 필수입니다.');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          {faq ? 'FAQ 수정' : '새 FAQ 추가'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              카테고리 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 질문 - 한국어 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              질문 (한국어) *
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="예: 견적은 어떻게 받을 수 있나요?"
              required
            />
          </div>

          {/* 질문 - 영어 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              질문 (English)
            </label>
            <input
              type="text"
              value={formData.questionEn || ''}
              onChange={(e) => setFormData({ ...formData, questionEn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., How can I get a quote?"
            />
          </div>

          {/* 답변 - 한국어 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              답변 (한국어) *
            </label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="상세한 답변을 입력하세요"
              rows={5}
              required
            />
          </div>

          {/* 답변 - 영어 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              답변 (English)
            </label>
            <textarea
              value={formData.answerEn || ''}
              onChange={(e) => setFormData({ ...formData, answerEn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter detailed answer"
              rows={5}
            />
          </div>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              💡 <strong>작성 가이드:</strong><br />
              • 한국어 질문과 답변은 필수입니다<br />
              • 영어 번역은 선택사항입니다 (나중에 추가 가능)<br />
              • 저장 후 상단의 "저장" 버튼을 클릭하면 반영됩니다
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg"
            >
              {faq ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportManager;

