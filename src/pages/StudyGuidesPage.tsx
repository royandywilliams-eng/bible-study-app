import React, { useEffect, useState } from 'react';
import { useStudyGuidesStore } from '../store/useStudyGuidesStore';
import { generateCompleteStudyGuidesData } from '../data/studyGuidesData';
import type { StudyGuide, Lesson, CourseProgress } from '../services/StudyGuidesService';

interface StudyGuidesPageProps {
  isDarkMode: boolean;
  onNavigateToPage?: (page: 'home' | 'search' | 'browse' | 'bible' | 'devotionals' | 'notes' | 'settings' | 'studyGuides') => void;
}

type ViewMode = 'browse' | 'courseDetail' | 'lesson' | 'quiz' | 'quizResults';

const DifficultyColors = {
  beginner: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
  intermediate: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
  advanced: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
};

export const StudyGuidesPage: React.FC<StudyGuidesPageProps> = ({ isDarkMode, onNavigateToPage }) => {
  const {
    studyGuides,
    loadStudyGuides,
    getAllStudyGuides,
    getStudyGuideById,
    enrollCourse,
    getProgressForCourse,
    getAllProgress,
    submitQuizAnswers,
    getQuizFeedback,
    getNextLesson
  } = useStudyGuidesStore();

  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [selectedCourse, setSelectedCourse] = useState<StudyGuide | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string | number>>({});
  const [lastQuizResult, setLastQuizResult] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize study guides
  useEffect(() => {
    if (studyGuides.length === 0) {
      const allGuides = generateCompleteStudyGuidesData();
      loadStudyGuides(allGuides);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [studyGuides.length, loadStudyGuides]);

  const handleEnrollCourse = (guideId: string) => {
    const progress = enrollCourse(guideId);
    if (progress) {
      const guide = getStudyGuideById(guideId);
      setSelectedCourse(guide);
      setCourseProgress(progress);
      setViewMode('courseDetail');
    }
  };

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setQuizAnswers({});
    setViewMode('lesson');
  };

  const handleStartQuiz = () => {
    if (selectedLesson?.quiz) {
      setViewMode('quiz');
    }
  };

  const handleAnswerChange = (questionId: string, answer: string | number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    if (selectedLesson) {
      const result = submitQuizAnswers(selectedLesson.id, quizAnswers);
      const feedback = getQuizFeedback(selectedLesson.id);
      setLastQuizResult({ ...result, feedback });
      setViewMode('quizResults');
    }
  };

  const handleContinueCourse = () => {
    if (selectedCourse) {
      const nextLesson = getNextLesson(selectedCourse.id);
      if (nextLesson) {
        setSelectedLesson(nextLesson);
        setQuizAnswers({});
        setViewMode('lesson');
      } else {
        setCourseProgress(getProgressForCourse(selectedCourse.id) || null);
        setViewMode('courseDetail');
      }
    }
  };

  const handleBackToCourse = () => {
    if (selectedCourse?.id) {
      setCourseProgress(getProgressForCourse(selectedCourse.id) || null);
    }
    setViewMode('courseDetail');
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>Loading courses...</p>
        </div>
      </div>
    );
  }

  // Browse View - Show all available courses
  if (viewMode === 'browse') {
    const allGuides = getAllStudyGuides();
    const progress = getAllProgress();

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
              📚 Structured Study Guides
            </h1>
            <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: 0 }}>
              Deepen your faith with guided, comprehensive Bible courses
            </p>
          </div>

          {/* Stats */}
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
                {progress.length}
              </div>
              <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
                Enrolled
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
                {progress.filter(p => p.completionPercentage > 0 && p.completionPercentage < 100).length}
              </div>
              <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
                In Progress
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
                {progress.filter(p => p.completionPercentage === 100).length}
              </div>
              <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
                Completed
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <h2 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937', marginBottom: '1rem' }}>
            Available Courses
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {allGuides.map(guide => {
              const courseProgress = progress.find(p => p.guideId === guide.id);
              const isEnrolled = !!courseProgress;

              return (
                <div
                  key={guide.id}
                  style={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                    border: `2px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <h3
                    style={{
                      color: isDarkMode ? '#f1f5f9' : '#1f2937',
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.25rem'
                    }}
                  >
                    {guide.title}
                  </h3>

                  <p
                    style={{
                      color: isDarkMode ? '#cbd5e1' : '#64748b',
                      margin: '0 0 1rem 0',
                      fontSize: '0.9rem'
                    }}
                  >
                    {guide.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}
                      className={DifficultyColors[guide.difficulty]}
                    >
                      {guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1)}
                    </span>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: isDarkMode ? '#334155' : '#e2e8f0',
                        color: isDarkMode ? '#cbd5e1' : '#64748b',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {guide.weeks} weeks
                    </span>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: isDarkMode ? '#334155' : '#e2e8f0',
                        color: isDarkMode ? '#cbd5e1' : '#64748b',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {guide.estimatedHours}h
                    </span>
                  </div>

                  <div style={{ marginBottom: '1rem', flexGrow: 1 }}>
                    <p
                      style={{
                        color: isDarkMode ? '#cbd5e1' : '#64748b',
                        fontSize: '0.9rem',
                        margin: 0
                      }}
                    >
                      <strong>Learning Objectives:</strong>
                    </p>
                    <ul style={{ margin: '0.5rem 0 0 1.5rem', color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.85rem' }}>
                      {guide.learningObjectives.slice(0, 2).map((obj, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem' }}>{obj}</li>
                      ))}
                      {guide.learningObjectives.length > 2 && (
                        <li style={{ marginBottom: '0.25rem' }}>+{guide.learningObjectives.length - 2} more...</li>
                      )}
                    </ul>
                  </div>

                  {isEnrolled && courseProgress && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
                          Progress
                        </span>
                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                          {courseProgress.completionPercentage}%
                        </span>
                      </div>
                      <div
                        style={{
                          backgroundColor: isDarkMode ? '#0f172a' : '#e2e8f0',
                          height: '8px',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            backgroundColor: '#10b981',
                            width: `${courseProgress.completionPercentage}%`,
                            transition: 'width 0.3s'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (isEnrolled) {
                        handleEnrollCourse(guide.id);
                      } else {
                        handleEnrollCourse(guide.id);
                      }
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: isEnrolled ? '#2563eb' : '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {isEnrolled ? '→ Continue' : '▶ Enroll'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Course Detail View
  if (viewMode === 'courseDetail' && selectedCourse) {
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => setViewMode('browse')}
            style={{
              backgroundColor: 'transparent',
              color: isDarkMode ? '#e2e7ff' : '#2563eb',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              marginBottom: '1rem',
              fontSize: '0.95rem'
            }}
          >
            ← Back to Courses
          </button>

          <h1
            style={{
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              marginBottom: '1rem',
              fontSize: '2rem',
              margin: '0 0 1rem 0'
            }}
          >
            {selectedCourse.title}
          </h1>

          <div style={{ marginBottom: '2rem' }}>
            <span
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginRight: '1rem'
              }}
              className={DifficultyColors[selectedCourse.difficulty]}
            >
              {selectedCourse.difficulty.charAt(0).toUpperCase() + selectedCourse.difficulty.slice(1)}
            </span>
            <span style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>
              {selectedCourse.weeks} weeks • {selectedCourse.estimatedHours} hours
            </span>
          </div>

          {courseProgress && (
            <div
              style={{
                backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937', margin: '0 0 1rem 0' }}>
                Course Progress
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Completion
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                    {courseProgress.completionPercentage}%
                  </div>
                </div>
                <div>
                  <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Lessons Completed
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                    {courseProgress.lessonsCompleted.length}/{selectedCourse.lessons.length}
                  </div>
                </div>
                <div>
                  <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Est. Completion
                  </div>
                  <div style={{ fontSize: '0.9rem', color: isDarkMode ? '#e2e7eb' : '#374151' }}>
                    {new Date(courseProgress.estimatedCompletionDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937', marginBottom: '1rem' }}>
            Lessons
          </h3>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {selectedCourse.lessons.map((lesson) => {
              const isCompleted = courseProgress?.lessonsCompleted.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => handleStartLesson(lesson)}
                  style={{
                    backgroundColor: isCompleted ? '#d1fae5' : isDarkMode ? '#1e293b' : '#f8f9fa',
                    border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                    borderRadius: '6px',
                    padding: '1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDarkMode ? '#334155' : '#e2e8f0';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div
                        style={{
                          color: isDarkMode ? '#f1f5f9' : '#1f2937',
                          fontWeight: '500',
                          marginBottom: '0.25rem'
                        }}
                      >
                        Week {lesson.weekNumber}: {lesson.title}
                      </div>
                      <div style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.9rem' }}>
                        {lesson.passages.join(', ')}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.5rem' }}>
                      {isCompleted ? '✅' : '⭕'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Lesson View
  if (viewMode === 'lesson' && selectedLesson && selectedCourse) {
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button
            onClick={handleBackToCourse}
            style={{
              backgroundColor: 'transparent',
              color: isDarkMode ? '#e2e7ff' : '#2563eb',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              marginBottom: '1rem',
              fontSize: '0.95rem'
            }}
          >
            ← Back to {selectedCourse.title}
          </button>

          <h1
            style={{
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              marginBottom: '0.5rem',
              fontSize: '2rem',
              margin: '0 0 0.5rem 0'
            }}
          >
            Week {selectedLesson.weekNumber}: {selectedLesson.title}
          </h1>

          <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 2rem 0' }}>
            {selectedCourse.title}
          </p>

          {/* Objectives */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '600' }}>
              📋 Learning Objectives
            </h3>
            <ul style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', paddingLeft: '1.5rem', margin: 0 }}>
              {selectedLesson.objectives.map((obj, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Passages */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '600' }}>
              📖 Scripture Passages
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {selectedLesson.passages.map((passage, idx) => (
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

          {/* Content */}
          <div
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937', margin: '0 0 1rem 0' }}>
              📚 Lesson Content
            </h3>
            <p
              style={{
                color: isDarkMode ? '#e2e7eb' : '#374151',
                lineHeight: '1.8',
                margin: 0,
                fontSize: '0.95rem'
              }}
            >
              {selectedLesson.content}
            </p>
          </div>

          {/* Key Takeaways */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '600' }}>
              💡 Key Takeaways
            </h3>
            <ul style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', paddingLeft: '1.5rem', margin: 0 }}>
              {selectedLesson.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{takeaway}</li>
              ))}
            </ul>
          </div>

          {/* Reflection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '600' }}>
              💭 Reflection
            </h3>
            <p
              style={{
                color: isDarkMode ? '#cbd5e1' : '#64748b',
                fontStyle: 'italic',
                margin: 0
              }}
            >
              {selectedLesson.reflection}
            </p>
          </div>

          {/* Quiz Button */}
          <button
            onClick={handleStartQuiz}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s',
              width: '100%'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            Take Quiz (5 questions)
          </button>
        </div>
      </div>
    );
  }

  // Quiz View
  if (viewMode === 'quiz' && selectedLesson) {
    const quiz = selectedLesson.quiz;
    const answeredCount = Object.keys(quizAnswers).length;

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              marginBottom: '0.5rem',
              fontSize: '1.75rem',
              margin: '0 0 1rem 0'
            }}
          >
            Quiz: {selectedLesson.title}
          </h1>

          <div
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>
              Progress: {answeredCount}/{quiz.questions.length} answered
            </span>
            <div
              style={{
                width: '200px',
                height: '8px',
                backgroundColor: isDarkMode ? '#0f172a' : '#e2e8f0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${(answeredCount / quiz.questions.length) * 100}%`,
                  height: '100%',
                  backgroundColor: '#2563eb',
                  transition: 'width 0.3s'
                }}
              />
            </div>
          </div>

          {/* Questions */}
          <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
            {quiz.questions.map((question, idx) => (
              <div
                key={question.id}
                style={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                  border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}
              >
                <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937', margin: '0 0 1rem 0' }}>
                  {idx + 1}. {question.question}
                </h3>

                {question.type === 'multiple-choice' && question.options && (
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {question.options.map((option, optIdx) => (
                      <label
                        key={optIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.75rem',
                          backgroundColor: isDarkMode ? '#0f172a' : 'white',
                          border: `2px solid ${quizAnswers[question.id] === optIdx ? '#2563eb' : 'transparent'}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (quizAnswers[question.id] !== optIdx) {
                            e.currentTarget.style.borderColor = isDarkMode ? '#334155' : '#e2e8f0';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (quizAnswers[question.id] !== optIdx) {
                            e.currentTarget.style.borderColor = 'transparent';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={optIdx}
                          checked={quizAnswers[question.id] === optIdx}
                          onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                          style={{ marginRight: '0.75rem' }}
                        />
                        <span style={{ color: isDarkMode ? '#e2e7eb' : '#374151' }}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && question.options && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {question.options.map((option, optIdx) => (
                      <label
                        key={optIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.75rem',
                          backgroundColor: isDarkMode ? '#0f172a' : 'white',
                          border: `2px solid ${quizAnswers[question.id] === optIdx ? '#2563eb' : 'transparent'}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={optIdx}
                          checked={quizAnswers[question.id] === optIdx}
                          onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                          style={{ marginRight: '0.75rem' }}
                        />
                        <span style={{ color: isDarkMode ? '#e2e7eb' : '#374151' }}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {question.passageReference && (
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '0.85rem', margin: '1rem 0 0 0' }}>
                    📖 {question.passageReference}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitQuiz}
            disabled={answeredCount < quiz.questions.length}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: answeredCount < quiz.questions.length ? '#cbd5e1' : '#2563eb',
              color: answeredCount < quiz.questions.length ? '#64748b' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: answeredCount < quiz.questions.length ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              if (answeredCount >= quiz.questions.length) {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }
            }}
            onMouseLeave={(e) => {
              if (answeredCount >= quiz.questions.length) {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }
            }}
          >
            {answeredCount < quiz.questions.length
              ? `Answer all questions (${answeredCount}/${quiz.questions.length})`
              : 'Submit Quiz'}
          </button>
        </div>
      </div>
    );
  }

  // Quiz Results View
  if (viewMode === 'quizResults' && selectedLesson && lastQuizResult) {
    const { score, passed } = lastQuizResult;
    const passingScore = selectedLesson.quiz.passingScore;

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              marginBottom: '2rem',
              fontSize: '1.75rem',
              textAlign: 'center',
              margin: '0 0 2rem 0'
            }}
          >
            Quiz Results
          </h1>

          {/* Score Display */}
          <div
            style={{
              backgroundColor: passed ? '#d1fae5' : '#fee2e2',
              border: `2px solid ${passed ? '#10b981' : '#ef4444'}`,
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '2rem'
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: passed ? '#10b981' : '#ef4444',
                marginBottom: '0.5rem'
              }}
            >
              {score}%
            </div>
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                color: passed ? '#10b981' : '#ef4444',
                marginBottom: '0.5rem'
              }}
            >
              {passed ? '✅ Passed!' : '❌ Not Passed'}
            </div>
            <div
              style={{
                color: isDarkMode ? '#cbd5e1' : '#64748b'
              }}
            >
              You need {passingScore}% to pass this quiz
            </div>
          </div>

          {/* Feedback */}
          {selectedLesson.quiz.explanations && lastQuizResult.feedback && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937', marginBottom: '1rem' }}>
                Review Your Answers
              </h3>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {lastQuizResult.feedback.map((item: any, idx: number) => {
                  const { question, isCorrect } = item;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                        border: `1px solid ${isCorrect ? '#86efac' : '#fecaca'}`,
                        borderRadius: '8px',
                        padding: '1rem'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'start',
                          gap: '0.75rem',
                          marginBottom: '0.75rem'
                        }}
                      >
                        <span style={{ fontSize: '1.25rem' }}>
                          {isCorrect ? '✅' : '❌'}
                        </span>
                        <div style={{ flexGrow: 1 }}>
                          <p
                            style={{
                              color: isDarkMode ? '#f1f5f9' : '#1f2937',
                              fontWeight: '500',
                              margin: '0 0 0.5rem 0'
                            }}
                          >
                            {question.question}
                          </p>
                          <p
                            style={{
                              color: isDarkMode ? '#cbd5e1' : '#64748b',
                              fontSize: '0.9rem',
                              margin: '0 0 0.5rem 0'
                            }}
                          >
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            {selectedLesson.quiz.allowRetake && !passed && (
              <button
                onClick={() => {
                  setViewMode('quiz');
                  setQuizAnswers({});
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Retake Quiz
              </button>
            )}

            <button
              onClick={handleContinueCourse}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: passed ? '#10b981' : '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: passed ? 'pointer' : 'not-allowed',
                fontWeight: '500'
              }}
              disabled={!passed}
            >
              {passed ? 'Continue to Next Lesson' : 'Pass to Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
