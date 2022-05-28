import React from 'react'
import {Typography} from "@mui/material";
export default function PageNotFound() {
  return (
    <div className='container d-flex justify-center'>
        <Typography variant="body1"  sx={{marginTop:'5rem' , fontSize:"larger", fontWeight:"bolder"} }> متاسفانه صفحه مورد نظر یافت نشد.</Typography>
    </div>
  )
}
