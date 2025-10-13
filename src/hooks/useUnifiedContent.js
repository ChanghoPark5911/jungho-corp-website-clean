import { useState, useEffect } from 'react';
import unifiedContentService from '../services/unifiedContentService';

// 통합 콘텐츠 훅
const useUnifiedContent = () => {
  const [currentLanguage, setCurrentLanguage] = useState('ko'); // 기본값으로 한국어 설정
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`📖 ${currentLanguage} 통합 콘텐츠 로드 시작...`);
        
        // 1. 미리보기 데이터 우선 확인
        const previewContent = localStorage.getItem('homepage_preview');
        if (previewContent) {
          try {
            const parsedPreview = JSON.parse(previewContent);
            setContent(parsedPreview);
            console.log(`👁️ 미리보기 데이터 로드:`, parsedPreview);
            setLoading(false);
            return;
          } catch (parseError) {
            console.warn('미리보기 데이터 파싱 오류:', parseError);
          }
        }
        
        // 2. localStorage에서 확인 (관리자에서 최근 저장한 데이터)
        const localContentKey = `homepage_content_${currentLanguage}`;
        const localContent = localStorage.getItem(localContentKey);
        
        if (localContent) {
          try {
            const parsedContent = JSON.parse(localContent);
            setContent(parsedContent);
            console.log(`✅ ${currentLanguage} localStorage 콘텐츠 로드 성공:`, parsedContent);
            setLoading(false);
            return;
          } catch (parseError) {
            console.warn('localStorage 데이터 파싱 오류:', parseError);
          }
        }
        
        // 2. Firebase에서 로드
        const languageContent = await unifiedContentService.loadContentByLanguage(currentLanguage);
        
        if (languageContent) {
          setContent(languageContent);
          console.log(`✅ ${currentLanguage} Firebase 콘텐츠 로드 성공:`, languageContent);
        } else {
          // 폴백: 한국어 기본값
          const defaultContent = unifiedContentService.getDefaultKoreanContent();
          setContent(defaultContent);
          console.log(`⚠️ ${currentLanguage} 콘텐츠 없음, 한국어 기본값 사용:`, defaultContent);
        }
      } catch (err) {
        console.error(`❌ ${currentLanguage} 통합 콘텐츠 로드 실패:`, err);
        setError(err);
        
        // 오류 시 한국어 기본값 사용
        const defaultContent = unifiedContentService.getDefaultKoreanContent();
        setContent(defaultContent);
        console.log(`🔄 오류 발생, 한국어 기본값 사용:`, defaultContent);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  return { content, loading, error };
};

export default useUnifiedContent;
