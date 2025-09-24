// Firebase 설정 파일
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase 설정 (환경 변수 사용)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBH9dNPLyp1PS8JfarYF6hOEZUWFCctVDI",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "jungho-corp-website.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "jungho-corp-website",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "jungho-corp-website.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "813651314533",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:813651314533:web:2b2587926a984ed9be438c",
  measurementId: "G-CVNTX6J1WM"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스들 내보내기
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
