import React from "react";
import { Book } from "../../models/Book";

interface BooksProps {
  booksList: Book[];
  selectedBook: any;
  handleBookChange: (index: number) => void;
}

const Books: React.FC<BooksProps> = ({
  booksList,
  selectedBook,
  handleBookChange,
}) => {
  return (
    <div id="books">
      {booksList.map((book, index) => (
        <button
          key={book.id}
          className={book.id === selectedBook?.id ? "selected" : ""}
          onClick={() => handleBookChange(index)}
        >
          {book?.title}
        </button>
      ))}
    </div>
  );
};

export default Books;
