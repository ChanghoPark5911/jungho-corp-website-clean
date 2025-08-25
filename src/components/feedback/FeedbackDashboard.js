import React, { useState } from 'react';
import Button from '../ui/Button';
import WebsiteFeedbackForm from './WebsiteFeedbackForm';
import ClarusFeedbackForm from './ClarusFeedbackForm';
import TexcomFeedbackForm from './TexcomFeedbackForm';
import TlcFeedbackForm from './TlcFeedbackForm';
import IllutechFeedbackForm from './IllutechFeedbackForm';

const FeedbackDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [feedbackData, setFeedbackData] = useState({
    website: [],
    clarus: [],
    texcom: [],
    tlc: [],
    illutech: []
  });

  const tabs = [
    { id: 'overview', label: '전체 개요', icon: '📊' },
    { id: 'website', label: '웹사이트 전체', icon: '🌐' },
    { id: 'clarus', label: 'Clarus', icon: '💡' },
    { id: 'texcom', label: 'Texcom', icon: '🧵' },
    { id: 'tlc', label: 'TLC', icon: '🔧' },
    { id: 'illutech', label: 'Illutech', icon: '📱' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab feedbackData={feedbackData} onTabChange={setActiveTab} />;
      case 'website':
        return <WebsiteFeedbackForm />;
      case 'clarus':
        return <ClarusFeedbackForm />;
      case 'texcom':
        return <TexcomFeedbackForm />;
      case 'tlc':
        return <TlcFeedbackForm />;
      case 'illutech':
        return <IllutechFeedbackForm />;
      default:
        return <OverviewTab feedbackData={feedbackData} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            웹사이트 피드백 관리 시스템
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            정호그룹 웹사이트의 각 계열사별, 분야별 피드백을 체계적으로 수집하고 관리합니다.
            담당자별로 상세한 의견을 작성하여 웹사이트 개발팀에 전달할 수 있습니다.
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="bg-white rounded-lg shadow-sm border">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// 전체 개요 탭 컴포넌트
const OverviewTab = ({ feedbackData, onTabChange }) => {
  const totalFeedback = Object.values(feedbackData).flat().length;
  const averageRating = totalFeedback > 0 
    ? (Object.values(feedbackData).flat().reduce((sum, item) => sum + (item.overallRating || 0), 0) / totalFeedback).toFixed(1)
    : 0;

  const priorityCounts = {
    urgent: 0,
    high: 0,
    medium: 0,
    low: 0
  };

  Object.values(feedbackData).flat().forEach(item => {
    if (item.priority) {
      priorityCounts[item.priority]++;
    }
  });

  const departmentCounts = {};
  Object.values(feedbackData).flat().forEach(item => {
    if (item.department) {
      departmentCounts[item.department] = (departmentCounts[item.department] || 0) + 1;
    }
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">피드백 현황 개요</h2>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">총 피드백 수</p>
              <p className="text-2xl font-bold text-blue-900">{totalFeedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">평균 평가</p>
              <p className="text-2xl font-bold text-green-900">{averageRating}/10</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">🚨</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">긴급 우선순위</p>
              <p className="text-2xl font-bold text-yellow-900">{priorityCounts.urgent}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">참여 부서</p>
              <p className="text-2xl font-bold text-purple-900">{Object.keys(departmentCounts).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 우선순위별 분포 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">우선순위별 분포</h3>
          <div className="space-y-3">
            {Object.entries(priorityCounts).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {priority === 'urgent' && '🚨 긴급'}
                  {priority === 'high' && '🔴 높음'}
                  {priority === 'medium' && '🟡 보통'}
                  {priority === 'low' && '🟢 낮음'}
                </span>
                <span className="text-sm font-semibold text-gray-900">{count}건</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">부서별 참여 현황</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {Object.entries(departmentCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([department, count]) => (
                <div key={department} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{department}</span>
                  <span className="text-sm font-semibold text-gray-900">{count}건</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 사용 가이드 */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">💡 피드백 작성 가이드</h3>
        <div className="text-blue-700 space-y-2">
          <p>• <strong>웹사이트 전체</strong>: 전체적인 구조, 네비게이션, 디자인 등에 대한 피드백</p>
          <p>• <strong>Clarus</strong>: 조명제어 기술, 제품 라인업, R&D 현황 등에 대한 피드백</p>
          <p>• <strong>Texcom</strong>: 섬유기계, 패션 브랜드, 기술 혁신 등에 대한 피드백</p>
          <p>• <strong>TLC</strong>: 서비스 영역, 전국 네트워크, 고객 지원 등에 대한 피드백</p>
          <p>• <strong>Illutech</strong>: 제품 카테고리, 고객 서비스, 이벤트 혜택 등에 대한 피드백</p>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Button
          variant="primary"
          onClick={() => onTabChange('website')}
          className="flex items-center space-x-2"
        >
          <span>🌐</span>
          <span>웹사이트 전체 피드백 작성</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => onTabChange('clarus')}
          className="flex items-center space-x-2"
        >
          <span>💡</span>
          <span>Clarus 피드백 작성</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => onTabChange('texcom')}
          className="flex items-center space-x-2"
        >
          <span>🧵</span>
          <span>Texcom 피드백 작성</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => onTabChange('tlc')}
          className="flex items-center space-x-2"
        >
          <span>🔧</span>
          <span>TLC 피드백 작성</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => onTabChange('illutech')}
          className="flex items-center space-x-2"
        >
          <span>📱</span>
          <span>Illutech 피드백 작성</span>
        </Button>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
