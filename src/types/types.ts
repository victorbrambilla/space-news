export interface IArticles {
  events: any[];
  featured: boolean;
  id: number;
  imageUrl: string;
  launches: any[];
  newsSite: string;
  publishedAt: string;
  summary: string;
  title: string;
  updatedAt: string;
  url: string;
}
export interface IArticlesResponse {
  data: IArticles[];
}
export interface IArticleCount {
  data: number;
}
