import React, { useState, useEffect } from 'react';
import { FiUpload, FiDownload, FiTrash2, FiEye } from 'react-icons/fi';

const FileUploadManager = ({ files, onUpload, onDelete }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 서버 API URL 설정 (웹 호스팅 서버 주소로 변경 필요)
  const API_BASE_URL = 'https://your-domain.com/api'; // 실제 도메인으로 변경

  // 서버에서 파일 정보 로드
  useEffect(() => {
    loadFilesFromServer();
  }, []);

  const loadFilesFromServer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/upload-file.php`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          Object.keys(result.data).forEach(fileType => {
            onUpload(fileType, result.data[fileType], true);
          });
        }
      }
    } catch (error) {
      console.error('서버에서 파일 정보 로드 실패:', error);
      // 서버 로드 실패 시 클라이언트 저장소에서 백업 로드
      loadFilesFromStorage();
    }
  };

  const loadFilesFromStorage = () => {
    try {
      const savedFiles = localStorage.getItem('clarus_files_server');
      if (savedFiles) {
        const parsedFiles = JSON.parse(savedFiles);
        Object.keys(parsedFiles).forEach(fileType => {
          onUpload(fileType, parsedFiles[fileType], true);
        });
      }
    } catch (error) {
      console.error('파일 정보 로드 실패:', error);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, fileType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(fileType, e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (fileType, file) => {
    if (!file) return;
    handleFileUpload(fileType, file);
  };

  const handleFileUpload = async (fileType, file) => {
    if (!file) return;

    // 파일 크기 검증 (50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('파일 크기는 50MB를 초과할 수 없습니다.');
      return;
    }

    // 파일 형식 검증
    const allowedTypes = {
      technicalDocs: ['.pdf', '.doc', '.docx', '.ppt', '.pptx'],
      productCatalog: ['.pdf', '.jpg', '.jpeg', '.png']
    };

    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes[fileType].includes(fileExtension)) {
      alert(`지원하지 않는 파일 형식입니다. 지원 형식: ${allowedTypes[fileType].join(', ')}`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(prev => ({ ...prev, [fileType]: 0 }));

    try {
      // 서버에 업로드 시도
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', fileType);

      const response = await fetch(`${API_BASE_URL}/upload-file.php`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // 서버에서 반환된 파일 정보를 부모 컴포넌트에 전달
          onUpload(fileType, result.data);
          alert(`${fileType === 'technicalDocs' ? '기술 자료' : '제품 카탈로그'} 파일이 성공적으로 업로드되었습니다.`);
          
          // 실시간 업데이트 이벤트 발생
          window.dispatchEvent(new Event('clarusFilesUpdated'));
        } else {
          throw new Error(result.message || '파일 업로드에 실패했습니다.');
        }
      } else {
        throw new Error('서버 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('서버 업로드 실패, 클라이언트 저장으로 대체:', error);
      
      // 서버 업로드 실패 시 클라이언트 저장으로 대체
      try {
        const fileBuffer = await file.arrayBuffer();
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));
        
        const fileData = {
          name: file.name,
          data: base64Data,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          url: `data:${file.type};base64,${base64Data}`
        };

        const savedFiles = JSON.parse(localStorage.getItem('clarus_files_server') || '{}');
        savedFiles[fileType] = fileData;
        localStorage.setItem('clarus_files_server', JSON.stringify(savedFiles));

        onUpload(fileType, fileData);
        alert(`${fileType === 'technicalDocs' ? '기술 자료' : '제품 카탈로그'} 파일이 클라이언트에 저장되었습니다. (서버 연결 실패)`);
        
        window.dispatchEvent(new Event('clarusFilesUpdated'));
      } catch (clientError) {
        console.error('클라이언트 저장도 실패:', clientError);
        alert('파일 저장에 실패했습니다.');
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(prev => ({ ...prev, [fileType]: 0 }));
    }
  };

  const handleFileDelete = async (fileType) => {
    if (window.confirm('정말로 이 파일을 삭제하시겠습니까?')) {
      try {
        // 서버에서 삭제 시도
        const response = await fetch(`${API_BASE_URL}/upload-file.php`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileType })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            onDelete(fileType);
            alert('파일이 서버에서 삭제되었습니다.');
            window.dispatchEvent(new Event('clarusFilesUpdated'));
          } else {
            throw new Error(result.message || '파일 삭제에 실패했습니다.');
          }
        } else {
          throw new Error('서버 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('서버 삭제 실패, 클라이언트 삭제로 대체:', error);
        
        // 서버 삭제 실패 시 클라이언트에서 삭제
        try {
          const savedFiles = JSON.parse(localStorage.getItem('clarus_files_server') || '{}');
          delete savedFiles[fileType];
          localStorage.setItem('clarus_files_server', JSON.stringify(savedFiles));

          onDelete(fileType);
          alert('파일이 클라이언트에서 삭제되었습니다. (서버 연결 실패)');
          window.dispatchEvent(new Event('clarusFilesUpdated'));
        } catch (clientError) {
          console.error('클라이언트 삭제도 실패:', clientError);
          alert('파일 삭제에 실패했습니다.');
        }
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">클라루스 파일 관리</h3>
        <p className="text-sm text-gray-600 mb-6">
          기술 자료와 제품 카탈로그 파일을 관리합니다 (서버 + 클라이언트 이중 저장)
        </p>

        {/* 서버 상태 표시 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                하이브리드 저장 모드
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>서버에 영구 저장을 시도하고, 실패 시 클라이언트에 임시 저장합니다.</p>
                <p className="mt-1">API_BASE_URL을 실제 서버 주소로 변경해주세요.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 기술 자료 관리 */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-medium text-blue-900 mb-4">기술 자료</h4>
            
            {files.technicalDocs ? (
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-blue-900">{files.technicalDocs.name}</p>
                      <p className="text-sm text-blue-700">
                        {formatFileSize(files.technicalDocs.size)}
                      </p>
                      <p className="text-xs text-blue-600">
                        저장: {new Date(files.technicalDocs.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(files.technicalDocs.url, '_blank')}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="미리보기"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        onClick={() => handleFileDelete('technicalDocs')}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="삭제"
                        disabled={isUploading}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-400 bg-blue-50' : 'border-blue-300'
                }`}
                onDragEnter={(e) => handleDrag(e)}
                onDragLeave={(e) => handleDrag(e)}
                onDragOver={(e) => handleDrag(e)}
                onDrop={(e) => handleDrop(e, 'technicalDocs')}
              >
                <FiUpload className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <p className="text-gray-500 mb-4">기술 자료 파일을 업로드하세요</p>
                <label className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                  {isUploading ? '업로드 중...' : '파일 선택'}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => handleFileSelect('technicalDocs', e.target.files[0])}
                    disabled={isUploading}
                  />
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  PDF, Word, PowerPoint 파일 (최대 50MB)
                </p>
              </div>
            )}
          </div>

          {/* 제품 카탈로그 관리 */}
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="text-lg font-medium text-green-900 mb-4">제품 카탈로그</h4>
            
            {files.productCatalog ? (
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-green-900">{files.productCatalog.name}</p>
                      <p className="text-sm text-green-700">
                        {formatFileSize(files.productCatalog.size)}
                      </p>
                      <p className="text-xs text-green-600">
                        저장: {new Date(files.productCatalog.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(files.productCatalog.url, '_blank')}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="미리보기"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        onClick={() => handleFileDelete('productCatalog')}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="삭제"
                        disabled={isUploading}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-green-400 bg-green-50' : 'border-green-300'
                }`}
                onDragEnter={(e) => handleDrag(e)}
                onDragLeave={(e) => handleDrag(e)}
                onDragOver={(e) => handleDrag(e)}
                onDrop={(e) => handleDrop(e, 'productCatalog')}
              >
                <FiUpload className="mx-auto h-12 w-12 text-green-400 mb-4" />
                <p className="text-gray-500 mb-4">제품 카탈로그 파일을 업로드하세요</p>
                <label className={`cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                  {isUploading ? '업로드 중...' : '파일 선택'}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileSelect('productCatalog', e.target.files[0])}
                    disabled={isUploading}
                  />
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  PDF, 이미지 파일 (최대 50MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 파일 업로드 가이드 */}
        <div className="bg-gray-50 rounded-lg p-6 mt-6">
          <h4 className="font-medium text-gray-900 mb-3">파일 업로드 가이드</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700 mb-2">기술 자료</p>
              <ul className="space-y-1">
                <li>• PDF, Word, PowerPoint 파일 지원</li>
                <li>• 최대 파일 크기: 50MB</li>
                <li>• 기술 스펙, 매뉴얼 등</li>
                <li>• 서버 + 클라이언트 이중 저장</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">제품 카탈로그</p>
              <ul className="space-y-1">
                <li>• PDF, 이미지 파일 지원</li>
                <li>• 최대 파일 크기: 50MB</li>
                <li>• 제품 소개, 사양 등</li>
                <li>• 서버 + 클라이언트 이중 저장</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadManager;
