import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../../config/api';

const ContentApprovalSystem = ({ currentUser, pendingApprovals: initialPendingApprovals = [], onApprovalChange }) => {
  const [pendingApprovals, setPendingApprovals] = useState(initialPendingApprovals);
  const [approvedContent, setApprovedContent] = useState([]);
  const [rejectedContent, setRejectedContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [approvalComment, setApprovalComment] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');

  // 승인 대기 중인 콘텐츠 목록
  useEffect(() => {
    if (initialPendingApprovals.length > 0) {
      setPendingApprovals(initialPendingApprovals);
    } else {
      loadPendingApprovals();
    }
  }, [initialPendingApprovals]);

  const loadPendingApprovals = () => {
    const savedApprovals = localStorage.getItem('contentApprovals');
    if (savedApprovals) {
      const approvals = JSON.parse(savedApprovals);
      setPendingApprovals(approvals.filter(a => a.status === 'pending'));
      setApprovedContent(approvals.filter(a => a.status === 'approved'));
      setRejectedContent(approvals.filter(a => a.status === 'rejected'));
    }
  };

  const handleApproval = (contentId, status, comment = '') => {
    const updatedApprovals = pendingApprovals.map(approval => {
      if (approval.id === contentId) {
        return {
          ...approval,
          status,
          approvedBy: currentUser?.username || '관리자',
          approvedAt: new Date().toISOString(),
          comment
        };
      }
      return approval;
    });

    // 상태별로 분류
    const newPending = updatedApprovals.filter(a => a.status === 'pending');
    const newApproved = updatedApprovals.filter(a => a.status === 'approved');
    const newRejected = updatedApprovals.filter(a => a.status === 'rejected');

    setPendingApprovals(newPending);
    setApprovedContent(prev => [...prev, ...newApproved]);
    setRejectedContent(prev => [...prev, ...newRejected]);

    // localStorage에 저장
    const allApprovals = [...newPending, ...newApproved, ...newRejected];
    localStorage.setItem('contentApprovals', JSON.stringify(allApprovals));

    // 콜백 호출 (승인된 콘텐츠 전체 객체 전달)
    if (onApprovalChange && status === 'approved') {
      const approvedContent = updatedApprovals.find(a => a.id === contentId && a.status === 'approved');
      if (approvedContent) {
        onApprovalChange(approvedContent); // 전체 승인 객체 전달
      }
    }

    setSelectedContent(null);
    setApprovalComment('');
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: '승인 대기',
      approved: '승인됨',
      rejected: '거부됨'
    };
    return labels[status] || status;
  };

  const renderContentDetails = (content) => {
    if (!content) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">콘텐츠 상세 보기</h3>
            <button
              onClick={() => setSelectedContent(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">기본 정보</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">제목:</span> {content.title}</p>
                <p><span className="font-medium">작성자:</span> {content.author}</p>
                <p><span className="font-medium">작성일:</span> {new Date(content.createdAt).toLocaleDateString('ko-KR')}</p>
                <p><span className="font-medium">섹션:</span> {content.section}</p>
                <p><span className="font-medium">상태:</span> 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusBadge(content.status)}`}>
                    {getStatusLabel(content.status)}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">변경 사항</h4>
              <div className="space-y-2 text-sm">
                {content.changes && Object.entries(content.changes).map(([field, change]) => (
                  <div key={field} className="border-l-2 border-blue-200 pl-3">
                    <p className="font-medium">{field}</p>
                    <p className="text-gray-600 line-through">{change.old}</p>
                    <p className="text-blue-600 font-medium">{change.new}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">전체 콘텐츠</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(content.content, null, 2)}</pre>
            </div>
          </div>

          {content.status === 'pending' && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  승인/거부 코멘트
                </label>
                <textarea
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="승인 또는 거부 이유를 입력하세요"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApproval(content.id, 'approved', approvalComment)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  승인
                </button>
                <button
                  onClick={() => handleApproval(content.id, 'rejected', approvalComment)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  거부
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContentList = (contentList, status) => {
    return contentList.map(content => (
      <div key={content.id} className="border rounded-lg p-4 hover:bg-gray-50">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{content.title}</h4>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{content.author}</span>
              <span>{new Date(content.createdAt).toLocaleDateString('ko-KR')}</span>
              <span>{content.section}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(content.status)}`}>
                {getStatusLabel(content.status)}
              </span>
            </div>
            {content.changes && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">변경된 필드:</span> {Object.keys(content.changes).join(', ')}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedContent(content)}
              className="text-primary-600 hover:text-primary-800 text-sm"
            >
              상세보기
            </button>
            {status === 'pending' && (
              <div className="flex gap-1">
                <button
                  onClick={() => handleApproval(content.id, 'approved')}
                  className="text-green-600 hover:text-green-800 text-sm px-2 py-1 rounded border border-green-200 hover:bg-green-50"
                >
                  승인
                </button>
                <button
                  onClick={() => handleApproval(content.id, 'rejected')}
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                >
                  거부
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">콘텐츠 승인 관리</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1 rounded-md text-sm ${
              filterStatus === 'pending'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            승인 대기 ({pendingApprovals.length})
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-3 py-1 rounded-md text-sm ${
              filterStatus === 'approved'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            승인됨 ({approvedContent.length})
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-3 py-1 rounded-md text-sm ${
              filterStatus === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            거부됨 ({rejectedContent.length})
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800">승인 대기</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingApprovals.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">승인됨</h3>
          <p className="text-2xl font-bold text-green-600">{approvedContent.length}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">거부됨</h3>
          <p className="text-2xl font-bold text-red-600">{rejectedContent.length}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">총 요청</h3>
          <p className="text-2xl font-bold text-blue-600">
            {pendingApprovals.length + approvedContent.length + rejectedContent.length}
          </p>
        </div>
      </div>

      {/* 콘텐츠 목록 */}
      <div className="space-y-4">
        {filterStatus === 'pending' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">승인 대기 중인 콘텐츠</h3>
            {pendingApprovals.length === 0 ? (
              <p className="text-gray-500 text-center py-8">승인 대기 중인 콘텐츠가 없습니다.</p>
            ) : (
              renderContentList(pendingApprovals, 'pending')
            )}
          </div>
        )}

        {filterStatus === 'approved' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">승인된 콘텐츠</h3>
            {approvedContent.length === 0 ? (
              <p className="text-gray-500 text-center py-8">승인된 콘텐츠가 없습니다.</p>
            ) : (
              renderContentList(approvedContent, 'approved')
            )}
          </div>
        )}

        {filterStatus === 'rejected' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">거부된 콘텐츠</h3>
            {rejectedContent.length === 0 ? (
              <p className="text-gray-500 text-center py-8">거부된 콘텐츠가 없습니다.</p>
            ) : (
              renderContentList(rejectedContent, 'rejected')
            )}
          </div>
        )}
      </div>

      {/* 콘텐츠 상세 모달 */}
      {renderContentDetails(selectedContent)}
    </div>
  );
};

export default ContentApprovalSystem;
