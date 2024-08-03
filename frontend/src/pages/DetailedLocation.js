// DetailedLocationView.js
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

function DetailedLocation({ open, handleClose, location }) {
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
  }, [location]);

  const fetchAccessibilityInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/locations/${location.place_id}/accessibility`);
      setAccessibilityInfo(response.data);
      setSelectedFeatures(response.data.features || []);
    } catch (error) {
      console.error("Error fetching accessibility info:", error);
    }
  };

  const fetchUserContributions = async () => {
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

  const handleSubmit = async ({onContributionSubmit}) => {
    try {
      await axios.post(`http://localhost:8000/locations/${location.place_id}/contribute`, {
        accessibility_info: {
          features: selectedFeatures,
        },
        rating,
        comment,
      });
      onContributionSubmit(); // Trigger re-render in parent component
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
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{location?.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{location?.formatted_address}</Typography>
        <Box my={2}>
          <Typography variant="h6">Accessibility Features</Typography>
          <Grid container spacing={1}>
            {accessibilityFeatures.map((feature) => (
              <Grid item key={feature}>
                <Chip
                  label={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  color={selectedFeatures.includes(feature) ? "primary" : "default"}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box my={2}>
          <TextField
            label="Add custom feature"
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
          />
          <Button onClick={handleAddCustomFeature}>Add</Button>
        </Box>
        <TextField
          label="Comment"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Rating"
          type="number"
          inputProps={{ min: 0, max: 5, step: 0.5 }}
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Contribution
        </Button>
        <Typography variant="h6" mt={2}>User Contributions</Typography>
        {userContributions.map((contribution, index) => (
          <Box key={index} mt={1}>
            <Typography variant="body2">Rating: {contribution.rating}</Typography>
            <Typography variant="body2">Comment: {contribution.comment}</Typography>
            <Typography variant="body2">Features: {contribution.accessibility_info.features.join(', ')}</Typography>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default DetailedLocation;