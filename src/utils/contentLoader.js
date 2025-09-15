// 콘텐츠 로딩 유틸리티
class ContentLoader {
  constructor() {
    this.cache = new Map();
    this.retryCount = 3;
    this.retryDelay = 1000;
  }

  // 안전한 데이터 로딩
  async loadContent(contentType, fallbackData = null) {
    try {
      // 캐시된 데이터 확인
      if (this.cache.has(contentType)) {
        return this.cache.get(contentType);
      }

      // API에서 데이터 로드
      const response = await fetch(`/public/content/${contentType}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // 캐시에 저장
        this.cache.set(contentType, result.data);
        return result.data;
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error(`콘텐츠 로딩 실패 (${contentType}):`, error);
      
      // 로컬스토리지에서 백업 데이터 확인
      const backupData = localStorage.getItem(`${contentType}_backup`);
      if (backupData) {
        try {
          const parsed = JSON.parse(backupData);
          return parsed;
        } catch (e) {
          console.error('백업 데이터 파싱 실패:', e);
        }
      }
      
      // 기본 데이터 반환
      return fallbackData;
    }
  }

  // 데이터 유효성 검증
  validateContent(data, schema) {
    if (!data || typeof data !== 'object') return false;
    
    for (const [key, required] of Object.entries(schema)) {
      if (required && !data[key]) return false;
    }
    
    return true;
  }

  // 캐시 무효화
  invalidateCache(contentType = null) {
    if (contentType) {
      this.cache.delete(contentType);
    } else {
      this.cache.clear();
    }
  }

  // 백업 데이터 저장
  saveBackup(contentType, data) {
    try {
      localStorage.setItem(`${contentType}_backup`, JSON.stringify(data));
      localStorage.setItem(`${contentType}_backup_timestamp`, Date.now().toString());
    } catch (error) {
      console.error('백업 저장 실패:', error);
    }
  }
}

export default new ContentLoader();
