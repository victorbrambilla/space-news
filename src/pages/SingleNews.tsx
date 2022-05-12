import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { api } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import logo from '../assets/logo.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IArticles } from '../types/types';
import { formatTimeBetween } from '../helpers/formatTimeBetween';
import { dirname } from 'path';

function SingleNews(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<IArticles>();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    if (params.id !== undefined) {
      setId(parseInt(params.id, 10));
      console.log(params.id);
      api
        .getArticlesById(params.id)
        .then((data) => {
          setArticle(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (id !== 0) {
      api
        .getArticlesById(id)
        .then((data) => {
          setArticle(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleNextNews = (id: number | undefined) => {
    if (id) {
      console.log(id);
      setId(id + 1);
    }
  };
  const handlePreviousNews = (id: number | undefined) => {
    if (id) {
      console.log(id);
      setId(id - 1);
    }
  };
  if (loading) {
    return (
      <Backdrop
        open
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '920px',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          margin: '50px',
          '@media (max-width: 1340px)': {
            height: 'auto',
          },
        }}
      >
        <Grid item xs={12} sm>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => {
                navigate('/');
              }}
            >
              <ArrowBackIcon fontSize='large' color='primary' />
            </Button>

            <Typography variant='h6' component='div' marginLeft={2}>
              <img src={logo} alt='logo'></img>
            </Typography>
          </Box>
        </Grid>

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
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '10px',
            }}
            item
            xs={12}
          >
            <Box
              sx={{
                flexDirection: 'column',
                display: 'flex',
                width: '100%',
                fontSize: '2.5rem',
                textAlign: 'start',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h4' component='div'>
                {article?.title}
              </Typography>
              <Typography variant='h6' component='div' color='GrayText'>
                {formatTimeBetween(article?.publishedAt)}
              </Typography>
              <Box
                sx={{
                  height: '500px',
                  backgroundImage: `url(${article?.imageUrl})`,
                  backgroundSize: 'cover',
                }}
              ></Box>
              <Typography variant='h6' component='div'>
                {article?.summary}
              </Typography>
              <Button
                sx={{ display: 'flex', width: '200px', color: 'white' }}
                variant='contained'
                color='primary'
                href={article?.url}
              >
                Ver no site
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                }}
              >
                <Button
                  onClick={() => {
                    handlePreviousNews(article?.id);
                  }}
                >
                  <ArrowBackIcon fontSize='large' color='primary' />
                </Button>
                <Button
                  onClick={() => {
                    handleNextNews(article?.id);
                  }}
                >
                  <ArrowForwardIcon fontSize='large' color='primary' />
                </Button>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default SingleNews;
