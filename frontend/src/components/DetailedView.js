import React from 'react';
import '../index.css';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DetailedView = ({ place, onClose }) => {
  return (
    <div className="detailed-view show p-5 border-none shadow-none backdrop-blur-lg">
      <div className="bg-none">
            <IconButton onClick={onClose} style={{}}>
                <CloseIcon />
            </IconButton>
        <Card style={{ height: '100%', padding: '20px' }} className="border-none shadow-none bg-none">
          <CardMedia
            component="img"
            height="300"
            image={place.photo_url || 'https://via.placeholder.com/400x200?text=No+Image'}
            alt={place.name}
            style={{ objectFit: 'cover', height: '300px', width: '100%' }}
          />
          <CardContent>
            <Typography variant="h4" component="div">
              {place.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {place.address}
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating value={place.rating} readOnly precision={0.1} />
              <Typography variant="body1" ml={1}>
                ({place.rating}) · {place.user_ratings_total} reviews
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {/* Add more detailed information here */}
              Accessibility Info: {place.accessibility_info || 'Not available'}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DetailedView;
