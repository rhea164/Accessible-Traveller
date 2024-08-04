import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Chip,
  Grid,
  Typography,
  Box,
} from '@mui/material';

const accessibilityFeatures = [
  'Ramps',
  'Low Noise',
  'Well Lit',
  'Accessible Toilets',
  'Low Light',
  'Quiet Spaces',
];

function DetailedLocation({ open, handleClose, location, onContributionSubmit }) {
  const [accessibilityInfo, setAccessibilityInfo] = useState({});
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [customFeature, setCustomFeature] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [userContributions, setUserContributions] = useState([]);

  useEffect(() => {
    if (location) {
      fetchAccessibilityInfo();
      fetchUserContributions();
    }
    return () => resetFields();
  }, [location]);

  const fetchAccessibilityInfo = async () => {
    if (!location) return;
    try {
      const response = await axios.get(`http://localhost:8000/locations/${location.place_id}/accessibility`);
      setAccessibilityInfo(response.data);
      setSelectedFeatures(response.data.features || []);
    } catch (error) {
      console.error("Error fetching accessibility info:", error);
    }
  };

  const fetchUserContributions = async () => {
    if (!location) return;
    try {
      const response = await axios.get(`http://localhost:8000/locations/${location.place_id}/contributions`);
      setUserContributions(response.data);
    } catch (error) {
      console.error("Error fetching user contributions:", error);
    }
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleAddCustomFeature = () => {
    if (customFeature && !selectedFeatures.includes(customFeature)) {
      setSelectedFeatures([...selectedFeatures, customFeature]);
      setCustomFeature('');
    }
  };

  const handleSubmit = async () => {
    if (!location) return;
    try {
      await axios.post(`http://localhost:8000/locations/${location.place_id}/contribute`, {
        accessibility_info: {
          features: selectedFeatures,
        },
        rating,
        comment,
      });
      onContributionSubmit(location.place_id, { features: selectedFeatures, rating, comment });
      resetFields();
      handleClose();
    } catch (error) {
      console.error("Error submitting contribution:", error);
    }
  };

  const resetFields = () => {
    setSelectedFeatures([]);
    setCustomFeature('');
    setComment('');
    setRating(0);
    setAccessibilityInfo({});
    setUserContributions([]);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Accessibility Features for {location?.name}</DialogTitle>
      <DialogContent>
        <Box>
          
          <Typography variant="h6">Selected Features:</Typography>
          <Box display="flex" flexWrap="wrap" mb={2}>
            {selectedFeatures.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                onDelete={() => handleFeatureToggle(feature)} 
                color="primary"
                variant="outlined"
                style={{ margin: 2 }}
              />
            ))}
          </Box>
          
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Add Custom Feature"
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                onClick={handleAddCustomFeature}
                fullWidth
              >
                Add Feature
              </Button>
            </Grid>
          </Grid>
  
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Rating:</Typography>
              <TextField
                type="number"
                inputProps={{ min: 0, max: 5 }}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                fullWidth
              />
            </Grid>
          </Grid>
  
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12}>
              <TextField
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
  
          <Box mt={4}>
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              style={{ marginRight: '10px' }}
            >
              Submit Contribution
            </Button>
            <Button
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DetailedLocation;