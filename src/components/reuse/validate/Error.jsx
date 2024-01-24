import { Typography } from '@material-tailwind/react'
import React from 'react'

export const Error = ({error}) => {
  return (
    <Typography 
        color='red'
        variant='small'
    >
        {error}
    </Typography>
  )
}
