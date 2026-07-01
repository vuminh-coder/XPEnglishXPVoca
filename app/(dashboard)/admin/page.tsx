'use client';
import React, { useState } from 'react';
import { MOCK_THEMES, MOCK_VOCABULARIES } from '@/lib/constants';
import { useAuthStore } from '@/lib/store/authStore';

export default function AdminPage() {
  const { awardXp } = useAuthStore();
  const [vocabs, setVocabs] = useState(MOCK_VOCABULARIES);
  
  // Form states
  const [word, setWord] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [pos, setPos] = useState('noun');
  const [defVn, setDefVn] = useState('');
  const [defEn, setDefEn] = useState('');
  const [example, setExample] = useState('');
  const [themeId, setThemeId] = useState('t1');

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check duplication
    if (vocabs.some(v => v.word.toLowerCase() === word.toLowerCase())) {
      alert('Từ vựng này đã tồn tại trong hệ thống!');
      return;
    }

    const newVocab = {
      id: 'v_' + Date.now(),
      word,
      phonetic,
      definition: defEn,
      definitionVn: defVn,
      pos,
      difficulty: 3,
      frequency: 5,
      themeId,
      examples: [example],
      synonyms: [],
      antonyms: []
    };

    setVocabs([...vocabs, newVocab]);
    
    // Clear inputs
    setWord('');
    setPhonetic('');
    setDefVn('');
    setDefEn('');
    setExample('');
    
    awardXp(20);
    alert(`Đã thêm từ "${word}" vào cơ sở dữ liệu!`);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down">
        <h1 className="page-title">⚙️ Quản trị hệ thống từ vựng</h1>
        <p className="page-subtitle">Nhập liệu và thêm từ vựng mới vào bộ từ điển XP Voca.</p>
      </div>

      <div className="grid grid-3 gap-6 animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Add Word Form */}
        <div className="card">
          <h3 className="font-bold mb-4">Thêm từ vựng mới</h3>
          <form className="auth-form" onSubmit={handleAddWord}>
            <div className="input-group">
              <label>Từ tiếng Anh</label>
              <input 
                type="text" 
                className="input-field" 
                value={word}
                onChange={e => setWord(e.target.value)}
                required 
                placeholder="Ví dụ: Synergy" 
              />
            </div>
            <div className="input-group">
              <label>Phát âm</label>
              <input 
                type="text" 
                className="input-field" 
                value={phonetic}
                onChange={e => setPhonetic(e.target.value)}
                required 
                placeholder="Ví dụ: /ˈsɪn.ə.dʒi/" 
              />
            </div>
            <div className="input-group">
              <label>Từ loại</label>
              <select 
                className="input-field" 
                value={pos}
                onChange={e => setPos(e.target.value)}
              >
                <option value="noun">Danh từ (Noun)</option>
                <option value="verb">Động từ (Verb)</option>
                <option value="adjective">Tính từ (Adjective)</option>
                <option value="adverb">Trạng từ (Adverb)</option>
              </select>
            </div>
            <div className="input-group">
              <label>Nghĩa tiếng Việt</label>
              <input 
                type="text" 
                className="input-field" 
                value={defVn}
                onChange={e => setDefVn(e.target.value)}
                required 
                placeholder="Ví dụ: Sự hiệp lực" 
              />
            </div>
            <div className="input-group">
              <label>Định nghĩa tiếng Anh</label>
              <textarea 
                className="input-field" 
                value={defEn}
                onChange={e => setDefEn(e.target.value)}
                required 
                placeholder="Synergy describes the combined power..."
                style={{ minHeight: '80px' }}
              />
            </div>
            <div className="input-group">
              <label>Ví dụ minh họa</label>
              <input 
                type="text" 
                className="input-field" 
                value={example}
                onChange={e => setExample(e.target.value)}
                required 
                placeholder="The synergy between the two companies created great results." 
              />
            </div>
            <div className="input-group">
              <label>Chủ đề (Theme)</label>
              <select 
                className="input-field" 
                value={themeId}
                onChange={e => setThemeId(e.target.value)}
              >
                {MOCK_THEMES.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary w-full cursor-pointer" type="submit">Thêm từ vựng</button>
          </form>
        </div>

        {/* Words List Table */}
        <div className="admin-table card" style={{ overflow: 'hidden' }}>
          <div className="p-4 font-bold border-bottom">Danh sách từ vựng hiện tại ({vocabs.length})</div>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border-b font-semibold">Từ</th>
                  <th className="p-3 border-b font-semibold">Phiên âm</th>
                  <th className="p-3 border-b font-semibold">Từ loại</th>
                  <th className="p-3 border-b font-semibold">Nghĩa tiếng Việt</th>
                  <th className="p-3 border-b font-semibold">Chủ đề</th>
                </tr>
              </thead>
              <tbody>
                {vocabs.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="p-3 border-b"><b>{v.word}</b></td>
                    <td className="p-3 border-b">{v.phonetic}</td>
                    <td className="p-3 border-b"><span className="badge badge-primary">{v.pos}</span></td>
                    <td className="p-3 border-b">{v.definitionVn}</td>
                    <td className="p-3 border-b">{MOCK_THEMES.find(t => t.id === v.themeId)?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
