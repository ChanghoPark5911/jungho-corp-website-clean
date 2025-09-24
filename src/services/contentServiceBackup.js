// 백업 콘텐츠 서비스 (Firebase 실패 시 로컬 스토리지 사용)
class ContentServiceBackup {
  constructor() {
    this.storageKey = 'jungho-corp-content';
  }

  // 로컬 스토리지에 저장
  async saveHomepageContent(contentData) {
    try {
      const data = {
        ...contentData,
        updatedAt: new Date().toISOString(),
        version: Date.now(),
        source: 'local-storage'
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      console.log('로컬 스토리지에 저장 완료:', data);
      
      return { success: true, data };
    } catch (error) {
      console.error('로컬 스토리지 저장 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 로컬 스토리지에서 로드
  async loadHomepageContent() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsedData = JSON.parse(data);
        console.log('로컬 스토리지에서 로드 성공:', parsedData);
        return { success: true, data: parsedData };
      } else {
        console.log('로컬 스토리지에 저장된 데이터가 없습니다');
        return { success: false, data: null };
      }
    } catch (error) {
      console.error('로컬 스토리지 로드 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 연결 테스트
  async testConnection() {
    try {
      // 로컬 스토리지는 항상 사용 가능
      return { success: true, message: '로컬 스토리지 연결 성공' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new ContentServiceBackup();
