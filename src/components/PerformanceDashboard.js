import React, { useState, useEffect } from 'react';
import performanceMonitor from '../utils/performanceMonitor';

const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');

  useEffect(() => {
    loadMetrics();
    
    // 5초마다 메트릭 업데이트
    const interval = setInterval(loadMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = () => {
    const storedMetrics = performanceMonitor.getStoredMetrics();
    setMetrics(storedMetrics);
  };

  const filteredMetrics = metrics.filter(metric => {
    if (selectedMetric === 'all') return true;
    return metric.type === selectedMetric;
  });

  const getMetricIcon = (type) => {
    switch (type) {
      case 'pageLoad': return '📄';
      case 'interaction': return '👆';
      case 'scroll': return '📜';
      case 'error': return '❌';
      case 'memory': return '💾';
      case 'custom': return '🎯';
      case 'pageView': return '👁️';
      default: return '📊';
    }
  };

  const getMetricColor = (type) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'pageLoad': return 'text-blue-500';
      case 'interaction': return 'text-green-500';
      case 'scroll': return 'text-purple-500';
      case 'memory': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const clearMetrics = () => {
    performanceMonitor.clearMetrics();
    setMetrics([]);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 left-4 z-50 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200"
        title="성능 대시보드 열기"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-96 max-h-96 overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">성능 모니터링</h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="all">전체</option>
            <option value="pageLoad">페이지 로드</option>
            <option value="interaction">상호작용</option>
            <option value="scroll">스크롤</option>
            <option value="error">오류</option>
            <option value="memory">메모리</option>
            <option value="custom">커스텀</option>
            <option value="pageView">페이지 뷰</option>
          </select>
          <button
            onClick={clearMetrics}
            className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
          >
            초기화
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 메트릭 목록 */}
      <div className="max-h-80 overflow-y-auto">
        {filteredMetrics.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            메트릭이 없습니다
          </div>
        ) : (
          filteredMetrics.slice(-20).reverse().map((metric, index) => (
            <div
              key={index}
              className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getMetricIcon(metric.type)}</span>
                <span className={`text-xs font-medium ${getMetricColor(metric.type)}`}>
                  {metric.type}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimestamp(metric.timestamp)}
                </span>
              </div>
              
              {metric.data && (
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                  {metric.type === 'pageLoad' && (
                    <div>
                      로드 시간: {Math.round(metric.data.loadTime)}ms
                    </div>
                  )}
                  {metric.type === 'interaction' && (
                    <div>
                      {metric.data.element}: {metric.data.text}
                    </div>
                  )}
                  {metric.type === 'scroll' && (
                    <div>
                      스크롤: {Math.round(metric.data.scrollPercent)}%
                    </div>
                  )}
                  {metric.type === 'error' && (
                    <div className="text-red-500">
                      {metric.data.message}
                    </div>
                  )}
                  {metric.type === 'memory' && (
                    <div>
                      메모리: {Math.round(metric.data.usedJSHeapSize / 1024 / 1024)}MB
                    </div>
                  )}
                  {metric.type === 'custom' && (
                    <div>
                      {metric.data.eventName}: {JSON.stringify(metric.data.properties)}
                    </div>
                  )}
                  {metric.type === 'pageView' && (
                    <div>
                      페이지: {metric.data.pageName}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 푸터 */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          총 {filteredMetrics.length}개 메트릭
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;

