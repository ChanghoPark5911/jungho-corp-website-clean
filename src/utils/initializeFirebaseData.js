import staticPageContentService from '../services/staticPageContentService';

// Firebase 초기 데이터 설정
export const initializeAllFirebaseData = async () => {
  console.log('🚀 Firebase 초기 데이터 설정 시작...');
  
  try {
    // 1. 사업영역 페이지 초기화
    console.log('📄 사업영역 페이지 초기화...');
    const businessContent = staticPageContentService.getDefaultBusinessContent();
    await staticPageContentService.saveStaticPageContent('business', businessContent);
    console.log('✅ 사업영역 페이지 초기화 완료');
    
    // 2. 고객지원 페이지 초기화
    console.log('📄 고객지원 페이지 초기화...');
    const supportContent = staticPageContentService.getDefaultSupportContent();
    await staticPageContentService.saveStaticPageContent('support', supportContent);
    console.log('✅ 고객지원 페이지 초기화 완료');
    
    console.log('🎉 모든 Firebase 초기 데이터 설정 완료!');
    return {
      success: true,
      message: 'Firebase 초기 데이터 설정이 완료되었습니다.',
      businessContent,
      supportContent
    };
  } catch (error) {
    console.error('❌ Firebase 초기 데이터 설정 실패:', error);
    return {
      success: false,
      message: 'Firebase 초기 데이터 설정 실패: ' + error.message,
      error
    };
  }
};

// 개별 페이지 초기화
export const initializeBusinessPage = async () => {
  try {
    const businessContent = staticPageContentService.getDefaultBusinessContent();
    await staticPageContentService.saveStaticPageContent('business', businessContent);
    return { success: true, content: businessContent };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const initializeSupportPage = async () => {
  try {
    const supportContent = staticPageContentService.getDefaultSupportContent();
    await staticPageContentService.saveStaticPageContent('support', supportContent);
    return { success: true, content: supportContent };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const initializeUtils = {
  initializeAllFirebaseData,
  initializeBusinessPage,
  initializeSupportPage
};

export default initializeUtils;
