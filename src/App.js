import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { Box } from '@mui/material'

import { ChannelDetail, Feed, Navbar, SearchFeed, VideoDetail } from './components'
import { useSelector } from 'react-redux'


const App = () => {

  const theme = useSelector(state => state.theme)

  return (
    <BrowserRouter>
        <Box sx={{ backgroundColor:'#1c2520'}} style={theme}>
            <Navbar />
            <Routes >
                {/* for different routes path */}
                <Route path="/" exact element={<Feed />} />
                {/* making the 'id' part of path so that we can extract it from the path using useParams() when needed */}
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path='/channel/:id' element={<ChannelDetail />} />
                {/* same as above for searchTerm */}
                <Route path='search/:searchTerm' element={<SearchFeed />} />
            </Routes>
        </Box>
    </BrowserRouter>
  )
}

export default App