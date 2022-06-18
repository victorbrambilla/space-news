import { Backdrop, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeaderNews from '../components/HeaderNews';
import News from '../components/News';
import Paginator from '../components/Paginator';
import { api } from '../services/api';
import { IArticles } from '../types/types';

function Home() {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState(1);
  const [word, setWord] = useState<string>('');
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .getArticles(limit, page)
      .then((data) => {
        setArticles(data);
      })
      .finally(() => {
        console.log(articles);
        setLoading(false);
      });
  }, [limit, page, reset]);

  useEffect(() => {
    if (word !== '') {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            api
              .getArticlesBytitle(word, limit, page)
              .then((data) => {
                setArticles(data);
              })
              .finally(() => {
                setLoading(false);
              });
          } catch (err) {
            console.error(err);
          }
        };

        fetch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [word]);

  useEffect(() => {
    if (initialDate !== null && finalDate !== null) {
      setLoading(true);
      api
        .getArticlesByDate(initialDate, finalDate, limit, page)
        .then((data) => {
          setArticles(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [initialDate, finalDate]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Header />
        <Box
          sx={{
            margin: '50px',
            width: '100%',
          }}
        >
          <HeaderNews
            handleSetLimit={setLimit}
            handleSetWord={setWord}
            handleSetInitialDate={setInitialDate}
            handleSetFinalDate={setFinalDate}
            limit={limit}
            word={word}
            initialDate={initialDate}
            finalDate={finalDate}
            handleReset={setReset}
          />
          {loading ? (
            <Box
              sx={{
                color: '#fff',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress color='inherit' />
            </Box>
          ) : (
            <News articles={articles} />
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              mt: '50px',
            }}
          >
            <Paginator limit={limit} page={page} handleSetPage={setPage} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
