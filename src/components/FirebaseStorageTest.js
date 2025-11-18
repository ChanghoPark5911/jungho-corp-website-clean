import React, { useState } from 'react';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Firebase Storage 연결 테스트 컴포넌트
 */
const FirebaseStorageTest = () => {
  const [status, setStatus] = useState('대기 중');
  const [error, setError] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const testConnection = async () => {
    setStatus('테스트 중...');
    setError(null);
    setUploadResult(null);

    try {
      // 1. Storage 객체 확인
      console.log('Storage 객체:', storage);
      setStatus('✅ Storage 객체 생성 완료');
      
      await new Promise(resolve => setTimeout(resolve, 500));

      // 2. 간단한 텍스트 파일 업로드 테스트
      const testData = new Blob(['Firebase Storage Test'], { type: 'text/plain' });
      const testRef = ref(storage, 'test/connection-test.txt');
      
      setStatus('📤 테스트 파일 업로드 중...');
      await uploadBytes(testRef, testData);
      
      setStatus('✅ 업로드 성공!');
      
      // 3. URL 가져오기
      const url = await getDownloadURL(testRef);
      
      setUploadResult({
        success: true,
        message: '✅ Firebase Storage 연결 성공!',
        url: url
      });
      
      setStatus('🎉 모든 테스트 완료!');
    } catch (err) {
      console.error('테스트 실패:', err);
      setError(err);
      
      let errorMessage = '❌ Firebase Storage 연결 실패';
      let solution = '';
      
      if (err.code === 'storage/unauthorized') {
        errorMessage = '❌ 권한 오류: Firebase Storage 보안 규칙을 확인하세요';
        solution = `
해결 방법:
1. Firebase Console 접속: https://console.firebase.google.com/project/jungho-corp-website/storage
2. "규칙" 탭 클릭
3. 다음 규칙 추가:
   allow read, write: if true;
4. "게시" 버튼 클릭
        `;
      } else if (err.code === 'storage/unauthenticated') {
        errorMessage = '❌ 인증 오류';
        solution = '개발 모드에서는 인증 없이 업로드가 가능하도록 보안 규칙을 설정해야 합니다.';
      } else if (err.message?.includes('Firebase Storage is not initialized')) {
        errorMessage = '❌ Firebase Storage가 초기화되지 않음';
        solution = `
해결 방법:
1. Firebase Console에서 Storage 활성화
2. https://console.firebase.google.com/project/jungho-corp-website/storage
3. "시작하기" 버튼 클릭
        `;
      }
      
      setUploadResult({
        success: false,
        message: errorMessage,
        solution: solution,
        errorCode: err.code,
        errorMessage: err.message
      });
      
      setStatus('❌ 테스트 실패');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        🔧 Firebase Storage 연결 테스트
      </h2>
      
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            상태:
          </div>
          <div className="text-sm text-gray-900 dark:text-white font-semibold">
            {status}
          </div>
        </div>
        
        <button
          onClick={testConnection}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
        >
          🧪 연결 테스트 시작
        </button>
      </div>

      {uploadResult && (
        <div className={`p-4 rounded-lg border-2 ${
          uploadResult.success 
            ? 'bg-green-50 border-green-500 dark:bg-green-900/20' 
            : 'bg-red-50 border-red-500 dark:bg-red-900/20'
        }`}>
          <div className="font-bold mb-2 text-gray-900 dark:text-white">
            {uploadResult.message}
          </div>
          
          {uploadResult.success && (
            <div className="text-sm text-gray-700 dark:text-gray-300 break-all">
              <div className="font-medium mb-1">업로드된 파일 URL:</div>
              <code className="bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                {uploadResult.url}
              </code>
            </div>
          )}
          
          {!uploadResult.success && (
            <div className="mt-4 space-y-2">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <div className="font-medium">에러 코드:</div>
                <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">
                  {uploadResult.errorCode}
                </code>
              </div>
              
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <div className="font-medium">에러 메시지:</div>
                <code className="bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                  {uploadResult.errorMessage}
                </code>
              </div>
              
              {uploadResult.solution && (
                <div className="text-sm text-gray-700 dark:text-gray-300 mt-4">
                  <div className="font-bold mb-2">💡 해결 방법:</div>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded whitespace-pre-wrap text-xs">
                    {uploadResult.solution}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-700">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            🔍 상세 에러 정보:
          </div>
          <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <div className="font-bold mb-2">📝 참고:</div>
          <ul className="space-y-1 list-disc list-inside">
            <li>이 테스트는 Firebase Storage 연결 상태를 확인합니다</li>
            <li>테스트 파일이 /test/ 폴더에 업로드됩니다</li>
            <li>에러가 발생하면 해결 방법이 표시됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FirebaseStorageTest;

