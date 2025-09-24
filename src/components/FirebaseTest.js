// Firebase 연결 테스트 컴포넌트
import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const FirebaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('테스트 중...');
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const testFirebaseConnection = async () => {
    try {
      // Firestore 연결 테스트
      const testCollection = collection(db, 'test');
      const testDoc = await addDoc(testCollection, {
        message: 'Firebase 연결 테스트',
        timestamp: new Date(),
        status: 'success'
      });
      
      // 데이터 조회 테스트
      const querySnapshot = await getDocs(testCollection);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      
      setTestData(data);
      setConnectionStatus('✅ Firebase 연결 성공!');
      
      console.log('Firebase 연결 테스트 성공:', data);
    } catch (error) {
      setConnectionStatus('❌ Firebase 연결 실패: ' + error.message);
      console.error('Firebase 연결 테스트 실패:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Firebase 연결 테스트</h2>
      
      <div className="mb-4">
        <p className="text-lg font-semibold">{connectionStatus}</p>
      </div>
      
      {testData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">테스트 데이터:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-4">
        <button 
          onClick={testFirebaseConnection}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          다시 테스트
        </button>
      </div>
    </div>
  );
};

export default FirebaseTest;

