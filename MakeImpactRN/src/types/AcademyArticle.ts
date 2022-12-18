export interface AcademyArticle {
  id: string;
  author: string;
  title: string;
  summary: string;
  content: string;
  disclaimer: string;
  dateOfCreation: string;
  dateOfPublication: string;
  categoryId: string;
  tags: string[];
  thumbnailLink: string;
  videoLink: string;
  trending: boolean;
}
