import React, { useState } from 'react';
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

const accessibilityFeatures = [
  { label: 'Ramps', icon: <AccessibilityNewIcon /> },
  { label: 'Low Noise', icon: <VolumeDownIcon /> },
  { label: 'Well Lit', icon: <WbSunnyIcon /> },
  { label: 'Accessible Toilets', icon: <WcIcon /> },
];

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [accessibilityFilters, setAccessibilityFilters] = useState([]);

    const handleCardClick = (place) => {
      setSelectedLocation(place);
    };
  
    const handleCloseDetailedView = () => {
      setSelectedLocation(null);
    };
  
    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/search`, {
          params: {
            query: searchQuery,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
  
    const handleFeatureToggle = (feature) => {
      setSelectedFeatures(prev => 
        prev.includes(feature) 
          ? prev.filter(f => f !== feature) 
          : [...prev, feature]
      );
    };

  return (
    <div className="flex h-full justify-center items-center flex-col">
      <div className="flex flex-col items-center justify-center p-14 gap-y-10">
        <h1 className="text-6xl">Hi, where would you like to go?</h1>
        <h4 className="text-2xl">Tell us your preferences</h4>
      </div>

      {/* Search Bar */}
      <div className="flex border-4 w-2/3 p-3 rounded-lg">
        <div className="flex flex-row w-full">
          <input
            className="w-4/5 p-2 focus:outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a place..."
          />
          <button className="w-1/5 justify-center flex flex-row bg-blue-500 
                            hover:bg-blue-700 transition duration-300 ease-in-out
                            text-white font-bold py-2 px-4 rounded align-left"
                            onClick={handleSearch}>
            <SearchIcon />
            Search 
          </button>
        </div>
      </div>

      {/* Select Accessibility Features */}
      <div className="flex flex-col mt-10 items-center justify-center">
        <h4 className="text-xl mx-6">Select Common Accessibility Features</h4>
        <div className="flex flex-row p-8">
            <Grid container spacing={3} justifyContent="center">
            {accessibilityFeatures.map((feature) => (
                <Grid item key={feature.label}>
                <Chip
                    icon={feature.icon}
                    label={feature.label}
                    onClick={() => handleFeatureToggle(feature.label)}
                    color={selectedFeatures.includes(feature.label) ? "primary" : "default"}
                />
                </Grid>
            ))}
            </Grid>
        </div>
      </div>

      <button className="bg-white text-blue-500 border border-blue-500 font-bold py-2 px-4 rounded
                   hover:bg-blue-700 hover:text-white
                   transition duration-300 ease-in-out mb-8"
                   onClick={() => navigate('/browse')}>
        Browse our options
      </button>

      {/* Search Results */}
      <Container>
        <Grid container spacing={3}>
          {searchResults.map((place, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ height: '100%' }} onClick={() => handleCardClick(place)}>
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
      />
    </div>
  );
}

export default Search;
