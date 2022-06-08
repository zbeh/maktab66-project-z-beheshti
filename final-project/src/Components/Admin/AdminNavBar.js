import React from 'react'
import {Typography,Box} from "@mui/material";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import { Link} from 'react-router-dom';
import adminNavbarStyles from '../Admin/adminNavbarStyles.module.scss'
export default function AdminNavBar() {

  return (
    <div className={`${adminNavbarStyles.holder} `}>
      <div className='d-flex justify-between align-center container'>
        <Typography variant="h6" component="div" >  پنل مدیریت فروشگاه</Typography>
       
        <Link className={adminNavbarStyles.link} to='/'>بازگشت به سایت</Link>
      </div>
       
    </div>
  )
}
