import React, { useState } from 'react';

const NewsManager = ({ data, onAdd, onDelete, onSave }) => {
  const [newsList, setNewsList] = useState(data);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    category: '기타',
    thumbnail: '',
    tags: '',
    link: '#',
    featured: false
  });

  const categories = [
    '수상', '사업확장', '파트너십', '프로젝트', 
    '기술개발', '실적', '특허', '전시회', '기타'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // 수정
      const updatedNews = newsList.map(news => 
        news.id === editingId 
          ? { ...formData, id: editingId, tags: formData.tags.split(',').map(tag => tag.trim()) }
          : news
      );
      setNewsList(updatedNews);
      onSave('news', updatedNews);
      setEditingId(null);
    } else {
      // 추가
      const newNews = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleDateString('ko-KR'),
        tags: formData.tags.split(',').map(tag => tag.trim())
      };
      onAdd(newNews);
      setNewsList([...newsList, newNews]);
    }
    
    // 폼 초기화
    setFormData({
      title: '',
      summary: '',
      category: '기타',
      thumbnail: '',
      tags: '',
      link: '#',
      featured: false
    });
    setIsAdding(false);
  };

  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      summary: news.summary,
      category: news.category,
      thumbnail: news.thumbnail,
      tags: news.tags.join(', '),
      link: news.link,
      featured: news.featured
    });
    setEditingId(news.id);
    setIsAdding(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말로 이 뉴스를 삭제하시겠습니까?')) {
      onDelete(id);
      setNewsList(newsList.filter(news => news.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: '',
      summary: '',
      category: '기타',
      thumbnail: '',
      tags: '',
      link: '#',
      featured: false
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">뉴스 관리</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            뉴스 추가
          </button>
        )}
      </div>

      {/* 뉴스 추가/수정 폼 */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? '뉴스 수정' : '새 뉴스 추가'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                요약 *
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  썸네일 이미지 URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  링크
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                태그 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="AI, CES, 수상"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                주요 뉴스로 설정
              </label>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {editingId ? '수정' : '추가'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 뉴스 목록 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">뉴스 목록</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {newsList.map((news) => (
            <div key={news.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{news.title}</h4>
                    {news.featured && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        주요뉴스
                      </span>
                    )}
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{news.summary}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{news.date}</span>
                    <span>•</span>
                    <span>태그: {news.tags.join(', ')}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(news)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(news.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsManager;



