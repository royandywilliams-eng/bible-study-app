import React, { useEffect, useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { useBibleStore } from '../store/useBibleStore';
import { useNotesStore } from '../store/useNotesStore';
import { useDevotonalsStore } from '../store/useDevotonalsStore';
import { useStudyGuidesStore } from '../store/useStudyGuidesStore';
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

  const {
    initializeAchievements,
    updateProgress,
    getAchievements,
    getUnlockedAchievements,
    getAchievementProgress,
    getReadingStreak,
    getSessionStats,
    getCompletionStats,
    getMotivationTips
  } = useProgressStore();

  // Get data from other stores
  const bibleSessions = useBibleStore((state) => state.selectedVerses?.length || 0);
  const notes = useNotesStore((state) => state.notes);
  const devotionalStats = useDevotonalsStore((state) => state.getStats?.());
  const studyStats = useStudyGuidesStore((state) => state.getStats?.());

  useEffect(() => {
    // Initialize achievements on first load
    initializeAchievements();

    // Calculate completion stats from actual store data
    const completionStats = {
      booksCompleted: 0, // Will be calculated from Bible progress
      chaptersCompleted: bibleSessions,
      versesRead: 0, // Will be calculated
      notesCreated: notes.length,
      highlightsCreated: notes.filter((n) => n.highlightColor && n.highlightColor !== 'none').length,
      devotionalsCompleted: devotionalStats?.completed || 0,
      lessonsCompleted: 0, // Will be calculated from study progress
      coursesEnrolled: studyStats?.enrolled || 0,
      coursesCompleted: studyStats?.completed || 0
    };

    updateProgress(completionStats);
  }, [bibleSessions, notes.length, devotionalStats, studyStats]);

  const achievements = getAchievements();
  const unlockedAchievements = getUnlockedAchievements();
  const achievementProgress = getAchievementProgress();
  const readingStreak = getReadingStreak();
  const sessionStats = getSessionStats();
  const completionStats = getCompletionStats();
  const motivationTips = getMotivationTips();

  useEffect(() => {
    setFilteredAchievements(achievements);
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

  const getCompletionColor = (progress: number, target: number): string => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return isDarkMode ? 'from-green-600 to-emerald-600' : 'from-green-500 to-emerald-500';
    if (percentage >= 66) return isDarkMode ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500';
    if (percentage >= 33) return isDarkMode ? 'from-yellow-600 to-orange-600' : 'from-yellow-500 to-orange-500';
    return isDarkMode ? 'from-gray-600 to-gray-500' : 'from-gray-400 to-gray-300';
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
                <div className="text-xs text-gray-500 mt-1">Last: {readingStreak.lastReadDate}</div>
              </div>

              {/* Total Sessions */}
              <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-sm font-semibold text-gray-500 mb-2">📚 Sessions</div>
                <div className="text-3xl font-bold text-blue-500 mb-2">{sessionStats.totalSessions}</div>
                <div className="text-xs text-gray-500">{sessionStats.totalMinutesRead} min read</div>
                <div className="text-xs text-gray-500 mt-1">Avg: {sessionStats.averageSessionLength} min</div>
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
                <div className="text-xs text-gray-500 mt-1">Highlights: {completionStats.highlightsCreated}</div>
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

                {/* Devotionals Completed */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Devotionals Completed</span>
                    <span className="text-sm text-gray-500">{completionStats.devotionalsCompleted} / 365</span>
                  </div>
                  <div className={`w-full h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full bg-gradient-to-r ${getCompletionColor(completionStats.devotionalsCompleted, 365)}`}
                      style={{ width: `${Math.min((completionStats.devotionalsCompleted / 365) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Courses Completed */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Courses Completed</span>
                    <span className="text-sm text-gray-500">{completionStats.coursesCompleted} / {completionStats.coursesEnrolled}</span>
                  </div>
                  <div className={`w-full h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full bg-gradient-to-r ${getCompletionColor(completionStats.coursesCompleted, completionStats.coursesEnrolled || 1)}`}
                      style={{ width: `${Math.min(((completionStats.coursesCompleted / completionStats.coursesEnrolled) || 0) * 100, 100)}%` }}
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
              {[
                { id: 'all', label: 'All' },
                { id: 'reading', label: '📖 Reading' },
                { id: 'notes', label: '📝 Notes' },
                { id: 'devotional', label: '✨ Devotional' },
                { id: 'study', label: '🎓 Study' },
                { id: 'time', label: '⏱️ Time' },
                { id: 'streak', label: '🔥 Streak' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleAchievementFilter(filter.id)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => {
                const isUnlocked = achievement.unlockedAt !== undefined;
                const progress = achievement.progress || 0;
                const target = achievement.target || 1;
                const percentage = (progress / target) * 100;

                return (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-lg shadow-lg transform transition-all ${
                      isUnlocked
                        ? isDarkMode
                          ? 'bg-gradient-to-br from-blue-900 to-indigo-900'
                          : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                        : isDarkMode
                        ? 'bg-gray-800 opacity-60'
                        : 'bg-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{achievement.icon}</div>
                      {isUnlocked && <div className="text-yellow-400 text-2xl">✓</div>}
                    </div>

                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{achievement.description}</p>

                    {target && target > 1 && (
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>Progress</span>
                          <span>
                            {progress} / {target}
                          </span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                          <div
                            className={`h-full bg-gradient-to-r ${percentage >= 100 ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-cyan-500'}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {isUnlocked && achievement.unlockedAt && (
                      <div className="text-xs text-gray-500 mt-4">
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Session Statistics */}
              <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-lg font-bold mb-6">📊 Session Statistics</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Total Sessions</span>
                      <span className="font-bold text-blue-500">{sessionStats.totalSessions}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Total Minutes Read</span>
                      <span className="font-bold text-green-500">{sessionStats.totalMinutesRead}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Average Session Length</span>
                      <span className="font-bold text-yellow-500">{sessionStats.averageSessionLength} min</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>This Week</span>
                      <span className="font-bold text-purple-500">{sessionStats.sessionsThisWeek}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>This Month</span>
                      <span className="font-bold text-indigo-500">{sessionStats.sessionsThisMonth}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Completion Statistics */}
              <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-lg font-bold mb-6">✅ Completion Statistics</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Chapters Read</span>
                      <span className="font-bold text-blue-500">{completionStats.chaptersCompleted}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Notes Created</span>
                      <span className="font-bold text-green-500">{completionStats.notesCreated}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Highlights Created</span>
                      <span className="font-bold text-yellow-500">{completionStats.highlightsCreated}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Devotionals Completed</span>
                      <span className="font-bold text-purple-500">{completionStats.devotionalsCompleted}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Courses Completed</span>
                      <span className="font-bold text-indigo-500">{completionStats.coursesCompleted}/{completionStats.coursesEnrolled}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Reading Streak */}
            <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-lg font-bold mb-6">🔥 Reading Streak Details</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">{readingStreak.current}</div>
                  <div className="text-sm text-gray-500">Current Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">{readingStreak.longest}</div>
                  <div className="text-sm text-gray-500">Longest Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2">{readingStreak.lastReadDate}</div>
                  <div className="text-sm text-gray-500">Last Read Date</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-lg font-bold mb-6">💡 Motivation & Tips</h2>
              <div className="space-y-4">
                {motivationTips.map((tip, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      isDarkMode ? 'bg-gray-700 border-l-blue-500' : 'bg-blue-50 border-l-blue-500'
                    }`}
                  >
                    <p className="text-base leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips by Category */}
            <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-lg font-bold mb-6">📚 Study Tips</h2>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="font-semibold mb-2">🎯 Set Goals</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Set realistic daily reading goals. Even 15 minutes a day helps build a consistent habit.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="font-semibold mb-2">💭 Take Notes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Write down key insights. This helps you remember and apply what you're learning.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="font-semibold mb-2">🤝 Share & Discuss</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Discuss passages with others. Different perspectives deepen understanding.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="font-semibold mb-2">🔄 Review Regularly</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Revisit previous passages. This helps lock in what you've learned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
