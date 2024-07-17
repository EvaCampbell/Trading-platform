// Counter.js
import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const Counter = () => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#2d2d2d', borderRadius: 1, p: 1, color: '#fff', justifyContent:"space-between" }}>
      <IconButton onClick={handleDecrement} sx={{ color: '#fff' }}>
        <Remove />
      </IconButton>
      <Typography sx={{ mx: 2 }}>{value.toFixed(2)}</Typography>
      <IconButton onClick={handleIncrement} sx={{ color: '#fff' }}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default Counter;
