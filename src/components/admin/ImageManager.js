import React, { useState, useRef } from 'react';

const ImageManager = ({ 
  currentImages = {}, 
  onImageUpdate, 
  section = 'general' 
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState({});
  const fileInputRef = useRef(null);

  // 이미지 섹션별 설정
  const imageConfigs = {
    hero: {
      title: 'Hero 배경 이미지',
      description: '홈페이지 메인 배경 이미지 (권장: 1920x1080px, JPG/WebP)',
      maxSize: 2 * 1024 * 1024, // 2MB
      acceptedTypes: ['image/jpeg', 'image/jpg', 'image/webp', 'image/png']
    },
    logo: {
      title: '로고 이미지',
      description: '사이트 로고 (권장: 200x80px, PNG/SVG)',
      maxSize: 500 * 1024, // 500KB
      acceptedTypes: ['image/png', 'image/svg+xml']
    },
    gallery: {
      title: '갤러리 이미지',
      description: '프로젝트 갤러리 이미지 (권장: 800x600px, JPG/WebP)',
      maxSize: 1 * 1024 * 1024, // 1MB
      acceptedTypes: ['image/jpeg', 'image/jpg', 'image/webp']
    }
  };

  const config = imageConfigs[section] || imageConfigs.general;

  // 파일 선택 핸들러
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      // 파일 크기 검증
      if (file.size > config.maxSize) {
        alert(`파일 크기가 너무 큽니다. 최대 ${config.maxSize / (1024 * 1024)}MB까지 가능합니다.`);
        return;
      }

      // 파일 타입 검증
      if (!config.acceptedTypes.includes(file.type)) {
        alert('지원하지 않는 파일 형식입니다.');
        return;
      }

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages(prev => ({
          ...prev,
          [file.name]: {
            url: e.target.result,
            file: file,
            name: file.name
          }
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // 이미지 업로드 처리
  const handleUpload = async () => {
    if (Object.keys(previewImages).length === 0) {
      alert('업로드할 이미지를 선택해주세요.');
      return;
    }

    setUploading(true);

    try {
      // 실제 구현에서는 서버로 이미지 전송
      // 현재는 로컬 스토리지에 저장하여 시뮬레이션
      const uploadedImages = {};
      
      for (const [name, imageData] of Object.entries(previewImages)) {
        // 이미지 최적화 및 압축 (실제로는 서버에서 처리)
        const optimizedImage = await compressImage(imageData.url, imageData.file.type);
        
        uploadedImages[name] = {
          url: optimizedImage,
          name: name,
          size: imageData.file.size,
          type: imageData.file.type,
          uploadedAt: new Date().toISOString()
        };
      }

      // 부모 컴포넌트에 업데이트 알림
      onImageUpdate(section, uploadedImages);
      
      // 미리보기 초기화
      setPreviewImages({});
      
      alert('이미지가 성공적으로 업로드되었습니다!');
      
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  // 이미지 압축 (클라이언트 사이드) - 메모리 최적화 강화
  const compressImage = (dataUrl, type) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        try {
          // 이미지 크기 조정 (최대 600px로 더 줄임 - 메모리 절약 강화)
          const maxSize = 600;
          let { width, height } = img;
          
          if (width > height && width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // 이미지 그리기
          ctx.drawImage(img, 0, 0, width, height);
          
          // 품질 설정 (0.6 = 60%로 더 줄임 - 메모리 절약 강화)
          const quality = 0.6;
          const compressedDataUrl = canvas.toDataURL(type, quality);
          
          // 메모리 정리 강화
          canvas.width = 0;
          canvas.height = 0;
          ctx.clearRect(0, 0, 0, 0);
          
          // 이미지 객체 정리
          img.src = '';
          img.onload = null;
          img.onerror = null;
          
          resolve(compressedDataUrl);
        } catch (error) {
          console.error('이미지 압축 오류:', error);
          // 메모리 정리
          canvas.width = 0;
          canvas.height = 0;
          img.src = '';
          // 압축 실패 시 원본 반환
          resolve(dataUrl);
        }
      };
      
      img.onerror = () => {
        console.error('이미지 로드 실패');
        // 메모리 정리
        canvas.width = 0;
        canvas.height = 0;
        img.src = '';
        resolve(dataUrl);
      };
      
      img.src = dataUrl;
    });
  };

  // 이미지 제거
  const removeImage = (imageName) => {
    setPreviewImages(prev => {
      const newImages = { ...prev };
      delete newImages[imageName];
      return newImages;
    });
  };

  // 현재 이미지 표시
  const renderCurrentImages = () => {
    if (!currentImages || Object.keys(currentImages).length === 0) {
      return (
        <div className="text-gray-500 text-sm italic">
          현재 설정된 이미지가 없습니다.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(currentImages).map(([name, image]) => {
          // 이미지 데이터 검증
          if (!image || !image.url) {
            return null;
          }
          
          return (
            <div key={name} className="relative border rounded-lg p-2">
              <img 
                src={image.url} 
                alt={name}
                className="w-full h-24 object-cover rounded"
                onError={(e) => {
                  console.error('이미지 로드 실패:', image.url);
                  e.target.style.display = 'none';
                  e.target.nextSibling.textContent = '이미지 로드 실패';
                }}
              />
              <div className="text-xs text-gray-600 mt-1 truncate">{name}</div>
              <button
                onClick={() => onImageUpdate(section, { ...currentImages, [name]: null })}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{config.title}</h3>
      <p className="text-gray-600 mb-4">{config.description}</p>
      
      {/* 디버깅 정보 */}
      <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
        <strong>디버깅 정보:</strong>
        <div>섹션: {section}</div>
        <div>이미지 개수: {Object.keys(currentImages || {}).length}</div>
        <div>이미지 데이터: {JSON.stringify(currentImages, null, 2)}</div>
        {section === 'hero' && (
          <div className="mt-2 p-2 bg-blue-50 rounded">
            <strong>💡 Hero 이미지 안내:</strong>
            <div>• 이 이미지는 홈페이지 메인 배경으로 사용됩니다</div>
            <div>• 업로드 후 홈페이지로 이동하여 확인할 수 있습니다</div>
          </div>
        )}
      </div>
      
      {/* 현재 이미지 표시 */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">현재 이미지</h4>
        {renderCurrentImages()}
      </div>

      {/* 이미지 업로드 */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">새 이미지 업로드</h4>
        
        {/* 파일 선택 */}
        <div className="mb-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={config.acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            이미지 선택
          </button>
          <span className="text-xs text-gray-500 ml-2">
            최대 {config.maxSize / (1024 * 1024)}MB
          </span>
        </div>

        {/* 미리보기 */}
        {Object.keys(previewImages).length > 0 && (
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 mb-2">업로드 예정 이미지</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(previewImages).map(([name, imageData]) => (
                <div key={name} className="relative border rounded-lg p-2">
                  <img 
                    src={imageData.url} 
                    alt={name}
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="text-xs text-gray-600 mt-1 truncate">{name}</div>
                  <button
                    onClick={() => removeImage(name)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 업로드 버튼 */}
        {Object.keys(previewImages).length > 0 && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-6 py-2 rounded-lg text-white transition-colors ${
              uploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {uploading ? '업로드 중...' : '이미지 업로드'}
          </button>
        )}
      </div>

      {/* 도움말 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 이미지 최적화 팁</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• 웹용으로 최적화된 이미지를 사용하세요</li>
          <li>• 적절한 크기와 압축으로 로딩 속도를 개선하세요</li>
          <li>• 투명 배경이 필요한 경우 PNG 형식을 사용하세요</li>
          <li>• 배경 이미지는 고해상도로 준비하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageManager;
