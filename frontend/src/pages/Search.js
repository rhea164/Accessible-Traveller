import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailedLocation from './DetailedLocation';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  CardActionArea
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WcIcon from '@mui/icons-material/Wc';
import DetailedView from '../components/DetailedView.js';  // Import the new component

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const accessibilityFeatures = useMemo(() => [
    { label: 'Ramps', icon: <AccessibilityNewIcon /> },
    { label: 'Low Noise', icon: <VolumeDownIcon /> },
    { label: 'Well Lit', icon: <WbSunnyIcon /> },
    { label: 'Accessible Toilets', icon: <WcIcon /> },
  ], []);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/search`, {
        params: {
          query: searchQuery,
          features: selectedFeatures,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("An error occurred while fetching results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedFeatures]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [handleSearch, searchQuery]);

  const handleCardClick = (place) => {
    setSelectedLocation(place);
  };

  const handleCloseDetailedView = () => {
    setSelectedLocation(null);
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleContributionSubmit = (placeId, newContribution) => {
    setSearchResults(prevResults =>
      prevResults.map(place =>
        place.place_id === placeId
          ? {
            ...place,
            accessibility_info: {
              ...place.accessibility_info,
              features: [...new Set([...(place.accessibility_info?.features || []), ...newContribution.features])]
            },
            ratings: [...(place.ratings || []), { rating: newContribution.rating, comment: newContribution.comment }]
          }
          : place
      )
    );
    setSelectedLocation(null);
  };


  return (
    <div className="mx-32 mb-12">
      <div className="flex justify-center items-center flex-col bg-off-white
                      rounded-xl shadow-xl p-2">
        <div className="flex flex-col items-center justify-center p-14 gap-y-5">
          <h1 className="text-5xl">Hi, where would you like to go?</h1>
          <h4 className="text-2xl font-semibold ">Tell us your preferences</h4>
        </div>

        {/* Search Bar */}
          <div className="flex border-4 hover:border-lime-950 
                          transition duration-300 ease-in-out
                          w-2/3 p-3 rounded-lg">
            <div className="flex flex-row w-full">
              <input
                className="w-4/5 p-4 focus:outline-none rounded-lg"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a place..."
                aria-label="Search for a place"
              />
              <button
                className="w-1/5 justify-center flex flex-row bg-lime-950
                          hover:bg-lime-600 transition duration-300 ease-in-out items-center
                          text-white font-bold py-2 px-4 rounded align-left"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : (
                  <>
                    <SearchIcon />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

        {error && <div className="text-red-500 mt-2">{error}</div>}

        {/* Select Accessibility Features */}
        <div className="flex flex-col mt-10 items-center justify-center">
          <h4 className="text-xl mx-6 font-semibold ">Select Common Accessibility Features</h4>
          <div className="flex flex-row p-8">
            <Grid container spacing={3} justifyContent="center">
              {accessibilityFeatures.map((feature) => (
                <Grid item key={feature.label}>
                  <Chip
                    icon={feature.icon}
                    label={feature.label}
                    onClick={() => handleFeatureToggle(feature.label)}
                    color={selectedFeatures.includes(feature.label) ? "primary" : "secondary"}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>

        {/* <button className="bg-white text-green-950 border border-green-900 font-bold py-2 px-4 rounded
                    hover:bg-lime-950 hover:text-white
                    transition duration-300 ease-in-out mb-8"
          onClick={() => navigate('/browse')}>
          Browse our options
        </button> */}

        {/* Search Results */}
        <Container sx={{ maxHeight:"500px", overflowY: "auto", margin: "20px", padding: "10px"}}>
          <Grid container spacing={3}>
            {searchResults.map((place, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="shadow-0 border-4" onClick={() => handleCardClick(place)}>
                  <CardActionArea style={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={place.photo_url || 'https://via.placeholder.com/400x200?text=No+Image'}
                      alt={place.name}
                      style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {place.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {place.address}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Rating value={place.rating} readOnly precision={0.1} />
                        <Typography variant="body2" ml={1}>
                          ({place.rating}) · {place.user_ratings_total} reviews
                        </Typography>
                      </Box>
                      <Box mt={1}>
                        {place.accessibility_info?.features?.map((feature, i) => (
                          <Chip key={i} label={feature} size="small" style={{ margin: '2px' }} />
                        ))}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <DetailedLocation
          open={!!selectedLocation}
          handleClose={handleCloseDetailedView}
          location={selectedLocation}
          onContributionSubmit={handleContributionSubmit}
        />
      </div>
    </div>

  );
}

export default Search;