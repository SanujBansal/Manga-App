import { useEffect, useState } from "react";
import "./App.css";
import Books from "./components/Books";
import Chapters from "./components/Chapters";
import PageContent from "./components/PageContent";
import MangaService from "./MangaService";
import { Book } from "./models/Book";
import { Chapter } from "./models/Chapter";

export default function App() {
  const [booksList, setBooksList] = useState<Array<any>>([]);
  const [selectedBook, setSelectedBook] = useState<any>();
  const [selectedChapter, setSelectedChapter] = useState<any>();
  const [selectedChapterId, setSelectedChapterId] = useState<number>();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  useEffect(() => {
    MangaService.getBooks()
      .then(({ data: books }: { data: Book[] }) => {
        setBooksList(books);
        // selecting first book in the list and and its first chapter by default
        setSelectedBook(books[0]);
        setSelectedChapterId(books[0]?.chapter_ids?.[0]);
      })
      .catch((err) =>
        console.log("There is a problem while getting list of books", err)
      );
  }, []);

  useEffect(() => {
    if (selectedChapterId)
      MangaService.getChapter(selectedChapterId).then(
        ({ data: chapter }: { data: Chapter }) => {
          setSelectedChapter(chapter);
          setCurrentPageIndex(0);
        }
      );
  }, [selectedChapterId]);

  const handleBookChange = (index: number) => {
    setSelectedBook(booksList[index]);
    setSelectedChapterId(booksList[index].chapter_ids[0]);
  };

  const handleImageClick = (e: any) => {
    const imageElem = document.querySelector("#story-image");
    let rect = imageElem?.getBoundingClientRect();
    let x = e.clientX - (rect?.left || 0);
    // if x axis coordinates of click are > (width of image)/2, that means click is not the right side else click is not left side
    if (x > 250) {
      // go to prev page or chapter
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1);
      } else {
        setCurrentPageIndex(0);

        const chapterIndex = selectedBook.chapter_ids.findIndex(
          (id: number) => id === selectedChapterId
        );
        // go to prev chapter;
        if (chapterIndex > 0) {
          setSelectedChapterId(selectedBook.chapter_ids[chapterIndex - 1]);
        }
      }
    } else {
      // go to next page or chapter
      if (currentPageIndex + 1 < selectedChapter?.pages.length) {
        setCurrentPageIndex(currentPageIndex + 1);
      } else {
        setCurrentPageIndex(0);
        const chapterIndex = selectedBook.chapter_ids.findIndex(
          (id: number) => id === selectedChapterId
        );

        // go to next chapter;
        if (chapterIndex + 1 < selectedBook.chapter_ids.length) {
          setSelectedChapterId(selectedBook.chapter_ids[chapterIndex + 1]);
        }
      }
    }
  };

  return (
    <div className="App">
      <Books
        selectedBook={selectedBook}
        handleBookChange={handleBookChange}
        booksList={booksList}
      />

      <Chapters
        selectedBook={selectedBook}
        selectedChapterId={selectedChapterId}
        setSelectedChapterId={setSelectedChapterId}
      />

      <PageContent
        handleImageClick={handleImageClick}
        currentPageIndex={currentPageIndex}
        selectedChapter={selectedChapter}
      />
      <div id="page-footer">
        {currentPageIndex + 1}/{selectedChapter?.pages.length}
      </div>
    </div>
  );
}
