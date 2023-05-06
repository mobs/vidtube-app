import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './'
import { fetchData } from '../utils/fetchData'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [ videos, setVideos ] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))

      fetchData(`search?channelId=${id}&part=snippet%2Cid&order=date`)
      .then((videosData) => setVideos(videosData?.items))
  },[id])

  return (
      <Box minHeight="95vh">
        <Box>
          <div style={{
            background:'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%',
            zIndex: 10,
            height:'300px'
          }} />
          {/* if we are a component twice and we want to change some part we can pass that as a prop & use it */}
          <ChannelCard channelDetail={channelDetail} marginTop='-110px'/>
        </Box>
        <Box display="flex" p="2">
          <Box sx={{ mr: { sm:'100px'}}} />
            <Videos videos={videos} />
        </Box>
      </Box>
    )
}

export default ChannelDetail