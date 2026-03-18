import React, { useState, useMemo } from 'react';
import type { SearchResult } from '../../services/SearchService';
import type { HighlightColor } from '../../services/NotesService';
import { useNotesStore } from '../../store/useNotesStore';

interface VerseHighlightProps {
  result: SearchResult;
  isDarkMode: boolean;
}

export const VerseHighlight: React.FC<VerseHighlightProps> = ({ result, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { addNote, removeNote, getNote, isHighlighted, isBookmarked } = useNotesStore();
  const notes = useNotesStore((state) => state.notes); // Subscribe to notes to trigger re-renders

  const passageId = `${result.bookName} ${result.chapterNum}:${result.verseNum}`;

  // Recalculate existingNote whenever notes change (via dependency on notes array)
  const existingNote = useMemo(() => getNote(passageId), [notes, passageId, getNote]);

  const highlightColors: { color: HighlightColor; label: string; bgLight: string; bgDark: string }[] = [
    { color: 'yellow', label: 'Yellow', bgLight: '#fef08a', bgDark: '#78350f' },
    { color: 'blue', label: 'Blue', bgLight: '#bfdbfe', bgDark: '#1e3a8a' },
    { color: 'green', label: 'Green', bgLight: '#bbf7d0', bgDark: '#065f46' },
    { color: 'pink', label: 'Pink', bgLight: '#fbcfe8', bgDark: '#831843' },
  ];

  const handleHighlight = (color: HighlightColor) => {
    if (isHighlighted(passageId) && existingNote?.highlightColor === color) {
      removeNote(passageId);
    } else {
      addNote(result, 'highlight', color);
    }
  };

  const handleAddNote = () => {
    if (noteText.trim()) {
      addNote(result, 'note', undefined, noteText);
      setNoteText('');
      setIsExpanded(false);
    }
  };

  const handleToggleBookmark = () => {
    if (isBookmarked(passageId)) {
      removeNote(passageId);
    } else {
      addNote(result, 'bookmark');
    }
  };

  const handleDeleteNote = () => {
    removeNote(passageId);
    setNoteText('');
    setIsExpanded(false);
  };

  return (
    <div style={{
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
    }}>
      {/* Highlight Colors */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          color: isDarkMode ? '#cbd5e1' : '#64748b',
          marginBottom: '0.5rem',
          margin: 0,
        }}>
          Highlight:
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          {highlightColors.map(({ color, label, bgLight, bgDark }) => (
            <button
              key={color}
              onClick={(e) => {
                e.stopPropagation();
                handleHighlight(color);
              }}
              type="button"
              title={`Highlight with ${label}`}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '4px',
                border: isHighlighted(passageId) && existingNote?.highlightColor === color
                  ? `3px solid ${isDarkMode ? '#60a5fa' : '#3b82f6'}`
                  : `2px solid ${isDarkMode ? '#475569' : '#cbd5e1'}`,
                backgroundColor: isDarkMode ? bgDark : bgLight,
                cursor: 'pointer',
                transition: 'all 0.2s',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.75rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {label[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            backgroundColor: isDarkMode ? '#334155' : '#f0f0f0',
            color: isDarkMode ? '#e2e8f0' : '#1f2937',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDarkMode ? '#475569' : '#e0e0e0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f0f0f0';
          }}
        >
          {isExpanded ? '✕ Close' : '📝 Add Note'}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleBookmark();
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isBookmarked(passageId) ? '#f59e0b' : (isDarkMode ? '#334155' : '#f0f0f0'),
            color: isBookmarked(passageId) ? 'white' : (isDarkMode ? '#e2e8f0' : '#1f2937'),
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s',
          }}
          title={isBookmarked(passageId) ? 'Remove bookmark' : 'Add bookmark'}
          onMouseEnter={(e) => {
            if (!isBookmarked(passageId)) {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#475569' : '#e0e0e0';
            }
          }}
          onMouseLeave={(e) => {
            if (!isBookmarked(passageId)) {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f0f0f0';
            }
          }}
        >
          {isBookmarked(passageId) ? '🔖' : '🔗'}
        </button>
      </div>

      {/* Note Editor */}
      {isExpanded && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: isDarkMode ? '#0f172a' : '#f9fafb',
          borderRadius: '4px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
        }}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Add a personal note about this verse..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '0.75rem',
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              borderRadius: '4px',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
              resize: 'vertical',
            }}
          />

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddNote();
              }}
              disabled={!noteText.trim()}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                backgroundColor: noteText.trim() ? '#10b981' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: noteText.trim() ? 'pointer' : 'not-allowed',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (noteText.trim()) {
                  e.currentTarget.style.backgroundColor = '#059669';
                }
              }}
              onMouseLeave={(e) => {
                if (noteText.trim()) {
                  e.currentTarget.style.backgroundColor = '#10b981';
                }
              }}
            >
              Save Note
            </button>

            {existingNote?.type === 'note' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote();
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
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
            )}
          </div>

          {existingNote?.type === 'note' && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: isDarkMode ? '#1e293b' : '#f0f0f0',
              borderRadius: '4px',
              fontSize: '0.875rem',
              color: isDarkMode ? '#cbd5e1' : '#64748b',
            }}>
              <p style={{ margin: 0, marginBottom: '0.5rem', fontWeight: '500' }}>Saved Note:</p>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{existingNote.noteText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
