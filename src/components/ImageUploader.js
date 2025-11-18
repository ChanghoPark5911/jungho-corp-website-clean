import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageUploadService from '../utils/imageUpload';

/**
 * 이미지 업로드 컴포넌트
 * 드래그&드롭, 파일 선택, 미리보기, 진행률 표시 기능 포함
 */
const ImageUploader = ({
  onUploadSuccess,
  onUploadError,
  path = 'images',
  accept = 'image/jpeg,image/jpg,image/png,image/webp',
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  resize = true,
  showPreview = true,
  existingImageUrl = null,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState(existingImageUrl);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // 드래그 엔터
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // 드래그 오버
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 드래그 리브
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // 드롭
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  // 파일 선택
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  // 파일 처리
  const handleFiles = async (files) => {
    setError(null);

    try {
      // 단일 파일 모드
      if (!multiple) {
        const file = files[0];
        
        // 미리보기 생성
        if (showPreview && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => setPreview(e.target.result);
          reader.readAsDataURL(file);
        }

        // 업로드 시작
        setIsUploading(true);
        setUploadProgress(0);

        const url = await imageUploadService.uploadImageWithResize(
          file,
          path,
          (progress) => setUploadProgress(progress),
          { resize, maxSize }
        );

        setIsUploading(false);
        setUploadProgress(100);
        setPreview(url);

        if (onUploadSuccess) {
          onUploadSuccess(url, file);
        }
      } 
      // 다중 파일 모드
      else {
        setIsUploading(true);
        setUploadProgress(0);

        const results = await imageUploadService.uploadMultipleImages(
          files,
          path,
          (progress) => setUploadProgress(progress),
          { resize, maxSize }
        );

        setIsUploading(false);
        setUploadProgress(100);

        const successResults = results.filter(r => r.success);
        const failedResults = results.filter(r => !r.success);

        if (failedResults.length > 0) {
          setError(`${failedResults.length}개 파일 업로드 실패`);
        }

        if (onUploadSuccess && successResults.length > 0) {
          onUploadSuccess(successResults.map(r => r.url), successResults);
        }
      }

      // 파일 입력 리셋
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || '업로드 중 오류가 발생했습니다.');
      setIsUploading(false);
      setUploadProgress(0);

      if (onUploadError) {
        onUploadError(err);
      }
    }
  };

  // 이미지 제거
  const handleRemoveImage = async () => {
    if (preview && preview.includes('firebase')) {
      try {
        await imageUploadService.deleteImage(preview);
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
    setPreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 클릭으로 파일 선택
  const handleClick = () => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`image-uploader ${className}`}>
      {/* 업로드 영역 */}
      <motion.div
        className={`
          upload-area relative border-2 border-dashed rounded-xl p-8
          transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:border-primary-400 hover:bg-primary-50/50'
          }
          ${isUploading ? 'pointer-events-none opacity-75' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: isUploading ? 1 : 1.01 }}
        whileTap={{ scale: isUploading ? 1 : 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* 미리보기 */}
        {showPreview && preview && !multiple && (
          <div className="mb-4 relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-lg object-contain"
            />
            {!isUploading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                title="이미지 제거"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* 업로드 안내 */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  업로드 중... {uploadProgress}%
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-primary-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-center">
                  <svg 
                    className="w-16 h-16 text-gray-400 dark:text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {preview ? '다른 이미지 선택' : '이미지를 드래그하거나 클릭하여 업로드'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    JPG, PNG, WebP (최대 {Math.round(maxSize / (1024 * 1024))}MB)
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 에러 메시지 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-start">
              <svg 
                className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd" 
                />
              </svg>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;

