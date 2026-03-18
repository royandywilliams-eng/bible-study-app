import React, { useState, useMemo } from 'react';
import { useNotesStore } from '../store/useNotesStore';
import { useMemoryVerseStore } from '../store/useMemoryVerseStore';
import type { MemoryVerse, DifficultyLevel } from '../services/MemoryVerseService';

interface MemoryVersePageProps {
  isDarkMode: boolean;
}

type ViewType = 'dashboard' | 'select-verses' | 'quiz' | 'results' | 'history';

export const MemoryVersePage: React.FC<MemoryVersePageProps> = ({ isDarkMode }) => {
  const notes = useNotesStore((state) => state.notes);
  const memoryVerses = useMemoryVerseStore((state) => state.memoryVerses);
  const currentSession = useMemoryVerseStore((state) => state.currentSession);
  const {
    removeMemoryVerse,
    getStatistics,
    getVersesByDifficulty,
    getVersesDueForReview,
    startSession,
    recordAnswer,
    completeSession,
    getSessionHistory
  } = useMemoryVerseStore();

  const [view, setView] = useState<ViewType>('dashboard');
  const [selectedVerses, setSelectedVerses] = useState<MemoryVerse[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<any>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');

  // Get highlighted verses available for memorization
  const availableHighlights = useMemo(() => {
    return notes.filter(n => n.type === 'highlight' && !memoryVerses.find(mv => mv.passageId === n.passageId));
  }, [notes, memoryVerses]);

  // Get verses due for review
  const versesDueForReview = useMemo(() => {
    return getVersesDueForReview(10);
  }, [getVersesDueForReview]);

  // Get filtered memory verses
  const filteredMemoryVerses = useMemo(() => {
    if (difficultyFilter === 'all') {
      return memoryVerses;
    }
    return getVersesByDifficulty(difficultyFilter as DifficultyLevel);
  }, [memoryVerses, difficultyFilter, getVersesByDifficulty]);

  const stats = getStatistics();

  const handleRemoveFromMemorization = (verseId: string) => {
    removeMemoryVerse(verseId);
  };

  const handleStartQuiz = () => {
    if (selectedVerses.length > 0) {
      startSession(selectedVerses);
      setView('quiz');
      setCurrentChallengeIndex(0);
    }
  };

  const handleAnswerQuestion = (answer: string) => {
    if (!currentSession || !currentSession.challenges[currentChallengeIndex]) return;

    const challenge = currentSession.challenges[currentChallengeIndex];
    recordAnswer(challenge, answer);

    if (currentChallengeIndex < currentSession.challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else {
      // Quiz complete
      const completed = completeSession();
      if (completed) {
        setSessionResults(completed);
        setView('results');
      }
    }
  };

  const renderDashboard = () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <StatCard
          icon="🎯"
          title="Total Verses"
          value={stats.totalMemoryVerses}
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon="✅"
          title="Mastered"
          value={stats.mastered}
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon="📚"
          title="Learning"
          value={stats.learning}
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon="🔥"
          title="Current Streak"
          value={stats.currentStreak}
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon="📊"
          title="Accuracy"
          value={`${Math.round(stats.accuracy)}%`}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => {
            setSelectedVerses(versesDueForReview);
            setView('select-verses');
          }}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
        >
          📖 Start Review ({versesDueForReview.length})
        </button>

        <button
          onClick={() => setView('select-verses')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#10b981',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#10b981';
          }}
        >
          ➕ Add New Verses ({availableHighlights.length})
        </button>

        <button
          onClick={() => setView('history')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#f59e0b',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#d97706';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f59e0b';
          }}
        >
          📋 Quiz History
        </button>
      </div>

      {/* Memory Verses List */}
      <div>
        <h3 style={{
          margin: '0 0 1rem 0',
          color: isDarkMode ? '#f1f5f9' : '#1f2937'
        }}>
          📚 My Memory Verses ({memoryVerses.length})
        </h3>

        <div style={{
          marginBottom: '1rem',
          display: 'flex',
          gap: '0.5rem'
        }}>
          {(['all', 'easy', 'medium', 'hard'] as const).map(level => (
            <button
              key={level}
              onClick={() => setDifficultyFilter(level)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: difficultyFilter === level ? '2px solid #2563eb' : `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                backgroundColor: difficultyFilter === level
                  ? '#2563eb'
                  : (isDarkMode ? '#1e293b' : '#f8f9fa'),
                color: difficultyFilter === level ? 'white' : (isDarkMode ? '#cbd5e1' : '#64748b'),
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {filteredMemoryVerses.length === 0 ? (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
            borderRadius: '8px',
            color: isDarkMode ? '#cbd5e1' : '#64748b'
          }}>
            <p>No memory verses yet. Add highlighted verses to start memorizing!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredMemoryVerses.map(verse => (
              <div
                key={verse.id}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                  borderLeft: `4px solid ${verse.difficulty === 'easy' ? '#10b981' : verse.difficulty === 'medium' ? '#f59e0b' : '#ef4444'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.85rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      backgroundColor: isDarkMode ? '#0f172a' : '#e0e7ff',
                      color: isDarkMode ? '#93c5fd' : '#1e40af',
                      marginRight: '0.5rem'
                    }}>
                      {verse.bookName} {verse.chapterNum}:{verse.verseNum}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      backgroundColor: verse.difficulty === 'easy' ? '#d1fae5' : verse.difficulty === 'medium' ? '#fed7aa' : '#fee2e2',
                      color: verse.difficulty === 'easy' ? '#065f46' : verse.difficulty === 'medium' ? '#92400e' : '#7f1d1d'
                    }}>
                      {verse.difficulty.charAt(0).toUpperCase() + verse.difficulty.slice(1)}
                    </span>
                  </div>
                  <p style={{
                    margin: '0.5rem 0 0 0',
                    color: isDarkMode ? '#cbd5e1' : '#64748b',
                    lineHeight: '1.6'
                  }}>
                    {verse.verseText}
                  </p>
                  <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.85rem',
                    color: isDarkMode ? '#94a3b8' : '#94a3b8'
                  }}>
                    ✅ {verse.correctCount}/{verse.totalAttempts} | 🔥 Streak: {verse.streak}
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFromMemorization(verse.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSelectVerses = () => (
    <div>
      <button
        onClick={() => setView('dashboard')}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: isDarkMode ? '#334155' : '#e0e0e0',
          color: isDarkMode ? '#e2e8f0' : '#1f2937',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        ← Back
      </button>

      <h3 style={{
        margin: '0 0 1rem 1rem',
        color: isDarkMode ? '#f1f5f9' : '#1f2937'
      }}>
        Select Verses to Practice ({selectedVerses.length})
      </h3>

      {selectedVerses.length > 0 && (
        <button
          onClick={handleStartQuiz}
          style={{
            marginBottom: '1rem',
            marginLeft: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          🎯 Start Quiz ({selectedVerses.length})
        </button>
      )}

      <div style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}>
        {memoryVerses.map(verse => (
          <div
            key={verse.id}
            onClick={() => {
              if (selectedVerses.find(v => v.id === verse.id)) {
                setSelectedVerses(selectedVerses.filter(v => v.id !== verse.id));
              } else {
                setSelectedVerses([...selectedVerses, verse]);
              }
            }}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: selectedVerses.find(v => v.id === verse.id)
                ? '#2563eb'
                : (isDarkMode ? '#1e293b' : '#f8f9fa'),
              border: selectedVerses.find(v => v.id === verse.id)
                ? '2px solid #1d4ed8'
                : `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{
              color: selectedVerses.find(v => v.id === verse.id) ? 'white' : (isDarkMode ? '#f1f5f9' : '#1f2937'),
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              {verse.bookName} {verse.chapterNum}:{verse.verseNum}
            </div>
            <div style={{
              color: selectedVerses.find(v => v.id === verse.id) ? 'rgba(255,255,255,0.8)' : (isDarkMode ? '#cbd5e1' : '#64748b'),
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              {verse.verseText.substring(0, 100)}...
            </div>
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.8rem',
              color: selectedVerses.find(v => v.id === verse.id) ? 'rgba(255,255,255,0.7)' : (isDarkMode ? '#94a3b8' : '#94a3b8')
            }}>
              ✓ {selectedVerses.find(v => v.id === verse.id) ? '✓ Selected' : 'Click to select'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (!currentSession || !currentSession.challenges[currentChallengeIndex]) {
      return <div>Loading quiz...</div>;
    }

    const challenge = currentSession.challenges[currentChallengeIndex];
    const isMultipleChoice = challenge.options && challenge.options.length > 2;

    return (
      <div>
        <div style={{
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              margin: 0,
              color: isDarkMode ? '#f1f5f9' : '#1f2937'
            }}>
              Question {currentChallengeIndex + 1} of {currentSession.totalQuestions}
            </h3>
            <div style={{
              width: '200px',
              height: '8px',
              backgroundColor: isDarkMode ? '#0f172a' : '#e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                backgroundColor: '#2563eb',
                width: `${((currentChallengeIndex + 1) / currentSession.totalQuestions) * 100}%`,
                transition: 'width 0.3s'
              }} />
            </div>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            borderLeft: '4px solid #2563eb'
          }}>
            <p style={{
              margin: 0,
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              {challenge.question}
            </p>
          </div>

          {isMultipleChoice ? (
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {challenge.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerQuestion(option)}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: `2px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                    backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                    color: isDarkMode ? '#f1f5f9' : '#1f2937',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#0f172a' : '#e0e7ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDarkMode ? '#334155' : '#e2e8f0';
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f8f9fa';
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              {challenge.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerQuestion(option)}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: option === 'True' ? '#10b981' : '#ef4444',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!sessionResults) return null;

    const percentage = (sessionResults.score / sessionResults.totalQuestions) * 100;

    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem'
        }}>
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '💪'}
        </div>

        <h2 style={{
          margin: '0 0 1rem 0',
          color: isDarkMode ? '#f1f5f9' : '#1f2937'
        }}>
          Quiz Complete!
        </h2>

        <div style={{
          padding: '2rem',
          backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444',
            marginBottom: '0.5rem'
          }}>
            {sessionResults.score}/{sessionResults.totalQuestions}
          </div>
          <div style={{
            fontSize: '1.5rem',
            color: isDarkMode ? '#cbd5e1' : '#64748b'
          }}>
            {Math.round(percentage)}%
          </div>
        </div>

        <button
          onClick={() => setView('dashboard')}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  };

  const renderHistory = () => {
    const history = getSessionHistory();

    return (
      <div>
        <button
          onClick={() => setView('dashboard')}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: isDarkMode ? '#334155' : '#e0e0e0',
            color: isDarkMode ? '#e2e8f0' : '#1f2937',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          ← Back
        </button>

        <h3 style={{
          margin: '0 0 1rem 0',
          color: isDarkMode ? '#f1f5f9' : '#1f2937'
        }}>
          📋 Quiz History ({history.length})
        </h3>

        {history.length === 0 ? (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
            borderRadius: '8px',
            color: isDarkMode ? '#cbd5e1' : '#64748b'
          }}>
            No quizzes completed yet!
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {history.map(session => (
              <div
                key={session.id}
                style={{
                  padding: '1.5rem',
                  borderRadius: '8px',
                  backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                  borderLeft: `4px solid ${session.accuracy >= 80 ? '#10b981' : session.accuracy >= 60 ? '#f59e0b' : '#ef4444'}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    color: isDarkMode ? '#f1f5f9' : '#1f2937',
                    fontWeight: '500'
                  }}>
                    {new Date(session.startedAt).toLocaleDateString()} at {new Date(session.startedAt).toLocaleTimeString()}
                  </div>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: session.accuracy >= 80 ? '#10b981' : session.accuracy >= 60 ? '#f59e0b' : '#ef4444'
                  }}>
                    {Math.round(session.accuracy)}%
                  </div>
                </div>
                <div style={{
                  color: isDarkMode ? '#cbd5e1' : '#64748b',
                  fontSize: '0.9rem'
                }}>
                  {session.score}/{session.totalQuestions} correct
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{
        margin: '0 0 2rem 0',
        color: isDarkMode ? '#f1f5f9' : '#1f2937'
      }}>
        📖 Memory Verse Challenges
      </h1>

      {view === 'dashboard' && renderDashboard()}
      {view === 'select-verses' && renderSelectVerses()}
      {view === 'quiz' && renderQuiz()}
      {view === 'results' && renderResults()}
      {view === 'history' && renderHistory()}
    </div>
  );
};

// Helper component for stat cards
interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  isDarkMode: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, isDarkMode }) => (
  <div style={{
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
    border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
    <div style={{
      fontSize: '0.875rem',
      color: isDarkMode ? '#cbd5e1' : '#64748b',
      marginBottom: '0.5rem'
    }}>
      {title}
    </div>
    <div style={{
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: isDarkMode ? '#f1f5f9' : '#1f2937'
    }}>
      {value}
    </div>
  </div>
);
