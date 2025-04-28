
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Badge,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';

const TopBar = () => {
  const navigate = useNavigate();

  const { items, total } = useSelector((state) => state.cart);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <Box
      sx={{
        bgcolor: '#f5f5f5',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100px',
      }}
    >
     
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box
          component="img"
          src="shoppin1.jpg"
          alt="Shopping Icon"
          sx={{ width: 60, height: 60 }}
        />
        <Box>
          <Typography variant="h6" sx={{ color: '#ff6600', fontWeight: 'bold' }}>
            Shopping Cart
          </Typography>
          <Typography variant="body2">
            Build your own online store
          </Typography>
        </Box>
      </Box>

      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          placeholder="Search products..."
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ff6600',
              },
            },
          }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: '#ff6600' }} />,
          }}
        />
        
        <IconButton onClick={() => navigate('/')}>
          <HomeIcon fontSize="medium" />
        </IconButton>

        <IconButton onClick={() => navigate('/Addcart')}>
          <Badge
            badgeContent={itemCount}
            showZero
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#ff6600',
                color: 'white',
              },
            }}
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Total: ${total.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TopBar;
