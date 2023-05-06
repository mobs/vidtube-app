import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Sidebar, Videos } from './'
import { fetchData } from '../utils/fetchData'; 
import { useSelector } from 'react-redux';

const Feed = () => {

  const nonThemeColor = useSelector(state => state.nonThemeColor);

  const [selectedCat, setSelectedCat] = useState('New');
  const [videos, setVideos] = useState([]);

  // it is a lifecycle hook that is called as soon as the component loads
  // it is used coz we have to fetch data as soon as feed component loads to display the data
  // it also require a dependency array
  // we pass the selectedCat in dependency array which means it is going to change whenever we change the selectedCat
  useEffect(() => {
    fetchData(`search?part=snippet&q=${'INDIA'}q=${selectedCat}`)
      .then((data) => setVideos(data.items))
      .catch((error) => console.log(error));
  }, [selectedCat])

  return (
    <Stack sx={{ flexDirection: {sx:"column", md:"row"}}}>
      <Box sx={{ height: { sx: 'auto', md:'92vh'}, borderRight: '1px solid #3d3d3d', px: {sx: 0, md: 2}}}>
        <Sidebar selectedCat={selectedCat} setSelectedCat={setSelectedCat} />

        <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color:nonThemeColor}}>
          Coded by Mobashir Alam @ 2023
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height:'90vh', flex: 2}}>
        <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: nonThemeColor}}>
          {selectedCat} <span style={{ color: '#ff4040'}}>
            videos
          </span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default Feed