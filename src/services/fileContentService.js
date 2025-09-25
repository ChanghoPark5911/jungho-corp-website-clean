// 파일 기반 콘텐츠 저장 서비스 (Firebase 완전 제외)
class FileContentService {
  constructor() {
    this.storageKey = 'jungho-corp-content';
  }

  // 콘텐츠 저장 (로컬 스토리지만 사용)
  async saveContent(contentData) {
    try {
      const data = {
        ...contentData,
        updatedAt: new Date().toISOString(),
        version: Date.now(),
        source: 'file-storage'
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      console.log('파일 저장 성공:', data);
      
      return { success: true, data };
    } catch (error) {
      console.error('파일 저장 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 콘텐츠 로드 (로컬 스토리지만 사용)
  async loadContent() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsedData = JSON.parse(data);
        console.log('파일 로드 성공:', parsedData);
        return { success: true, data: parsedData };
      } else {
        console.log('저장된 파일이 없습니다');
        return { success: false, data: null };
      }
    } catch (error) {
      console.error('파일 로드 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 연결 테스트 (항상 성공)
  async testConnection() {
    return { success: true, message: '파일 저장소 연결 성공' };
  }
}

export default new FileContentService();

