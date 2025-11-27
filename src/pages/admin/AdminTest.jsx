import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminTest = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#1a202c',
      color: 'white',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        ✅ 관리자 시스템 테스트
      </h1>
      <p style={{ marginBottom: '30px', fontSize: '1.2rem' }}>
        페이지가 정상적으로 로드되었습니다!
      </p>
      
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', maxWidth: '400px' }}>
        <button 
          onClick={() => navigate('/admin-new/login')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          로그인 페이지로
        </button>
        
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          홈페이지로
        </button>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#2d3748', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '10px' }}>💡 정보</h3>
        <p style={{ fontSize: '0.9rem' }}>현재 경로: {window.location.pathname}</p>
        <p style={{ fontSize: '0.9rem' }}>인증 상태: {sessionStorage.getItem('adminAuthenticated') || '없음'}</p>
      </div>
    </div>
  );
};

export default AdminTest;

