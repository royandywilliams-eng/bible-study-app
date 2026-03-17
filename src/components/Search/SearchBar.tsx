import React, { useState } from 'react';
import { useSearchStore } from '../../store/useSearchStore';
import { SearchService } from '../../services/SearchService';
import { useBibleStore } from '../../store/useBibleStore';

interface SearchBarProps {
  isDarkMode: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isDarkMode }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { setQuery, setResults, setIsSearching, searchHistory } = useSearchStore();
  const { bibleBooks } = useBibleStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Get suggestions as user types
    if (value.length > 0) {
      const sug = SearchService.getSearchSuggestions(value, bibleBooks, 5);
      setSuggestions(sug);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchText: string) => {
    const trimmedQuery = searchText.trim();
    if (!trimmedQuery) return;

    setIsSearching(true);
    setQuery(trimmedQuery);

    try {
      const results = SearchService.search(trimmedQuery, 50);
      setResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }

    // Add to history
    useSearchStore.setState(state => ({
      searchHistory: [
        trimmedQuery,
        ...state.searchHistory.filter(q => q !== trimmedQuery)
      ].slice(0, state.maxHistoryItems)
    }));

    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
  };

  const handleHistoryClick = (historyItem: string) => {
    setInputValue(historyItem);
    handleSearch(historyItem);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      marginBottom: '1.5rem'
    }}>
      <div style={{
        display: 'flex',
        gap: '0.5rem'
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Bible text (e.g., 'love', 'faith', 'John 3:16')"
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            border: `2px solid ${isDarkMode ? '#334155' : '#cbd5e1'}`,
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            color: isDarkMode ? '#f1f5f9' : '#1f2937',
            fontSize: '1rem',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s'
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <button
          onClick={() => handleSearch(inputValue)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          🔍 Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || searchHistory.length > 0) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {suggestions.length > 0 && (
            <>
              <div style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: isDarkMode ? '#cbd5e1' : '#64748b',
                borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
              }}>
                Books
              </div>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f1f5f9' : '#1f2937',
                    borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f0f0f0'}`,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#ffffff';
                  }}
                >
                  📖 {suggestion}
                </div>
              ))}
            </>
          )}

          {searchHistory.length > 0 && (
            <>
              <div style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: isDarkMode ? '#cbd5e1' : '#64748b',
                borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                marginTop: suggestions.length > 0 ? '0.5rem' : 0
              }}>
                Recent
              </div>
              {searchHistory.slice(0, 5).map((historyItem) => (
                <div
                  key={historyItem}
                  onClick={() => handleHistoryClick(historyItem)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f1f5f9' : '#1f2937',
                    borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f0f0f0'}`,
                    transition: 'background-color 0.2s',
                    fontSize: '0.95rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#ffffff';
                  }}
                >
                  ⏱️ {historyItem}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
