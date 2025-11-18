// Firebase Storage 이미지 업로드 유틸리티
import { storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * 이미지 업로드 클래스
 * Firebase Storage에 이미지를 업로드하고 관리합니다
 */
class ImageUploadService {
  /**
   * 이미지 파일 유효성 검사
   * @param {File} file - 업로드할 파일
   * @param {Object} options - 검증 옵션
   * @returns {Object} { valid: boolean, error: string }
   */
  validateImage(file, options = {}) {
    const {
      maxSize = 10 * 1024 * 1024, // 기본 10MB
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
      minWidth = 0,
      minHeight = 0
    } = options;

    // 파일 존재 확인
    if (!file) {
      return { valid: false, error: '파일을 선택해주세요.' };
    }

    // 파일 타입 확인
    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `지원하지 않는 파일 형식입니다. (${allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}만 가능)` 
      };
    }

    // 파일 크기 확인
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      return { 
        valid: false, 
        error: `파일 크기가 너무 큽니다. (최대 ${maxSizeMB}MB)` 
      };
    }

    // 이미지 차원 확인 (옵션)
    if (minWidth > 0 || minHeight > 0) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (img.width < minWidth || img.height < minHeight) {
            resolve({ 
              valid: false, 
              error: `이미지 크기가 너무 작습니다. (최소 ${minWidth}x${minHeight}px 필요)` 
            });
          } else {
            resolve({ valid: true });
          }
        };
        img.onerror = () => {
          resolve({ valid: false, error: '이미지를 읽을 수 없습니다.' });
        };
        img.src = URL.createObjectURL(file);
      });
    }

    return { valid: true };
  }

  /**
   * 파일명 정리 (한글, 특수문자 제거, 타임스탬프 추가)
   * @param {string} originalName - 원본 파일명
   * @returns {string} 정리된 파일명
   */
  sanitizeFileName(originalName) {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    
    // 확장자 추출
    const ext = originalName.split('.').pop().toLowerCase();
    
    // 파일명에서 확장자 제거하고 정리
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    const sanitized = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')  // 영문, 숫자 외 문자를 - 로 변경
      .replace(/-+/g, '-')         // 연속된 -를 하나로
      .replace(/^-|-$/g, '')       // 앞뒤 - 제거
      .substring(0, 30);           // 최대 30자
    
    return `${sanitized || 'image'}_${timestamp}_${randomStr}.${ext}`;
  }

  /**
   * 이미지 업로드
   * @param {File} file - 업로드할 파일
   * @param {string} path - Storage 경로 (예: 'projects', 'subsidiaries')
   * @param {Function} onProgress - 진행률 콜백 (0-100)
   * @param {Object} options - 업로드 옵션
   * @returns {Promise<string>} 업로드된 이미지 URL
   */
  async uploadImage(file, path = 'images', onProgress = null, options = {}) {
    try {
      // 1. 파일 유효성 검사
      const validation = await this.validateImage(file, options);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // 2. 파일명 정리
      const fileName = this.sanitizeFileName(file.name);
      const fullPath = `${path}/${fileName}`;

      // 3. Storage 참조 생성
      const storageRef = ref(storage, fullPath);

      // 4. 메타데이터 설정
      const metadata = {
        contentType: file.type,
        customMetadata: {
          uploadedAt: new Date().toISOString(),
          originalName: file.name,
          size: file.size.toString()
        }
      };

      // 5. 업로드 시작
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // 진행률 계산 (0-100)
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            
            if (onProgress) {
              onProgress(progress);
            }

            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            // 에러 처리
            console.error('Upload error:', error);
            
            let errorMessage = '이미지 업로드 중 오류가 발생했습니다.';
            
            switch (error.code) {
              case 'storage/unauthorized':
                errorMessage = '업로드 권한이 없습니다.';
                break;
              case 'storage/canceled':
                errorMessage = '업로드가 취소되었습니다.';
                break;
              case 'storage/unknown':
                errorMessage = '알 수 없는 오류가 발생했습니다.';
                break;
            }
            
            reject(new Error(errorMessage));
          },
          async () => {
            // 업로드 완료
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at:', downloadURL);
              resolve(downloadURL);
            } catch (error) {
              console.error('Error getting download URL:', error);
              reject(new Error('이미지 URL을 가져오는데 실패했습니다.'));
            }
          }
        );
      });
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  /**
   * 여러 이미지 동시 업로드
   * @param {FileList|Array<File>} files - 업로드할 파일들
   * @param {string} path - Storage 경로
   * @param {Function} onProgress - 전체 진행률 콜백
   * @param {Object} options - 업로드 옵션
   * @returns {Promise<Array<string>>} 업로드된 이미지 URL 배열
   */
  async uploadMultipleImages(files, path = 'images', onProgress = null, options = {}) {
    const fileArray = Array.from(files);
    const totalFiles = fileArray.length;
    let completedFiles = 0;
    const results = [];

    for (const file of fileArray) {
      try {
        const url = await this.uploadImage(
          file,
          path,
          (fileProgress) => {
            // 개별 파일 진행률을 전체 진행률로 변환
            const overallProgress = Math.round(
              ((completedFiles + fileProgress / 100) / totalFiles) * 100
            );
            if (onProgress) {
              onProgress(overallProgress);
            }
          },
          options
        );
        
        results.push({ success: true, url, fileName: file.name });
        completedFiles++;
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        results.push({ success: false, error: error.message, fileName: file.name });
        completedFiles++;
      }
    }

    return results;
  }

  /**
   * 이미지 삭제
   * @param {string} imageUrl - 삭제할 이미지 URL
   * @returns {Promise<boolean>} 삭제 성공 여부
   */
  async deleteImage(imageUrl) {
    try {
      if (!imageUrl) {
        throw new Error('이미지 URL이 필요합니다.');
      }

      // Firebase Storage URL에서 경로 추출
      const path = this.extractPathFromUrl(imageUrl);
      
      if (!path) {
        throw new Error('유효하지 않은 이미지 URL입니다.');
      }

      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      
      console.log('Image deleted successfully:', path);
      return true;
    } catch (error) {
      console.error('Image deletion error:', error);
      
      if (error.code === 'storage/object-not-found') {
        console.warn('Image not found, may have been already deleted');
        return true; // 이미 삭제된 경우 성공으로 처리
      }
      
      throw error;
    }
  }

  /**
   * Firebase Storage URL에서 경로 추출
   * @param {string} url - Firebase Storage URL
   * @returns {string|null} 추출된 경로
   */
  extractPathFromUrl(url) {
    try {
      // Firebase Storage URL 형식:
      // https://firebasestorage.googleapis.com/v0/b/[bucket]/o/[path]?...
      const match = url.match(/\/o\/(.+?)\?/);
      if (match && match[1]) {
        // URL 디코딩 (예: %2F -> /)
        return decodeURIComponent(match[1]);
      }
      return null;
    } catch (error) {
      console.error('Error extracting path from URL:', error);
      return null;
    }
  }

  /**
   * 이미지 리사이즈 (클라이언트 측)
   * @param {File} file - 원본 이미지 파일
   * @param {Object} options - 리사이즈 옵션
   * @returns {Promise<File>} 리사이즈된 이미지 파일
   */
  async resizeImage(file, options = {}) {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.9,
      outputType = 'image/jpeg'
    } = options;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          // 원본 크기가 이미 작으면 그대로 반환
          if (img.width <= maxWidth && img.height <= maxHeight) {
            resolve(file);
            return;
          }

          // 비율 유지하면서 리사이즈
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          // Canvas에 그리기
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Blob으로 변환
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('이미지 리사이즈 실패'));
                return;
              }

              // File 객체로 변환
              const resizedFile = new File([blob], file.name, {
                type: outputType,
                lastModified: Date.now()
              });

              resolve(resizedFile);
            },
            outputType,
            quality
          );
        };

        img.onerror = () => {
          reject(new Error('이미지를 읽을 수 없습니다.'));
        };

        img.src = e.target.result;
      };

      reader.onerror = () => {
        reject(new Error('파일을 읽을 수 없습니다.'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * 이미지 업로드 (자동 리사이즈 포함)
   * @param {File} file - 업로드할 파일
   * @param {string} path - Storage 경로
   * @param {Function} onProgress - 진행률 콜백
   * @param {Object} options - 업로드 옵션 (resize 옵션 포함)
   * @returns {Promise<string>} 업로드된 이미지 URL
   */
  async uploadImageWithResize(file, path = 'images', onProgress = null, options = {}) {
    try {
      const { resize = true, ...uploadOptions } = options;

      let fileToUpload = file;

      if (resize) {
        console.log('Resizing image before upload...');
        fileToUpload = await this.resizeImage(file, options);
        console.log(`Image resized: ${file.size} -> ${fileToUpload.size} bytes`);
      }

      return await this.uploadImage(fileToUpload, path, onProgress, uploadOptions);
    } catch (error) {
      console.error('Upload with resize error:', error);
      throw error;
    }
  }
}

// 싱글톤 인스턴스 생성
const imageUploadService = new ImageUploadService();

export default imageUploadService;

// 개별 함수 export (편의성)
export const {
  validateImage,
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  resizeImage,
  uploadImageWithResize
} = imageUploadService;

