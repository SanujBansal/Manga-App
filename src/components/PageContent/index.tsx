import React from "react";
import { Chapter } from "../../models/Chapter";

interface PageContentProps {
  handleImageClick: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => void;
  selectedChapter: Chapter;
  currentPageIndex: number;
}

const PageContent: React.FC<PageContentProps> = ({
  handleImageClick,
  selectedChapter,
  currentPageIndex,
}) => (
  <div id="content">
    <img
      id="story-image"
      alt="manga"
      height={600}
      width={500}
      onClick={(e) => handleImageClick(e)}
      src={selectedChapter?.pages[currentPageIndex].image.file}
    />
  </div>
);
export default PageContent;
