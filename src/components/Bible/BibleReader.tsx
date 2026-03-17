import { useEffect, useState } from 'react';
import { useBibleStore } from '../../store/useBibleStore';
import type { BibleBook, Verse } from '../../types/bible';
import BookSelector from './BookSelector';
import ChapterSelector from './ChapterSelector';
import VerseList from './VerseList';

interface BibleReaderProps {
  isDarkMode?: boolean;
}

export default function BibleReader({ isDarkMode = false }: BibleReaderProps) {
  const { currentPassage, setCurrentPassage, bibleBooks } = useBibleStore();
  const [currentBook, setCurrentBook] = useState<BibleBook | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Set current book based on currentPassage
  useEffect(() => {
    if (bibleBooks.length === 0) {
      setIsLoading(true);
      return;
    }

    // Find the book matching the current passage
    const bookId = `${currentPassage.testament}-${String(currentPassage.bookNumber).padStart(2, '0')}`;
    const book = bibleBooks.find(b => b.id === bookId);
    if (book) {
      setCurrentBook(book);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [currentPassage.testament, currentPassage.bookNumber, bibleBooks]);

  // Load verses when chapter changes
  useEffect(() => {
    if (!currentBook) return;

    // Find the chapter in the current book
    const chapter = currentBook.chapters.find(ch => ch.chapterNum === currentPassage.chapterNum);
    setVerses(chapter?.verses || []);
  }, [currentBook, currentPassage.chapterNum]);

  const handleBookChange = (bookId: string) => {
    const book = bibleBooks.find(b => b.id === bookId);
    if (book) {
      setCurrentPassage({
        testament: book.testament,
        bookNumber: book.bookNumber,
        bookName: book.bookName,
        chapterNum: 1,
        verseNum: 1,
      });
    }
  };

  const handleChapterChange = (chapterNum: number) => {
    setCurrentPassage({
      ...currentPassage,
      chapterNum,
      verseNum: 1,
    });
  };

  const handleNextChapter = () => {
    if (!currentBook) return;

    // Check if there's a next chapter in current book
    if (currentPassage.chapterNum < currentBook.totalChapters) {
      setCurrentPassage({
        ...currentPassage,
        chapterNum: currentPassage.chapterNum + 1,
        verseNum: 1,
      });
    } else {
      // Move to next book
      const currentBookIndex = bibleBooks.findIndex(b => b.id === currentBook.id);
      if (currentBookIndex < bibleBooks.length - 1) {
        const nextBook = bibleBooks[currentBookIndex + 1];
        setCurrentPassage({
          testament: nextBook.testament,
          bookNumber: nextBook.bookNumber,
          bookName: nextBook.bookName,
          chapterNum: 1,
          verseNum: 1,
        });
      }
    }
  };

  const handlePreviousChapter = () => {
    if (!currentBook) return;

    // Check if there's a previous chapter in current book
    if (currentPassage.chapterNum > 1) {
      setCurrentPassage({
        ...currentPassage,
        chapterNum: currentPassage.chapterNum - 1,
        verseNum: 1,
      });
    } else {
      // Move to previous book
      const currentBookIndex = bibleBooks.findIndex(b => b.id === currentBook.id);
      if (currentBookIndex > 0) {
        const prevBook = bibleBooks[currentBookIndex - 1];
        setCurrentPassage({
          testament: prevBook.testament,
          bookNumber: prevBook.bookNumber,
          bookName: prevBook.bookName,
          chapterNum: prevBook.totalChapters,
          verseNum: 1,
        });
      }
    }
  };

  if (isLoading || !currentBook) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading Bible data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Header with selectors */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">📖 Bible Reading</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <BookSelector
            books={bibleBooks}
            currentBook={currentBook}
            onBookChange={handleBookChange}
          />
          <ChapterSelector
            totalChapters={currentBook.totalChapters}
            currentChapter={currentPassage.chapterNum}
            onChapterChange={handleChapterChange}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePreviousChapter}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            title="Previous chapter"
          >
            ← Previous
          </button>

          <div className="text-center font-semibold">
            {currentBook.bookName} {currentPassage.chapterNum}:{currentPassage.verseNum}
          </div>

          <button
            onClick={handleNextChapter}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            title="Next chapter"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Verse display */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
        <VerseList
          verses={verses}
          bookName={currentBook.bookName}
          chapterNum={currentPassage.chapterNum}
          bookNumber={currentBook.bookNumber}
          testament={currentBook.testament}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
