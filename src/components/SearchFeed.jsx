import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Videos } from './'
import { fetchData } from '../utils/fetchData'; 

const SearchFeed = () => {

  const nonThemeColor = useSelector(state => state.nonThemeColor);

  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchData(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
      .catch((error) => console.log(error));
  }, [searchTerm])

  return (
    <Box p={2} sx={{ overflowY: 'auto', height:'90vh', flex: 2}}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color:nonThemeColor}}>
        Search Results for: <span style={{ color: '#ff4040'}}>
          {searchTerm}
        </span> videos
      </Typography>
      <Videos videos={videos} />
    </Box>
  )
}

export default SearchFeed;