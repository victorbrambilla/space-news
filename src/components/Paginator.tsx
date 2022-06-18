import { Pagination } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Props {
  page: number;
  handleSetPage: (page: number) => void;
  limit: number;
}

function Paginator({ page, handleSetPage, limit }: Props): JSX.Element {
  const [count, setCount] = useState<number | any>(0);

  useEffect(() => {
    api.getTotalArticlesCount().then((data) => {
      const total = Math.round(+data / limit);
      setCount(total);
    });
  }, []);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    handleSetPage(value);
  };

  return (
    <Pagination
      size='large'
      count={count}
      page={page}
      onChange={handleChange}
      color='primary'
    />
  );
}

export default Paginator;
