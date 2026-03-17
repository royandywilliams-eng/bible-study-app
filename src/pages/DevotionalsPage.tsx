import React, { useEffect, useState } from 'react';
import { useDevotonalsStore } from '../store/useDevotonalsStore';
import { generateCompleteDevotonalsData } from '../data/devotionalsData';

interface DevotionalsPageProps {
  isDarkMode: boolean;
  onNavigateToPage?: (page: 'home' | 'search' | 'browse' | 'bible' | 'devotionals' | 'notes' | 'settings') => void;
}

const DifficultyColors = {
  beginner: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
  intermediate: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
  advanced: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
};

export const DevotionalsPage: React.FC<DevotionalsPageProps> = ({ isDarkMode, onNavigateToPage }) => {
  const {
    devotionals,
    todayDevotional,
    loadDevotionals,
    markCompleted,
    saveReflection,
    setDifficultyFilter,
    selectedDifficulty,
    getFilteredDevotionals,
    getStreak,
    getStats,
    exportAsCSV
  } = useDevotonalsStore();

  const [userNotes, setUserNotes] = useState('');
  const [showPastDevotionals, setShowPastDevotionals] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize devotionals on first load
  useEffect(() => {
    if (devotionals.length === 0) {
      const allDevotionals = generateCompleteDevotonalsData();
      loadDevotionals(allDevotionals);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [devotionals.length, loadDevotionals]);

  // Load user notes from today's devotional
  useEffect(() => {
    if (todayDevotional?.userNotes) {
      setUserNotes(todayDevotional.userNotes);
    } else {
      setUserNotes('');
    }
  }, [todayDevotional]);

  if (!isInitialized || !todayDevotional) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>Loading devotionals...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const streak = getStreak();
  const handleMarkComplete = () => {
    markCompleted(todayDevotional.id, !todayDevotional.completed);
  };

  const handleSaveReflection = () => {
    saveReflection(todayDevotional.id, userNotes);
  };

  const handleExport = () => {
    const csv = exportAsCSV();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'devotional-reflections.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredDevotionals = getFilteredDevotionals();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              marginBottom: '0.5rem',
              fontSize: '2rem',
              margin: 0
            }}
          >
            ✨ Daily Devotional
          </h1>
          <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: 0 }}>
            Spiritual reflection and growth for new Christians
          </p>
        </div>

        {/* Today's Devotional */}
        <div
          style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
            border: `2px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
            <div>
              <h2
                style={{
                  color: isDarkMode ? '#f1f5f9' : '#1f2937',
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.5rem'
                }}
              >
                {todayDevotional.title}
              </h2>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                  className={DifficultyColors[todayDevotional.difficulty as 'beginner' | 'intermediate' | 'advanced']}
                >
                  {todayDevotional.difficulty.charAt(0).toUpperCase() + todayDevotional.difficulty.slice(1)}
                </span>
                {streak > 0 && (
                  <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    🔥 {streak} day{streak !== 1 ? 's' : ''} streak!
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleMarkComplete}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: todayDevotional.completed ? '#10b981' : '#e5e7eb',
                color: todayDevotional.completed ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              {todayDevotional.completed ? '✓ Completed' : 'Mark Complete'}
            </button>
          </div>

          {/* Passages */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
              📖 Passages
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {todayDevotional.passages.map((passage, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigateToPage?.('bible')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: isDarkMode ? '#334155' : '#e2e8f0',
                    color: isDarkMode ? '#e2e7ff' : '#2563eb',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: '500'
                  }}
                >
                  {passage}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Reading */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 0.75rem 0', fontSize: '0.9rem', fontWeight: '600' }}>
              📚 Daily Reading
            </h3>
            <p
              style={{
                color: isDarkMode ? '#e2e7eb' : '#374151',
                lineHeight: '1.8',
                margin: 0,
                fontSize: '0.95rem'
              }}
            >
              {todayDevotional.dailyReading}
            </p>
          </div>

          {/* Reflection Prompt */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '600' }}>
              💭 Reflection Prompt
            </h3>
            <p
              style={{
                color: isDarkMode ? '#cbd5e1' : '#64748b',
                fontStyle: 'italic',
                margin: 0
              }}
            >
              {todayDevotional.reflection}
            </p>
          </div>

          {/* Reflection Questions */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '600' }}>
              Questions for Reflection
            </h3>
            <ul
              style={{
                color: isDarkMode ? '#cbd5e1' : '#64748b',
                paddingLeft: '1.5rem',
                margin: 0
              }}
            >
              {todayDevotional.prompts.map((prompt, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {prompt}
                </li>
              ))}
            </ul>
          </div>

          {/* User Reflection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 0.75rem 0', fontSize: '0.9rem', fontWeight: '600' }}>
              ✍️ My Reflection
            </h3>
            <textarea
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Write your personal thoughts and prayers here..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                backgroundColor: isDarkMode ? '#0f172a' : 'white',
                color: isDarkMode ? '#e2e7eb' : '#1f2937',
                border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                resize: 'vertical'
              }}
            />
            <button
              onClick={handleSaveReflection}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              Save Reflection
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
              {streak}
            </div>
            <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
              Day Streak 🔥
            </div>
          </div>

          <div
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem' }}>
              {stats.completedThisWeek}/7
            </div>
            <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
              This Week ✅
            </div>
          </div>

          <div
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
              {stats.percentage}%
            </div>
            <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
              Overall 📊
            </div>
          </div>

          <div
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
              {stats.completed}
            </div>
            <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
              Completed 🏆
            </div>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937', marginBottom: '1rem' }}>
            Filter by Difficulty
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficultyFilter(level)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor:
                    selectedDifficulty === level
                      ? '#2563eb'
                      : isDarkMode
                      ? '#1e293b'
                      : '#f0f0f0',
                  color:
                    selectedDifficulty === level
                      ? 'white'
                      : isDarkMode
                      ? '#cbd5e1'
                      : '#64748b',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Past Devotionals */}
        <div>
          <button
            onClick={() => setShowPastDevotionals(!showPastDevotionals)}
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              color: isDarkMode ? '#cbd5e1' : '#64748b',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              padding: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              width: '100%',
              textAlign: 'left',
              marginBottom: '1rem'
            }}
          >
            {showPastDevotionals ? '▼' : '▶'} Past Devotionals ({filteredDevotionals.length})
          </button>

          {showPastDevotionals && (
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1rem'
                }}
              >
                {filteredDevotionals.slice(0, 30).map((devotional) => (
                  <div
                    key={devotional.id}
                    style={{
                      backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '6px',
                      border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start'
                    }}
                  >
                    <div>
                      <p
                        style={{
                          color: isDarkMode ? '#f1f5f9' : '#1f2937',
                          fontWeight: '500',
                          margin: '0 0 0.25rem 0'
                        }}
                      >
                        {devotional.title}
                      </p>
                      <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.85rem', margin: 0 }}>
                        {devotional.date}
                      </p>
                    </div>
                    <span style={{ fontSize: '1.2rem' }}>{devotional.completed ? '✅' : '⭕'}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleExport}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                📥 Export All Reflections as CSV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
