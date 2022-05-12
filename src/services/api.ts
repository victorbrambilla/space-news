import axios from 'axios';
import { IArticleCount, IArticles, IArticlesResponse } from '../types/types';
const url = process.env.BASE_URL;

const instance = axios.create({
  baseURL: 'https://api.spaceflightnewsapi.net/v3',
});

export const api = {
  getArticles: async (limit: number, page: number) => {
    const { data } = await instance.get<IArticles[]>(
      `/articles?_limit=${limit}&_start=${page}`
    );
    return data;
  },
  getArticlesById: async (Id: string | number) => {
    const { data } = await instance.get<IArticles>(`/articles/${Id}`);
    return data;
  },
  getArticlesBytitle: async (text: string, limit: number, page: number) => {
    const { data } = await instance.get<IArticles[]>(
      `/articles?title_contains=${text}&_limit=${limit}&_start=${page}`
    );
    return data;
  },
  getArticlesByDate: async (
    initialDate: Date,
    finalDate: Date,
    limit: number,
    page: number
  ) => {
    console.log(new Date(finalDate).toISOString());
    const { data } = await instance.get<IArticles[]>(
      `/articles?publishedAt_gte=${new Date(
        initialDate
      ).toISOString()}&publishedAt_lte=${new Date(
        finalDate
      ).toISOString()}&_limit=${limit}&_start=${page}`
    );
    return data;
  },
  getTotalArticlesCount: async () => {
    const { data } = await instance.get<IArticleCount>(`/articles/count`);
    return data;
  },
};
