
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from './redux/cartSlice';

import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Grid,
  Paper,
  Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

const Addcart = () => {
  const { items: cartItems, subtotal, discount, shipping, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shopping cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Shop → Shopping Cart
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={10}
          sx={{
            flexGrow: 1,
          }}>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your cart details are saved here
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Name and Rating</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Discount%</TableCell>
                <TableCell>Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <IconButton size="small" onClick={() => dispatch(removeFromCart(item.id))}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <img src={item.thumbnail} alt={item.title} style={{ width: 50, height: 50 }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {item.rating}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <IconButton size="small" onClick={() => dispatch(decrementQuantity(item.id))}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography mx={1}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => dispatch(incrementQuantity(item.id))}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    ${((item.price * item.discountPercentage / 100) * item.quantity).toFixed(2)}
                  </TableCell>

                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="body2" color="text.secondary" fontStyle="italic" mt={2}>
            Special instruction for seller
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Paper sx={{ p: 3, border: '1px solid #eee' }}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Subtotal:</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Shipping:</Typography>
                <Typography>${shipping.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Discount:</Typography>
                <Typography>-${discount.toFixed(2)}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="h6">Total USD</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>

            <TextField
              fullWidth
              placeholder="Enter coupon code here"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ py: 1.5 }}
            >
              Check Out
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Addcart;
