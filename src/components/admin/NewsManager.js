// 뉴스/공지사항 관리 컴포넌트
import React, { useState, useEffect } from 'react';
import newsService, { NEWS_CATEGORIES, NEWS_CATEGORY_LABELS } from '../../services/newsService';
import { storage } from '../../config/firebase';
import { ref } from 'firebase/storage';

const NewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  
  // 필터링 및 검색
  const [selectedCategory, setSelectedCategory] = useState(NEWS_CATEGORIES.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 뉴스 폼 데이터
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: NEWS_CATEGORIES.TECHNOLOGY,
    author: '',
    readTime: '3분',
    isPublished: true,
    publishedAt: new Date().toISOString().split('T')[0],
    featuredImage: null,
    featuredImageUrl: ''
  });
  
  // 이미지 미리보기 상태
  const [imagePreview, setImagePreview] = useState(null);
  
  // 장애처리 상태
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  // 컴포넌트 마운트 시 뉴스 목록 로드
  useEffect(() => {
    loadNewsList();
  }, [selectedCategory, searchTerm]);

  // Firebase 연결 테스트
  const testFirebaseConnection = async () => {
    try {
      console.log('Firebase 연결 테스트 시작...');
      const result = await newsService.getNewsList({ limitCount: 1 });
      console.log('Firebase 연결 테스트 결과:', result);
      
      if (result.success) {
        setSuccess('Firebase Firestore 연결 성공!');
      } else {
        setError('Firebase Firestore 연결 실패: ' + result.error);
      }
    } catch (error) {
      console.error('Firebase 연결 테스트 오류:', error);
      setError('Firebase 연결 테스트 실패: ' + error.message);
    }
  };

  // Firebase Storage 연결 테스트
  const testFirebaseStorage = async () => {
    try {
      console.log('Firebase Storage 연결 테스트 시작...');
      setLoading(true);
      setError('');
      
      // 타임아웃 설정 (10초)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Storage 테스트 시간 초과 (10초)')), 10000);
      });
      
      const testPromise = new Promise(async (resolve, reject) => {
        try {
          // 작은 테스트 이미지 파일 생성
          const canvas = document.createElement('canvas');
          canvas.width = 10;
          canvas.height = 10;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, 10, 10);
          
          canvas.toBlob(async (blob) => {
            try {
              if (!blob) {
                reject(new Error('테스트 이미지 생성 실패'));
                return;
              }
              
              const testFile = new File([blob], 'test.png', { type: 'image/png' });
              console.log('테스트 파일 생성 완료:', testFile);
              
              const uploadResult = await newsService.uploadNewsImage(testFile, 'test');
              console.log('Storage 업로드 결과:', uploadResult);
              
              resolve(uploadResult);
            } catch (err) {
              console.error('Storage 업로드 오류:', err);
              reject(err);
            }
          }, 'image/png');
          
        } catch (err) {
          console.error('테스트 이미지 생성 오류:', err);
          reject(err);
        }
      });
      
      const result = await Promise.race([testPromise, timeoutPromise]);
      
      if (result.success) {
        setSuccess('Firebase Storage 연결이 정상입니다!');
      } else {
        setError('Firebase Storage 연결에 문제가 있습니다: ' + result.error);
      }
      
    } catch (err) {
      setError('Firebase Storage 테스트 실패: ' + err.message);
      console.error('Firebase Storage 테스트 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // Firebase Storage 간단 연결 확인
  const testFirebaseStorageSimple = async () => {
    try {
      console.log('Firebase Storage 간단 연결 확인 시작...');
      setLoading(true);
      setError('');
      
      // 타임아웃 설정 (5초)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Storage 연결 확인 시간 초과 (5초)')), 5000);
      });
      
      const testPromise = new Promise(async (resolve, reject) => {
        try {
          // Firebase Storage 객체 확인
          if (!storage) {
            reject(new Error('Firebase Storage가 초기화되지 않았습니다.'));
            return;
          }
          
          console.log('Firebase Storage 객체:', storage);
          
          // 간단한 참조 생성 테스트
          const testRef = ref(storage, 'test/connection-test.txt');
          
          console.log('Storage 참조 생성 성공:', testRef);
          
          resolve({ success: true, message: 'Storage 연결 정상' });
          
        } catch (err) {
          console.error('Storage 연결 확인 오류:', err);
          reject(err);
        }
      });
      
      const result = await Promise.race([testPromise, timeoutPromise]);
      
      if (result.success) {
        setSuccess('Firebase Storage 연결이 정상입니다! (참조 생성 성공)');
      } else {
        setError('Firebase Storage 연결에 문제가 있습니다.');
      }
      
    } catch (err) {
      setError('Firebase Storage 연결 확인 실패: ' + err.message);
      console.error('Firebase Storage 연결 확인 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 장애처리 시나리오별 해결방안
  const troubleshootingScenarios = {
    'news-list': {
      title: '뉴스 목록이 안 보여요',
      steps: [
        {
          title: '1단계: Firestore 연결 확인',
          action: testFirebaseConnection,
          description: 'Firebase 데이터베이스 연결을 확인합니다.'
        },
        {
          title: '2단계: 페이지 새로고침',
          action: () => window.location.reload(),
          description: '브라우저를 새로고침하여 캐시를 초기화합니다.'
        },
        {
          title: '3단계: 네트워크 연결 확인',
          action: () => alert('인터넷 연결을 확인해주세요.'),
          description: '인터넷 연결 상태를 확인합니다.'
        }
      ]
    },
    'image-upload': {
      title: '이미지 업로드가 안 돼요',
      steps: [
        {
          title: '1단계: Storage 연결 확인',
          action: testFirebaseStorageSimple,
          description: 'Firebase Storage 연결을 빠르게 확인합니다.'
        },
        {
          title: '2단계: Storage 실제 테스트',
          action: testFirebaseStorage,
          description: '실제 이미지 업로드를 테스트합니다.'
        },
        {
          title: '3단계: 로컬 저장 사용',
          action: () => alert('Firebase 업로드 대신 "로컬 저장" 버튼을 사용하세요.'),
          description: 'Firebase 업로드가 실패하면 로컬 저장을 사용합니다.'
        }
      ]
    },
    'news-save': {
      title: '뉴스 저장이 안 돼요',
      steps: [
        {
          title: '1단계: 필수 항목 확인',
          action: () => alert('제목과 내용을 모두 입력했는지 확인하세요.'),
          description: '제목과 내용은 필수 입력 항목입니다.'
        },
        {
          title: '2단계: Firestore 연결 확인',
          action: testFirebaseConnection,
          description: 'Firebase 데이터베이스 연결을 확인합니다.'
        },
        {
          title: '3단계: 브라우저 콘솔 확인',
          action: () => alert('F12를 눌러 개발자 도구를 열고 Console 탭에서 오류를 확인하세요.'),
          description: '브라우저 개발자 도구에서 오류 메시지를 확인합니다.'
        }
      ]
    }
  };

  // 장애처리 시작
  const startTroubleshooting = () => {
    setShowTroubleshooting(true);
    setSelectedProblem(null);
  };

  // 문제 유형 선택
  const selectProblem = (problemType) => {
    setSelectedProblem(problemType);
  };

  // 장애처리 닫기
  const closeTroubleshooting = () => {
    setShowTroubleshooting(false);
    setSelectedProblem(null);
  };

  // 뉴스 목록 로드
  const loadNewsList = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await newsService.getNewsList({
        category: selectedCategory,
        searchTerm: searchTerm,
        limitCount: 50
      });
      
      if (result.success) {
        setNewsList(result.data);
      } else {
        setError(result.error || '뉴스 목록을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError('뉴스 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('뉴스 목록 로드 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 모달 열기 (생성)
  const openCreateModal = () => {
    setModalMode('create');
    setEditingNews(null);
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: NEWS_CATEGORIES.TECHNOLOGY,
      author: '',
      readTime: '3분',
      isPublished: true,
      publishedAt: new Date().toISOString().split('T')[0],
      featuredImage: null,
      featuredImageUrl: ''
    });
    setIsModalOpen(true);
  };

  // 모달 열기 (수정)
  const openEditModal = (news) => {
    setModalMode('edit');
    setEditingNews(news);
    setFormData({
      title: news.title || '',
      summary: news.summary || '',
      content: news.content || '',
      category: news.category || NEWS_CATEGORIES.TECHNOLOGY,
      author: news.author || '',
      readTime: news.readTime || '3분',
      isPublished: news.isPublished !== undefined ? news.isPublished : true,
      publishedAt: news.publishedAt ? news.publishedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      featuredImage: null,
      featuredImageUrl: news.featuredImageUrl || ''
    });
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: NEWS_CATEGORIES.TECHNOLOGY,
      author: '',
      readTime: '3분',
      isPublished: true,
      publishedAt: new Date().toISOString().split('T')[0],
      featuredImage: null,
      featuredImageUrl: ''
    });
    setImagePreview(null);
  };

  // 폼 데이터 변경 처리
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const selectedFile = files[0];
      
      // 파일 유효성 검사
      if (selectedFile) {
        if (!selectedFile.type.startsWith('image/')) {
          setError('이미지 파일만 선택할 수 있습니다.');
          return;
        }
        
        if (selectedFile.size > 5 * 1024 * 1024) {
          setError('파일 크기는 5MB 이하여야 합니다.');
          return;
        }
        
        setError(''); // 오류 메시지 초기화
      }
      
      setFormData(prev => ({ 
        ...prev, 
        featuredImage: selectedFile || null 
      }));
      
      // 이미지 미리보기 생성
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 이미지 업로드 처리
  const handleImageUpload = async () => {
    if (!formData.featuredImage) {
      setError('업로드할 이미지를 선택해주세요.');
      return;
    }
    
    console.log('이미지 업로드 시작:', formData.featuredImage);
    
    try {
      setLoading(true);
      setError('');
      
      // 타임아웃 설정 (30초)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('업로드 시간 초과 (30초)')), 30000);
      });
      
      const uploadPromise = newsService.uploadNewsImage(
        formData.featuredImage, 
        editingNews?.id || 'temp'
      );
      
      const uploadResult = await Promise.race([uploadPromise, timeoutPromise]);
      
      console.log('이미지 업로드 결과:', uploadResult);
      
      if (uploadResult.success) {
        setFormData(prev => ({
          ...prev,
          featuredImageUrl: uploadResult.data.url,
          featuredImage: null
        }));
        setImagePreview(null); // 미리보기 초기화
        setSuccess('이미지가 성공적으로 업로드되었습니다.');
        
        // 성공 메시지 3초 후 자동 제거
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(uploadResult.error || '이미지 업로드에 실패했습니다.');
      }
    } catch (err) {
      setError('이미지 업로드 중 오류가 발생했습니다: ' + err.message);
      console.error('이미지 업로드 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 로컬 이미지 업로드 (Base64 인코딩)
  const handleLocalImageUpload = async () => {
    if (!formData.featuredImage) {
      setError('업로드할 이미지를 선택해주세요.');
      return;
    }
    
    console.log('로컬 이미지 업로드 시작:', formData.featuredImage);
    
    try {
      setLoading(true);
      setError('');
      
      // 파일 크기 제한 (2MB for Base64)
      if (formData.featuredImage.size > 2 * 1024 * 1024) {
        setError('로컬 저장은 2MB 이하의 파일만 지원합니다.');
        setLoading(false);
        return;
      }
      
      // Base64 인코딩
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        
        setFormData(prev => ({
          ...prev,
          featuredImageUrl: base64String,
          featuredImage: null
        }));
        setImagePreview(null); // 미리보기 초기화
        setSuccess('이미지가 로컬에 저장되었습니다.');
        setLoading(false);
        
        // 성공 메시지 3초 후 자동 제거
        setTimeout(() => setSuccess(''), 3000);
      };
      
      reader.onerror = () => {
        setError('이미지 파일 읽기에 실패했습니다.');
        setLoading(false);
      };
      
      reader.readAsDataURL(formData.featuredImage);
      
    } catch (err) {
      setError('이미지 처리 중 오류가 발생했습니다: ' + err.message);
      console.error('로컬 이미지 업로드 오류:', err);
      setLoading(false);
    }
  };

  // 뉴스 저장 (생성/수정)
  const handleSaveNews = async () => {
    console.log('뉴스 저장 시작:', { modalMode, formData });
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('제목과 내용은 필수 입력 항목입니다.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const newsData = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        category: formData.category,
        author: formData.author.trim() || '관리자',
        readTime: formData.readTime || '3분',
        isPublished: formData.isPublished,
        publishedAt: formData.publishedAt || new Date().toISOString().split('T')[0],
        featuredImageUrl: formData.featuredImageUrl || ''
      };

      console.log('저장할 뉴스 데이터:', newsData);

      let result;
      if (modalMode === 'create') {
        console.log('뉴스 생성 시도...');
        result = await newsService.createNews(newsData);
      } else {
        console.log('뉴스 수정 시도...');
        result = await newsService.updateNews(editingNews.id, newsData);
      }

      console.log('뉴스 저장 결과:', result);

      if (result.success) {
        setSuccess(result.message);
        closeModal();
        loadNewsList();
        
        // 성공 메시지 3초 후 자동 제거
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.error || '뉴스 저장에 실패했습니다.');
        console.error('뉴스 저장 실패:', result.error);
      }
    } catch (err) {
      setError('뉴스 저장 중 오류가 발생했습니다: ' + err.message);
      console.error('뉴스 저장 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 뉴스 삭제
  const handleDeleteNews = async (id) => {
    if (!window.confirm('정말로 이 뉴스를 삭제하시겠습니까?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const result = await newsService.deleteNews(id);
      
      if (result.success) {
        setSuccess(result.message);
        loadNewsList();
        
        // 성공 메시지 3초 후 자동 제거
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.error || '뉴스 삭제에 실패했습니다.');
      }
    } catch (err) {
      setError('뉴스 삭제 중 오류가 발생했습니다.');
      console.error('뉴스 삭제 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 날짜 포맷팅
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">뉴스/공지사항 관리</h2>
        <div className="flex space-x-3">
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            새 뉴스 작성
          </button>
          <button
            onClick={startTroubleshooting}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            🔧 장애처리
          </button>
        </div>
      </div>

      {/* 상태 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* 필터 및 검색 */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 카테고리 필터 */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(NEWS_CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* 검색 */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              검색
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="제목, 내용으로 검색..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 뉴스 목록 */}
      <div className="bg-white rounded-lg border">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">뉴스가 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    발행일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    조회수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작성자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newsList.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {news.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {NEWS_CATEGORY_LABELS[news.category] || news.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        news.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {news.isPublished ? '발행됨' : '임시저장'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(news.publishedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {news.viewCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {news.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(news)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteNews(news.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 뉴스 작성/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {modalMode === 'create' ? '새 뉴스 작성' : '뉴스 수정'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 폼 */}
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제목 *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="뉴스 제목을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(NEWS_CATEGORY_LABELS)
                        .filter(([key]) => key !== NEWS_CATEGORIES.ALL)
                        .map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      작성자
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="작성자명을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      읽는 시간
                    </label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="예: 3분"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      발행일
                    </label>
                    <input
                      type="date"
                      name="publishedAt"
                      value={formData.publishedAt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      즉시 발행
                    </label>
                  </div>
                </div>

                {/* 요약 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    요약
                  </label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="뉴스 요약을 입력하세요"
                  />
                </div>

                {/* 대표 이미지 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대표 이미지
                  </label>
                  
                  {/* 현재 이미지 표시 */}
                  {formData.featuredImageUrl && (
                    <div className="mb-4">
                      <img
                        src={formData.featuredImageUrl}
                        alt="대표 이미지"
                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                      />
                      <p className="text-sm text-green-600 mt-2">✓ 이미지가 업로드되었습니다</p>
                    </div>
                  )}

                  {/* 파일 선택 */}
                  <div className="space-y-4">
                    <div>
                      <input
                        type="file"
                        name="featuredImage"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        지원 형식: JPG, PNG, GIF (최대 5MB)
                      </p>
                    </div>

                    {/* 선택된 파일 정보 및 미리보기 */}
                    {formData.featuredImage && (
                      <div className="space-y-3">
                        {/* 파일 정보 */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-900">
                                {formData.featuredImage.name}
                              </p>
                              <p className="text-xs text-blue-600">
                                {(formData.featuredImage.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={handleImageUpload}
                                disabled={loading}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {loading ? '업로드 중...' : 'Firebase 업로드'}
                              </button>
                              <button
                                type="button"
                                onClick={handleLocalImageUpload}
                                disabled={loading}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {loading ? '처리 중...' : '로컬 저장'}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 이미지 미리보기 */}
                        {imagePreview && (
                          <div className="border border-gray-300 rounded-lg p-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">미리보기:</p>
                            <img
                              src={imagePreview}
                              alt="이미지 미리보기"
                              className="w-full max-w-sm h-32 object-cover rounded-lg border"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 내용 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용 *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="뉴스 내용을 입력하세요"
                    required
                  />
                </div>

                {/* 버튼 */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNews}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? '저장 중...' : '저장'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 장애처리 모달 */}
      {showTroubleshooting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">🔧 장애처리 도우미</h3>
                <button
                  onClick={closeTroubleshooting}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {!selectedProblem ? (
                // 문제 유형 선택
                <div>
                  <p className="text-gray-600 mb-6">어떤 문제가 발생했나요? 문제 유형을 선택해주세요.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(troubleshootingScenarios).map(([key, scenario]) => (
                      <button
                        key={key}
                        onClick={() => selectProblem(key)}
                        className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h4>
                        <p className="text-gray-600 text-sm">클릭하여 해결방안을 확인하세요</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // 선택된 문제의 해결방안
                <div>
                  <div className="mb-6">
                    <button
                      onClick={() => setSelectedProblem(null)}
                      className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      뒤로 가기
                    </button>
                    <h4 className="text-xl font-bold text-gray-900">{troubleshootingScenarios[selectedProblem].title}</h4>
                    <p className="text-gray-600 mt-2">아래 단계를 순서대로 따라해보세요.</p>
                  </div>

                  <div className="space-y-4">
                    {troubleshootingScenarios[selectedProblem].steps.map((step, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-2">{step.title}</h5>
                            <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                          </div>
                          <button
                            onClick={step.action}
                            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            실행
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 mb-2">💡 추가 도움말</h5>
                    <p className="text-yellow-700 text-sm">
                      위 단계를 모두 시도해도 문제가 해결되지 않으면, 브라우저 개발자 도구(F12)의 Console 탭에서 오류 메시지를 확인하거나 관리자에게 문의하세요.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManager;