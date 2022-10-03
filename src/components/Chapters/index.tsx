import React from "react";
import { Book } from "../../models/Book";

interface ChaptersProps {
  selectedChapterId?: number;
  setSelectedChapterId: (chapterId: number) => void;
  selectedBook: Book;
}

const Chapters: React.FC<ChaptersProps> = ({
  selectedChapterId,
  setSelectedChapterId,
  selectedBook,
}) => (
  <div id="chapters">
    {selectedBook?.chapter_ids.map((chapterId: number) => (
      <button
        key={chapterId}
        className={chapterId === selectedChapterId ? "selected" : ""}
        onClick={() => setSelectedChapterId(chapterId)}
      >
        {chapterId}
      </button>
    ))}
  </div>
);
export default Chapters;
