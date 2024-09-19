// src/components/AdminFilter.js
import React from 'react';
import { TextField, Box } from '@mui/material';
import debounce from 'lodash.debounce';

const AdminFilter = ({ filterText, setFilterText }) => {
  const [inputValue, setInputValue] = React.useState(filterText);

  // Debounce the filter function to improve performance
  const debouncedFilter = React.useRef(
    debounce((value) => {
      setFilterText(value);
    }, 300)
  ).current;

  React.useEffect(() => {
    debouncedFilter(inputValue);
    return () => {
      debouncedFilter.cancel();
    };
  }, [inputValue, debouncedFilter]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Box mb={4}>
      <TextField
        label="Filter by name or email"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleChange}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '8px',
          },
        }}
      />
    </Box>
  );
};

export default AdminFilter;