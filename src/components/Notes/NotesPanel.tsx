import React, { useState } from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import type { NoteFilter, HighlightColor } from '../../services/NotesService';

interface NotesPanelProps {
  isDarkMode: boolean;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ isDarkMode }) => {
  const { notes, filterNotes, removeNote, getStatistics, exportNotes } = useNotesStore();
  const [activeTab, setActiveTab] = useState<'all' | 'highlights' | 'bookmarks' | 'notes'>('all');
  const [selectedColor, setSelectedColor] = useState<HighlightColor | 'all'>('all');

  const stats = getStatistics();

  const getFilteredNotes = () => {
    const filter: NoteFilter = {};

    if (activeTab === 'highlights') {
      filter.type = 'highlight';
      if (selectedColor !== 'all') {
        filter.color = selectedColor;
      }
    } else if (activeTab === 'bookmarks') {
      filter.type = 'bookmark';
    } else if (activeTab === 'notes') {
      filter.type = 'note';
    }

    return filterNotes(filter);
  };

  const filteredNotes = getFilteredNotes();

  const renderTabButton = (
    tab: 'all' | 'highlights' | 'bookmarks' | 'notes',
    label: string,
    count: number
  ) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setSelectedColor('all');
      }}
      style={{
        flex: 1,
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '6px 6px 0 0',
        cursor: 'pointer',
        backgroundColor: activeTab === tab
          ? '#2563eb'
          : (isDarkMode ? '#1e293b' : '#f0f0f0'),
        color: activeTab === tab
          ? 'white'
          : (isDarkMode ? '#cbd5e1' : '#64748b'),
        fontWeight: '500',
        transition: 'all 0.2s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (activeTab !== tab) {
          e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#e0e0e0';
        }
      }}
      onMouseLeave={(e) => {
        if (activeTab !== tab) {
          e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f0f0f0';
        }
      }}
    >
      {label} <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem' }}>({count})</span>
    </button>
  );

  const handleExport = (format: 'json' | 'csv') => {
    const data = exportNotes(format);
    const element = document.createElement('a');
    const file = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = `notes.${format === 'json' ? 'json' : 'csv'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      borderLeft: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem',
        backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
        borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
      }}>
        <h3 style={{
          margin: 0,
          marginBottom: '0.75rem',
          color: isDarkMode ? '#f1f5f9' : '#1f2937',
          fontSize: '1.125rem',
        }}>
          📋 My Notes
        </h3>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: isDarkMode ? '#cbd5e1' : '#64748b',
        }}>
          <span>Total: <strong>{stats.totalNotes}</strong></span>
          <span>•</span>
          <span>Highlights: <strong>{stats.highlights}</strong></span>
          <span>•</span>
          <span>Bookmarks: <strong>{stats.bookmarks}</strong></span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
        padding: '0.5rem',
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      }}>
        {renderTabButton('all', 'All', stats.totalNotes)}
        {renderTabButton('highlights', '🟨 Highlights', stats.highlights)}
        {renderTabButton('bookmarks', '🔖 Bookmarks', stats.bookmarks)}
        {renderTabButton('notes', '📝 Notes', stats.customNotes)}
      </div>

      {/* Color Filter for Highlights */}
      {activeTab === 'highlights' && stats.highlights > 0 && (
        <div style={{
          padding: '0.75rem 1rem',
          borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.875rem', color: isDarkMode ? '#cbd5e1' : '#64748b' }}>
            Filter:
          </span>
          {(['all', 'yellow', 'blue', 'green', 'pink'] as const).map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: selectedColor === color
                  ? `2px solid ${isDarkMode ? '#60a5fa' : '#3b82f6'}`
                  : `1px solid ${isDarkMode ? '#475569' : '#cbd5e1'}`,
                backgroundColor: color === 'all'
                  ? (isDarkMode ? '#334155' : '#f0f0f0')
                  : color === 'yellow'
                    ? '#fef08a'
                    : color === 'blue'
                      ? '#bfdbfe'
                      : color === 'green'
                        ? '#bbf7d0'
                        : '#fbcfe8',
                color: isDarkMode ? '#f1f5f9' : '#1f2937',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
            >
              {color === 'all' ? 'All' : color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Notes List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0.5rem',
      }}>
        {filteredNotes.length === 0 ? (
          <div style={{
            padding: '2rem 1rem',
            textAlign: 'center',
            color: isDarkMode ? '#64748b' : '#94a3b8',
          }}>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              {activeTab === 'all'
                ? 'No notes yet. Start highlighting and adding notes!'
                : `No ${activeTab} yet.`}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {filteredNotes.map(note => (
              <div
                key={note.id}
                style={{
                  padding: '1rem',
                  backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                  borderRadius: '6px',
                  borderLeft: `4px solid ${
                    note.highlightColor === 'yellow'
                      ? '#fbbf24'
                      : note.highlightColor === 'blue'
                        ? '#60a5fa'
                        : note.highlightColor === 'green'
                          ? '#34d399'
                          : note.highlightColor === 'pink'
                            ? '#f472b6'
                            : '#6b7280'
                  }`,
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '0.5rem',
                }}>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: isDarkMode ? '#f1f5f9' : '#1f2937',
                      fontSize: '0.95rem',
                    }}>
                      {note.bookName} {note.chapterNum}:{note.verseNum}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: isDarkMode ? '#64748b' : '#94a3b8',
                      marginTop: '0.25rem',
                    }}>
                      {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => removeNote(note.passageId)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ef4444';
                    }}
                  >
                    Delete
                  </button>
                </div>

                <p style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  color: isDarkMode ? '#cbd5e1' : '#64748b',
                  lineHeight: '1.4',
                }}>
                  {note.verseText}
                </p>

                {note.noteText && (
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f0f0f0',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    color: isDarkMode ? '#e2e8f0' : '#1f2937',
                    fontStyle: 'italic',
                  }}>
                    "{note.noteText}"
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with Export */}
      {notes.length > 0 && (
        <div style={{
          padding: '1rem',
          backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
          borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          display: 'flex',
          gap: '0.5rem',
        }}>
          <button
            onClick={() => handleExport('json')}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            💾 JSON
          </button>
          <button
            onClick={() => handleExport('csv')}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7c3aed';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#8b5cf6';
            }}
          >
            📊 CSV
          </button>
        </div>
      )}
    </div>
  );
};
