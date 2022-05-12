import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import { formatDistanceToNowStrict } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import React, { useEffect, useState } from 'react';
import { formatTimeBetween } from '../helpers/formatTimeBetween';
import { api } from '../services/api';
import { IArticles } from '../types/types';

function Header(): JSX.Element {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getArticles(5, 1)
      .then((data) => {
        setArticles(data);
      })
      .finally(() => {
        console.log(articles);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <AppBar
        position='static'
        sx={{
          flexGrow: 1,
          maxWidth: '300px',
          minWidth: '300px',
          height: '100%',
          '@media (max-width: 1340px)': {
            display: 'none',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            margin: '0',
            padding: '50px!important',
          }}
        >
          <Typography variant='h5' component='div'>
            Recentes
          </Typography>

          <Grid
            container
            spacing={0}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
              <>
                {articles.map((article) => (
                  <Grid
                    item
                    xs={12}
                    sm
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      color={'primary'}
                      variant='h6'
                      component='div'
                      mt={4}
                    >
                      {formatTimeBetween(article.publishedAt)}
                    </Typography>
                    <Typography variant='body2' component='div' mb={2}>
                      {article.summary}
                    </Typography>
                    <Divider />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
