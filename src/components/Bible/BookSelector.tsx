import type { BibleBook } from '../../types/bible';

interface BookSelectorProps {
  books: BibleBook[];
  currentBook: BibleBook;
  onBookChange: (bookId: string) => void;
}

export default function BookSelector({ books, currentBook, onBookChange }: BookSelectorProps) {
  const otBooks = books.filter(b => b.testament === 'OT');
  const ntBooks = books.filter(b => b.testament === 'NT');

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Book:</label>
      <select
        value={currentBook.id}
        onChange={(e) => onBookChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <optgroup label="Old Testament">
          {otBooks.map(book => (
            <option key={book.id} value={book.id}>
              {book.bookNumber}. {book.bookName}
            </option>
          ))}
        </optgroup>
        <optgroup label="New Testament">
          {ntBooks.map(book => (
            <option key={book.id} value={book.id}>
              {book.bookNumber - 39}. {book.bookName}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
