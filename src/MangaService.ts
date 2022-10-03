import axios from "axios";

const mangaClient = axios.create({
  baseURL: "http://18.177.140.79:8080",
});

const getBooks = () => {
  return mangaClient.get("/books/");
};

const getChapter = (chapterId: number) => {
  return mangaClient.get(`/chapters/${chapterId}/`);
};

const MangaService = {
  getBooks,
  getChapter,
};

export default MangaService;
