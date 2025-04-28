import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartSlice';



function Home() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();


  useEffect(() => {
    const skip = page * rowsPerPage;

    fetch(`https://dummyjson.com/products?limit=${rowsPerPage}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);
      });
  }, [page, rowsPerPage]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert("Item is added to the cart")
  };
  

  return (
    <>
      <Box
        sx={{
          width: '85%',
          mx: 'auto',
          bgcolor: '#e0f7fa',
        }}
      >


        <Box
          sx={{
            bgcolor: '#f3e5f5',
            height: '30vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            FASHION WEEKEND
          </Typography>
          <Typography variant="h6" sx={{ color: '#ff6600' }}>
            FLAT 50% OFF – A New Great Look for New Season
          </Typography>
        </Box>


        <Grid
          container
          spacing={1}
          sx={{
            p: 3,
            justifyContent: 'space-between',
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                width: '23%',
                mb: 3,
                height: '420px',
              }}
            >
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}

              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.thumbnail}
                  alt={product.title}
                  onClick={() => handleCardClick(product)}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Tooltip title={product.description} >
                    <Typography variant="body2" color="secondary" gutterBottom
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        cursor: 'pointer',
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Tooltip>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: "center",
                      mt: 'auto',
                    }}
                  >
                    <Typography variant="body1" sx={{ color: '#ff6600', fontWeight: 'bold' }}>
                      ${product.price}
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: '#ff6600' }} 
                    onClick={() => handleAddToCart(product)}
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Grid>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedProduct?.title}</DialogTitle>
          <DialogContent>

            <Typography variant="body1">
              Discount %:{selectedProduct?.discountPercentage}
            </Typography>
            <Typography variant="body1" color="primary">
              Rating :{selectedProduct?.rating}
            </Typography>
            <Typography variant="body1" >
              Stock :{selectedProduct?.stock}
            </Typography>
            <Typography variant="body1" >
              Reviews :
              {selectedProduct?.reviews?.length > 0 ? (
                selectedProduct.reviews.map((review, index) => (
                  <Box
                    key={index}
                    sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {review.reviewerName} ({review.rating}/5)
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {review.reviewerEmail}
                    </Typography>
                    <Typography variant="body1">{review.comment}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2">No reviews yet.</Typography>

              )}
            </Typography>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
       
       
        <TablePagination
          component="div"
          count={totalProducts}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value));
            setPage(0); 
            

          }}
          rowsPerPageOptions={[8, 16, 24]}
          
        />
      </Box>
    </>
  );
}

export default Home;
