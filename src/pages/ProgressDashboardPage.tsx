import React, { useEffect, useState, useMemo } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { ProgressService } from '../services/ProgressService';
import type { Achievement } from '../services/ProgressService';

interface ProgressDashboardPageProps {
  isDarkMode: boolean;
  onNavigateToPage?: (page: 'home' | 'search' | 'browse' | 'bible' | 'devotionals' | 'notes' | 'studyGuides' | 'progress' | 'settings') => void;
}

export const ProgressDashboardPage: React.FC<ProgressDashboardPageProps> = ({
  isDarkMode
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats' | 'tips'>('overview');
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
  const [completionStats, setCompletionStats] = useState({
    booksCompleted: 0,
    chaptersCompleted: 0,
    versesRead: 0,
    notesCreated: 0,
    highlightsCreated: 0,
    devotionalsCompleted: 0,
    lessonsCompleted: 0,
    coursesEnrolled: 0,
    coursesCompleted: 0
  });

  // Only subscribe to progress store (achievements)
  const initializeAchievements = useProgressStore((state) => state.initializeAchievements);
  const achievements = useProgressStore((state) => state.achievements) || [];
  const readingStreak = useProgressStore((state) => state.readingStreak) || { current: 0, longest: 0, lastReadDate: '' };
  const sessionStats = useProgressStore((state) => state.sessionStats) || { totalSessions: 0, totalMinutesRead: 0, averageSessionLength: 0, lastSessionDate: '', sessionsThisWeek: 0, sessionsThisMonth: 0 };
  const motivationTips = useProgressStore((state) => state.motivationTips) || [];

  // Compute derived values
  const unlockedAchievements = useMemo(() => {
    return (achievements || []).filter(a => a.unlockedAt);
  }, [achievements]);

  const achievementProgress = useMemo(() => {
    if (!achievements || achievements.length === 0) return 0;
    return Math.round((unlockedAchievements.length / achievements.length) * 100);
  }, [achievements, unlockedAchievements]);

  // Initialize achievements and load stored stats on mount
  useEffect(() => {
    const init = async () => {
      try {
        // Initialize achievements
        await initializeAchievements();

        // Load stored stats from database
        const storedStats = await ProgressService.getStoredStats();
        if (storedStats) {
          setCompletionStats(storedStats);
        }
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
      }
    };

    init();
  }, [initializeAchievements]);

  // Update filtered achievements when achievements list changes
  useEffect(() => {
    setFilteredAchievements(achievements || []);
  }, [achievements]);

  const handleAchievementFilter = (category: string) => {
    if (category === 'all') {
      setFilteredAchievements(achievements);
    } else {
      const filtered = achievements.filter((a) => {
        if (category === 'reading') return ['first-chapter', 'reading-marathon', 'book-complete', 'ot-explorer', 'nt-explorer'].includes(a.id);
        if (category === 'notes') return ['note-taker', 'highlight-artist', 'annotation-expert'].includes(a.id);
        if (category === 'devotional') return ['daily-reader', 'devotion-master', 'one-year-plan'].includes(a.id);
        if (category === 'study') return ['course-starter', 'course-complete', 'scholar'].includes(a.id);
        if (category === 'time') return ['one-hour', 'ten-hours', 'century-reader'].includes(a.id);
        if (category === 'streak') return ['streak-week', 'streak-month'].includes(a.id);
        return true;
      });
      setFilteredAchievements(filtered);
    }
  };

  const getCompletionColor = (current: number, target: number): string => {
    const percentage = (current / target) * 100;
    if (percentage >= 75) return 'from-green-400 to-green-600';
    if (percentage >= 50) return 'from-blue-400 to-blue-600';
    if (percentage >= 25) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} px-4 py-6 shadow-lg`}>
        <h1 className="text-3xl font-bold mb-2">Your Progress Dashboard</h1>
        <p className="text-gray-200">Track your spiritual growth journey</p>
      </div>

      {/* Tab Navigation */}
      <div className={`sticky top-0 z-40 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 flex gap-0">
          {(['overview', 'achievements', 'stats', 'tips'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? `border-blue-500 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`
                  : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Reading Streak */}
              <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-sm font-semibold text-gray-500 mb-2">🔥 Reading Streak</div>
                <div className="text-3xl font-bold text-orange-500 mb-2">{readingStreak.current}</div>
                <div className="text-xs text-gray-500">Longest: {readingStreak.longest} days</div>
              </div>

              {/* Total Sessions */}
              <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-sm font-semibold text-gray-500 mb-2">📚 Sessions</div>
                <div className="text-3xl font-bold text-blue-500 mb-2">{sessionStats.totalSessions}</div>
                <div className="text-xs text-gray-500">{sessionStats.totalMinutesRead} min read</div>
              </div>

              {/* Achievements */}
              <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-sm font-semibold text-gray-500 mb-2">🏆 Achievements</div>
                <div className="text-3xl font-bold text-yellow-500 mb-2">{unlockedAchievements.length}/{achievements.length}</div>
                <div className="text-xs text-gray-500">Progress: {achievementProgress}%</div>
              </div>

              {/* Chapters Read */}
              <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-sm font-semibold text-gray-500 mb-2">📖 Chapters</div>
                <div className="text-3xl font-bold text-green-500 mb-2">{completionStats.chaptersCompleted}</div>
                <div className="text-xs text-gray-500">Notes: {completionStats.notesCreated}</div>
              </div>
            </div>

            {/* Completion Progress */}
            <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-lg font-bold mb-6">Completion Progress</h2>
              <div className="space-y-4">
                {/* Chapters Progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Bible Chapters</span>
                    <span className="text-sm text-gray-500">{completionStats.chaptersCompleted} / 1189</span>
                  </div>
                  <div className={`w-full h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full bg-gradient-to-r ${getCompletionColor(completionStats.chaptersCompleted, 1189)}`}
                      style={{ width: `${Math.min((completionStats.chaptersCompleted / 1189) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Notes Created */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Notes Created</span>
                    <span className="text-sm text-gray-500">{completionStats.notesCreated} / 50</span>
                  </div>
                  <div className={`w-full h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full bg-gradient-to-r ${getCompletionColor(completionStats.notesCreated, 50)}`}
                      style={{ width: `${Math.min((completionStats.notesCreated / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-lg font-bold mb-6">Recent Unlocked Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {unlockedAchievements.slice(-5).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg text-center transform hover:scale-105 transition-transform ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <div className="text-sm font-semibold">{achievement.title}</div>
                    {achievement.unlockedAt && (
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'reading', 'notes', 'devotional', 'study', 'time', 'streak'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleAchievementFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-lg shadow-lg ${
                    achievement.unlockedAt
                      ? isDarkMode ? 'bg-gradient-to-br from-yellow-900 to-gray-800' : 'bg-gradient-to-br from-yellow-100 to-white'
                      : isDarkMode ? 'bg-gray-800 opacity-50' : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{achievement.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${Math.min(((achievement.progress || 0) / (achievement.target || 1)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold">{achievement.progress || 0}/{achievement.target || 0}</span>
                    {achievement.unlockedAt && (
                      <span className="text-xs text-green-500 font-semibold">✓ Unlocked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-6">Detailed Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">📖 Reading Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Verses Read:</span>
                      <span className="font-bold">{completionStats.versesRead}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chapters Completed:</span>
                      <span className="font-bold">{completionStats.chaptersCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Books Completed:</span>
                      <span className="font-bold">{completionStats.booksCompleted}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">📝 Engagement Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Notes Created:</span>
                      <span className="font-bold">{completionStats.notesCreated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Highlights Created:</span>
                      <span className="font-bold">{completionStats.highlightsCreated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Devotionals Completed:</span>
                      <span className="font-bold">{completionStats.devotionalsCompleted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Motivation Tips</h2>
            {motivationTips.map((tip, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}
              >
                <p className="text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
