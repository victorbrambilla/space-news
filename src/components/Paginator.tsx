import { Pagination } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Props {
  page: number;
  handleSetPage: (page: number) => void;
}

function Paginator({ page, handleSetPage }: Props): JSX.Element {
  const [count, setCount] = useState<number | any>(0);

  useEffect(() => {
    api.getTotalArticlesCount().then((data) => {
      setCount(data);
      console.log(data);
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
