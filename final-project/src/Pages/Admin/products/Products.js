import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState ,useEffect} from 'react';
import { Typography,Button } from '@mui/material';
import { useSelector } from 'react-redux';
import productsStyles from './productsStyles.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Products() {

  const columns = [
    { field: 'image', headerName: 'تصویر کالا', width: 130,height:550 ,sortable: false, renderCell:(param)=><img src={param.value} width="100px" height="100px" style={{objctFit:"cover"}}/>},
    { field: 'name', headerName: 'نام کالا', width: 130 ,  sortable: false, },
    { field: 'category', headerName: 'دسته بندی', width: 200 ,},
    // { field: 'edit', headerName: '', width: 130 ,  sortable: false,},
    {field: "edit" , headerName:"", renderCell: (cellValues) => (<><EditIcon onClick={handleEdit} style={{padding:"0 1rem"}}/> <DeleteIcon onClick={handleDelete} style={{padding:"0 1rem"}}/></>)}
  
  ];
  // (<Button variant="contained" color="primary" onClick={(event) => {handleClick(event, cellValues);}}>P</Button>

    const data = useSelector(state=>state.data)
    const category = useSelector(state=>state.category)
    const subCategory = useSelector(state=>state.subCategory)
    console.log(category);
    console.log(subCategory);
    const [row,setRow]=useState([])
    useEffect(()=>{
      data?.map(d=>setRow(r=>[...r,{id:d.id,image:"http://localhost:3002/files/"+d.thumbnail,name:d.name,category:(category.find(i=>i.id==d.category)).name}]))
    },[])
    // +" /"+(subCategory.find(item=>item.id==d.category))
    console.log(data);
     const handleEdit = ()=>{
       alert('edit')
     }
     const handleDelete = ()=>{
       alert ('del')
     }

  return (
    <>
    <div className={`${productsStyles.tcontainer,productsStyles.mt3} container d-flex justify-between`}>
    <Typography variant="h6" component="div" className={`${productsStyles.fbold} container`}> مدیریت کالاها </Typography>
      <Button variant="contained" className={productsStyles.add}>افزودن کالا</Button>

    </div>
    
    <div className={`${productsStyles.tcontainer} container`} >
      <DataGrid
        rows ={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        rowHeight={100}
        className={productsStyles.table}
      />
    </div>
    </>
  );
}

