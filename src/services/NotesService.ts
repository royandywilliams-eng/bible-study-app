import type { SearchResult } from './SearchService';

export type HighlightColor = 'yellow' | 'blue' | 'green' | 'pink' | 'none';
export type NoteType = 'highlight' | 'note' | 'bookmark';

export interface Note {
  id: string;
  passageId: string; // Format: "BookName Chapter:Verse"
  bookName: string;
  chapterNum: number;
  verseNum: number;
  verseText: string;
  type: NoteType;
  highlightColor?: HighlightColor;
  noteText?: string;
  tags?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface NoteFilter {
  type?: NoteType;
  color?: HighlightColor;
  bookName?: string;
  tags?: string[];
}

class NotesServiceClass {
  private notes: Map<string, Note> = new Map();

  /**
   * Initialize with persisted notes (called on app startup)
   */
  hydrate(notesArray: Note[]): void {
    this.notes.clear();
    notesArray.forEach(note => {
      this.notes.set(note.passageId, note);
    });
  }

  /**
   * Add or update a note
   */
  addNote(
    result: SearchResult,
    type: NoteType,
    highlightColor?: HighlightColor,
    noteText?: string
  ): Note {
    const passageId = `${result.bookName} ${result.chapterNum}:${result.verseNum}`;
    const existingNote = this.notes.get(passageId);

    const note: Note = {
      id: passageId,
      passageId,
      bookName: result.bookName,
      chapterNum: result.chapterNum,
      verseNum: result.verseNum,
      verseText: result.verseText,
      type,
      highlightColor: highlightColor || 'none',
      noteText,
      tags: [],
      createdAt: existingNote?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    this.notes.set(passageId, note);
    return note;
  }

  /**
   * Remove a note by passage ID
   */
  removeNote(passageId: string): boolean {
    return this.notes.delete(passageId);
  }

  /**
   * Get a single note
   */
  getNote(passageId: string): Note | undefined {
    return this.notes.get(passageId);
  }

  /**
   * Get all notes
   */
  getAllNotes(): Note[] {
    return Array.from(this.notes.values());
  }

  /**
   * Filter notes by criteria
   */
  filterNotes(filter: NoteFilter): Note[] {
    return this.getAllNotes().filter(note => {
      if (filter.type && note.type !== filter.type) return false;
      if (filter.color && note.highlightColor !== filter.color) return false;
      if (filter.bookName && note.bookName !== filter.bookName) return false;
      if (filter.tags && filter.tags.length > 0) {
        const hasTag = filter.tags.some(tag => note.tags?.includes(tag));
        if (!hasTag) return false;
      }
      return true;
    });
  }

  /**
   * Get all highlights (not notes or bookmarks)
   */
  getHighlights(): Note[] {
    return this.filterNotes({ type: 'highlight' });
  }

  /**
   * Get all bookmarks
   */
  getBookmarks(): Note[] {
    return this.filterNotes({ type: 'bookmark' });
  }

  /**
   * Get notes for a specific passage
   */
  getPassageNotes(passageId: string): Note | undefined {
    return this.notes.get(passageId);
  }

  /**
   * Check if a passage is highlighted
   */
  isHighlighted(passageId: string): boolean {
    const note = this.notes.get(passageId);
    return note?.type === 'highlight' && note.highlightColor !== 'none';
  }

  /**
   * Check if a passage is bookmarked
   */
  isBookmarked(passageId: string): boolean {
    const note = this.notes.get(passageId);
    return note?.type === 'bookmark';
  }

  /**
   * Add a tag to a note
   */
  addTag(passageId: string, tag: string): void {
    const note = this.notes.get(passageId);
    if (note) {
      if (!note.tags) note.tags = [];
      if (!note.tags.includes(tag)) {
        note.tags.push(tag);
        note.updatedAt = Date.now();
      }
    }
  }

  /**
   * Remove a tag from a note
   */
  removeTag(passageId: string, tag: string): void {
    const note = this.notes.get(passageId);
    if (note && note.tags) {
      note.tags = note.tags.filter(t => t !== tag);
      note.updatedAt = Date.now();
    }
  }

  /**
   * Export notes as JSON
   */
  exportAsJSON(): string {
    return JSON.stringify(Array.from(this.notes.values()), null, 2);
  }

  /**
   * Export notes as CSV
   */
  exportAsCSV(): string {
    const notes = this.getAllNotes();
    const headers = ['Book', 'Chapter:Verse', 'Type', 'Color', 'Text', 'Note', 'Tags', 'Created'];
    const rows = notes.map(note => [
      note.bookName,
      `${note.chapterNum}:${note.verseNum}`,
      note.type,
      note.highlightColor || 'none',
      note.verseText.substring(0, 50),
      note.noteText || '',
      note.tags?.join(';') || '',
      new Date(note.createdAt).toLocaleDateString(),
    ]);

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  }

  /**
   * Import notes from JSON
   */
  importFromJSON(jsonData: string): void {
    try {
      const notes = JSON.parse(jsonData) as Note[];
      notes.forEach(note => {
        this.notes.set(note.passageId, note);
      });
    } catch (error) {
      console.error('Failed to import notes:', error);
      throw new Error('Invalid JSON format');
    }
  }

  /**
   * Clear all notes
   */
  clearAllNotes(): void {
    this.notes.clear();
  }

  /**
   * Get statistics
   */
  getStatistics() {
    const notes = this.getAllNotes();
    return {
      totalNotes: notes.length,
      highlights: notes.filter(n => n.type === 'highlight').length,
      bookmarks: notes.filter(n => n.type === 'bookmark').length,
      customNotes: notes.filter(n => n.type === 'note').length,
      byBook: Object.fromEntries(
        Array.from(
          new Map(notes.map(n => [n.bookName, (n as any)])).entries()
        ).map(([book]) => [
          book,
          notes.filter(n => n.bookName === book).length,
        ])
      ),
      byColor: Object.fromEntries(
        Array.from(
          new Map(
            notes.filter(n => n.highlightColor).map(n => [n.highlightColor, (n as any)])
          ).entries()
        ).map(([color]) => [
          color,
          notes.filter(n => n.highlightColor === color).length,
        ])
      ),
    };
  }
}

// Export singleton instance
export const NotesService = new NotesServiceClass();
