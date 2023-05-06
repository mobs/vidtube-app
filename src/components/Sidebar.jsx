import React from 'react'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { categories } from '../utils/constants'
import { themeActions } from '../store/theme'

const Sidebar = ( {selectedCat, setSelectedCat, props} ) => {
    // console.log(selectedCat);
    const nonThemeColor = useSelector(state => state.nonThemeColor);

  return (
    <Stack
        direction='row'
        sx={{
            overflow: 'auto',
            height:{ sx:'auto', md:'95%'},
            flexDirection: { md:'column'},
        }}
    >
        {categories.map((cat) => (
            <button className='category-btn'
                onClick={() => setSelectedCat(cat.name)}
                style={{
                    background: cat.name === selectedCat && '#ff4040',
                    color: nonThemeColor
                }}
                key={cat.name}
            >
                <span style={{ color: cat.name === selectedCat ? nonThemeColor : '#ff4040', margin:'15px'}}> {cat.icon} </span>
                <span style={{ opacity: cat.name === selectedCat ? '1' : '0.8'}}> {cat.name} </span>
            </button>
        ))}
    </Stack>
  )
}

export default Sidebar