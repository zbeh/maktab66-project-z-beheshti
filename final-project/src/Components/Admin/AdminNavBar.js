import React from 'react'
import {Typography,Box} from "@mui/material";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import { Link} from 'react-router-dom';

export default function AdminNavBar() {

  return (
    <div className='container d-flex justify-between align-center ' style={{marginTop:"2rem"}}>
       <Typography variant="h6" component="div" >  پنل مدیریت فروشگاه</Typography>
       
          <Box sx={{ borderBottom: 1, borderColor: "divider" ,display:"flex", justifyContent:"space-between" , width:"40%"}}>
            <Link to='products'>کالاها</Link> 
            <Link to='quantity'> موجودی و قیمت ها</Link> 
            <Link to='orders'>سفارش ها</Link>
            
          </Box>
       
        <Link to='/'>بازگشت به سایت</Link>
    </div>
  )
}
