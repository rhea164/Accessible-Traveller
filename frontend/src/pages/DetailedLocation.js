import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Chip,
  Rating,
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
      onContributionSubmit(); // Trigger re-render in parent component
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth className="backdrop-blur" >

      <div className="flex md:flex-row flex-col p-10">
        <img className="rounded-lg border-4"
          src={location?.photo_url || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={location?.name || 'No Image'}
          style={{  height: '200px', width: '300px' }}
        />

        <div className="flex flex-col justify-center mb-6 mx-5 gap-1	">
            <Typography sx={{ fontSize: 50}}>
              {location?.name}
            </Typography>

            <Typography sx={{ color: '#010101', marginTop: 0 }}>{
              location?.address}
            </Typography>


            <Typography variant="body2">
              ({location?.rating}) · {location?.user_ratings_total} reviews
            </Typography>
            <Rating value={location?.rating} readOnly precision={0.1} />
        </div>
      </div>

        <DialogContent>

          <Typography className="" sx={{ fontSize: 30, alignSelf:'center'}}>
            Current Opinions
          </Typography>
          <div className="flex md:flex-row flex-col justify-center items-center gap-5 mx-5">
            {userContributions.map((contribution, index) => (
            <div
              key={index}
              className="p-5 rounded-lg bg-blue-100 mt-1 justify-self-center items-center">
              <Rating value={contribution?.rating} readOnly precision={0.1} />
              <p className="text-sm">Comment: {contribution.comment}</p>
              <p className="text-sm">Features: {contribution.accessibility_info.features.join(', ')}</p>
            </div>
            ))}
          </div>

        <div className="flex flex-col border-4 p-1 rounded-lg my-5 mt-8 justify-center items-center">
          <DialogContent className="text-3xl w-full text-center">Help us by submitting a contribution!</DialogContent>

          <div className="flex flex-col p-3 rounded-lg items-center justify-center">
            <Typography variant="h6" className="p-3">Accessibility Features</Typography>
            <Grid container spacing={1} className="p-3 items-center justify-center">
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
          </div>
            
          <p className="mt-5">Believe there's an important tag to describe this place? Add it here!</p>
          <div className="flex flex-row p-3 border-4 rounded-lg w-1/2 my-5">
            <input className="h-[55px] w-4/5 focus:outline-none"
              placeholder="Add Custom Feature"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}>
            </input>

            <button onClick={handleAddCustomFeature} className="bg-blue-500 
                            hover:bg-blue-700 transition duration-300 ease-in-out
                            text-white font-bold py-2 px-4 rounded w-[75px] h-[55px]">
                            ADD
            </button>
          </div>

          <p className="mt-5">Here's your space to add any additional information, if needed.</p>
            <textarea
              placeholder="Write your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="p-5 m-5 w-3/4 focus:outline-none border-4 rounded-lg"
            ></textarea>

            <div className="flex flex-row justify-center items-center h-[100px] m-5 rounded-lg p-7 bg-gray-100 gap-3">
              <p className="text-center flex items-center">And last but not least, your rating of the place:</p>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
              />
            </div>


            <button onClick={handleSubmit} className="bg-blue-500 
                            hover:bg-blue-700 transition duration-300 ease-in-out
                            text-white font-bold py-2 px-4 rounded w-full mt-10 h-[80px] text-2xl">
              Thank you so much! Press here to submit your contribution.
            </button>

        </div>

      </DialogContent>
    </Dialog>
  );
}

export default DetailedLocation;