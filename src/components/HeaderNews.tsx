import React from 'react';
import logo from '../assets/logo.svg';
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers';

interface Props {
  handleSetLimit: (value: number) => void;
  handleSetWord: (value: string) => void;
  handleSetInitialDate: (value: Date | null) => void;
  handleSetFinalDate: (value: Date | null) => void;
  handleReset: (value: boolean) => void;
  limit: number;
  word: string;
  initialDate: Date | null;
  finalDate: Date | null;
}

function HeaderNews({
  handleSetLimit,
  handleSetWord,
  handleSetInitialDate,
  handleSetFinalDate,
  limit,
  word,
  initialDate,
  finalDate,
  handleReset,
}: Props) {
  const handleResetFilters = () => {
    handleSetLimit(10);
    handleSetWord('');
    handleSetInitialDate(null);
    handleSetFinalDate(null);
    handleReset(true);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: '300px',
        '@media (max-width: 1340px)': {
          height: 'auto',
        },
      }}
    >
      <Grid item xs={12} sm>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            '@media (max-width: 1500px)': {
              alignItems: 'start',
              flexDirection: 'column',
            },
          }}
        >
          <Typography variant='h6' component='div'>
            <img src={logo} alt='logo'></img>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              '& > :not(style)': { m: 1 },
              width: 'auto',
              '@media (max-width: 1340px)': {
                flexWrap: 'wrap',
              },
            }}
          >
            <FormControl fullWidth variant='standard'>
              <InputLabel>Pesquisar</InputLabel>
              <Input
                value={word}
                onChange={(e) => handleSetWord(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant='standard' fullWidth>
              <InputLabel>Limite por página</InputLabel>
              <Select
                value={limit}
                onChange={(e) => handleSetLimit(+e.target.value)}
                defaultValue={10}
              >
                <MenuItem value={10}>
                  <em>10</em>
                </MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>

            <DatePicker
              label='Data inicial'
              value={initialDate}
              onChange={(newValue) => {
                handleSetInitialDate(newValue);
              }}
              renderInput={(params) => (
                <TextField fullWidth variant='standard' {...params} />
              )}
            />

            <DatePicker
              label='Data final'
              value={finalDate}
              onChange={(newValue) => {
                handleSetFinalDate(newValue);
              }}
              renderInput={(params) => (
                <TextField fullWidth variant='standard' {...params} />
              )}
            />
            <Button
              size='small'
              variant='outlined'
              onClick={handleResetFilters}
            >
              Limpar filtros
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        sx={{ display: 'flex', alignItems: 'center', paddingBottom: '10px' }}
        item
        xs={12}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            fontSize: '2.5rem',
            marginRight: '15px',
            '@media (max-width: 1340px)': {
              fontSize: '1.5rem',
            },
          }}
        >
          Últimas notícias
        </Box>
        <Box sx={{ width: '80%', height: '1px', bgcolor: 'GrayText' }}></Box>
      </Grid>
    </Grid>
  );
}

export default HeaderNews;
