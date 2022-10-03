import { Book } from "./Book";

export interface Chapter {
  id: number;
  title: string;
  book: Book;
  chapter_index: number;
  pages: Page[];
}

export interface Page {
  id: number;
  page_index: number;
  image: Image;
}

export interface Image {
  id: number;
  file: string;
  width: number;
  height: number;
  created_at: Date;
  updated_at: Date;
}
