import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { IArticles } from '../types/types';
import { formatTimeBetween } from '../helpers/formatTimeBetween';
import { useNavigate } from 'react-router-dom';

interface Props {
  articles: IArticles[];
}

function News({ articles }: Props): JSX.Element {
  let navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '100%',
          flexWrap: 'wrap',
        }}
      >
        {articles.map((article) => (
          <Card
            key={article.id}
            sx={{
              maxWidth: 350,
              m: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardActionArea>
              <CardMedia
                component='img'
                height='140'
                image={article.imageUrl}
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {article.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {article.summary.substring(0, 100)}...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 8px',
              }}
            >
              <Button
                size='small'
                color='primary'
                onClick={() => {
                  navigate(`/news/${article.id}`);
                }}
              >
                Ver
              </Button>
              <Typography
                variant='caption'
                color='text.secondary'
                paddingRight={2}
              >
                {formatTimeBetween(article.publishedAt)}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default News;
