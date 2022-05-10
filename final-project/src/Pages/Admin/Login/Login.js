import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate,useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { login} from '../../../Redux/Reducer/Reducer'
import { Link } from 'react-router-dom';
export default function Login() {
  const [admin,setAdmin]=useState()
  const [token,setToken] = useState()
  const state = useSelector((state) => state.admin.isLogin)
  console.log(state);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.state);
  const redirectPath = location.state?.from.pathname || '/admin-panel'
  useEffect(()=>{
    axios.get('http://localhost:3002/whoami').then(res=>setAdmin(res.data))
    .catch(error=>console.log(error))
  },[])
  console.log(admin);
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('پر کردن این فیلد اجباری است'),
      password: Yup.string()
        .required('پر کردن این فیلد اجباری است'),
    }),
    onSubmit: values => {
     
      if(values.userName===admin.username && values.password===admin.password){
        axios.post('http://localhost:3002/auth/login',admin).then(res=>localStorage.setItem("token",res.data.token))
        dispatch(login(true))
        navigate(redirectPath , {replace:true})
      }
      
    }
   
  });
  return (
  
    <Box className='container'
      sx={{
        marginTop:"5rem",
        textAlign:"center",
        padding:"3rem 1rem",
        boxShadow:"1px 1px 5px 0px #d3d1d1",

      }}
    > 
      <Typography variant="h4" component="div" sx={{ mb:"1rem"}}>ورود به پنل مدیریت</Typography>
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="userName">نام کاربری</label>
      <TextField id="userName"  variant="filled" name='userName' type="text"  onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        sx={{width:"100%",display:"block", mb:"1rem"}}
        value={formik.values.userName}/>
        {formik.touched.userName && formik.errors.userName ? (
        <div className='error'>{formik.errors.userName}</div>
      ) : null}
      <label htmlFor="password">رمز عبور</label>
      <TextField id="password" variant="filled" name='password' type="password"  onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        sx={{width:"100%",display:"block",  mb:"1rem"}}
        value={formik.values.password}/>
        {formik.touched.password && formik.errors.password ? (
        <div className='error'>{formik.errors.password}</div>
      ) : null}

      <Button  sx={{my:"1rem"}}variant="contained" type="submit">ورود</Button>
    </form>
    <Link to="/">بازگشت به سایت</Link>
    </Box>
  );
}



