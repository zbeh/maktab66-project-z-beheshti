import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import productsStyles from "./productsStyles.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../Components";

export default function Products() {
  const token = localStorage.getItem("token");
  let newData =[]
  const columns = [
    { field: "id", hide: true },
    {
      field: "image",
      headerName: "تصویر کالا",
      width: 130,
      height: 550,
      sortable: false,
      renderCell: (param) => (
        <img
          src={param.value}
          width="100px"
          height="100px"
          style={{ objctFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "نام کالا", width: 130, sortable: false },
    { field: "category", headerName: "دسته بندی", width: 200 },
    // { field: 'edit', headerName: '', width: 130 ,  sortable: false,},
    {
      field: "edit",
      headerName: "",
      renderCell: (cellValues) => (
        <>
          <EditIcon
            onClick={(event) => {
              handleEdit(event, cellValues);
            }}
            style={{ padding: "0 1rem" }}
          />{" "}
          <DeleteIcon
            onClick={(event) => {
              handleDelete(event, cellValues);
            }}
            style={{ padding: "0 1rem" }}
          />
        </>
      ),
    },
  ];
  // (<Button variant="contained" color="primary" onClick={(event) => {handleClick(event, cellValues);}}>P</Button>

  const data = useSelector((state) => state.data);
  const category = useSelector((state) => state.category);
  const subCategory = useSelector((state) => state.subCategory);
  // console.log(category);
  // console.log(subCategory);
  // console.log(data);
  const navigate = useNavigate();
  const [row, setRow] = useState([]);
  const [cat,setCat]=useState([])
  const [product,setProduct] = useState([])
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState();
  const [editors, setEditors] = useState();
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState();
  const [value, setValue] = useState();
  const [newList,setNewList]= useState([])
  const [edit,setEdit] =useState(false)
  const [add,setAdd] = useState(false)
  let products =[]
  // let cats = []
  const [gallery,setGallery] = useState([])
  const [thumbnail, setThumbnail] = useState([]);
  const [newThumbnail, setNewThumbnail] = useState([]); 
  useEffect(()=>{
    category && category[0] && category.map(c=>setCat(cat=>[...cat,c]))
    console.log("product",product);
  },[category])
  console.log(cat);
  useEffect(() => {
    
    data && data[0] && cat && cat[0] &&
    data.map(d=>(
      setRow(row=>[
        ...row,
        
          {
          id: d.id,
          image: "http://localhost:3002/files/" + d.thumbnail,
          name: d.name,
          category:cat?.find(obj=>(obj.id==d.category)).name,
          
        }
       
        
      ])
    ))
      
    
  }, [data,cat]);

  // useEffect(()=>{
  //   axios.get('http://localhost:3002/products').then((res)=>{
  //     let newProduct = []
  //     for (let i=0 ; i<res.data.length ; i++){
  //       let productObject ={}
  //       axios.get(`http://localhost:3002/category/${res.data[i].category}`).then((res)=>{
  //         productObject.category = res.data.name
  //       })
  //       productObject.id = res.data[i].id
  //       productObject.name = res.data[i].name
  //       productObject.image= "http://localhost:3002/files/" + res.data[i].thumbnail
  //       newProduct.push(productObject)
  //     }
  //     setRow(newProduct)
  //   })
    
  // },[])
  
 
  useEffect(()=>{
    if(edit || add){
      axios.get("http://localhost:3002/products").then(res=>setNewList(res.data))
      setRow([])
    }
    
  },[edit,add])
  useEffect(()=>{
    console.log(cat);
      newList?.map((d) =>(
      setRow((ro)=>[
        ...ro,
        {
          id: d.id,
          image: "http://localhost:3002/files/" + d.thumbnail,
          name: d.name,
          category: cat.find((i) => i.id == d.category).name,
        },
      ])
    ));
    setEdit(false)
    setAdd(false)
  },[newList])
  
  const handleEdit = (event, param) => {
    event.stopPropagation();
    const selectedItem = param.row;
    const targetItem = data.find((item) => item.id == selectedItem.id);
    setEditItem(targetItem);
    setEditModal(true);
  };
  const handleChangeedit = (e) => {
    if (e.target.name == "thumbnail") {
      console.log(e.target.files);
      const fd = new FormData();
      fd.append("image", e.target.files[0]);
      axios.post("http://localhost:3002/upload", fd).then((res) => {
        console.log(res);
        const {
          data: { filename },
        } = res;
        setNewThumbnail(filename);
      });
    } else {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
        description: editors,
      });
    }
  };
  console.log(value);
  const handleEditproduct = (e) => {
    e.preventDefault();
    console.log("form");
    const formData = new FormData();
    Object.entries(value)?.map((item) => formData.append(item[0], item[1]));
    formData.append("thumbnail", thumbnail);
    console.log(formData);
    axios.patch(`http://localhost:3002/products/${editItem.id}`, value, {
        headers: { "Content-Type": "application/json", token: token },
      })
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        console.log(err);
        console.log(token);
      })
      
      setEdit(true)
    
  };
  console.log(newList);
  console.log(editItem);
  const handleDelete = (event, param) => {
    event.stopPropagation();
    const targetItem = param.row;
    axios
      .delete(`http://localhost:3002/products/${targetItem.id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
      setRow(row.filter(r=>r.id!==targetItem.id))
  };
  
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditModal(false);
  };

  console.log(editors);

  const handleChange = (e) => {
    console.log("change");
    if (e.target.name == "thumbnail") {
      console.log(e.target.files);
      const imgData = new FormData();
      imgData.append("image", e.target.files[0]);
      axios.post("http://localhost:3002/upload", imgData).then((res) => {
        console.log(res);
        const {
          data: { filename },
        } = res;
        setThumbnail(filename);
      });
    } else if(e.target.name == "images"){
       const files = Array.from(e.target.files)
       let tempArray =[]
       files.map((item)=>{
         const fd = new FormData()
         fd.append("image", item)
          axios.post("http://localhost:3002/upload",fd).then((res)=>{
            console.log(res)
            const {data:{filename}}=res
            setGallery(gallery=>[...gallery,filename])
          })
       })
    }
    else {
      setInfo({
        ...info,
        [e.target.name]: e.target.value,
        description: editors,
      });
    }
  };
  console.log(info);
  console.log("t", thumbnail);
  console.log("g",gallery);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form");
    const formData = new FormData();
    Object.entries(info)?.map((item) => formData.append(item[0], item[1]));
    formData.append("thumbnail", thumbnail);
    formData.append('images',[...gallery])
    console.log(formData);
    axios
      .post("http://localhost:3002/products", formData)
      .then((res) => console.log(res));
      setAdd(true)
  };
  // const handleEditproduct = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   Object.entries(info).map((item) => formData.append(item[0], item[1]));
  //   console.log(formData.get("name"));
  //   axios
  //     .put(`http://localhost:3002/products/${editItem.id}`, Object.fromEntries(formData) )
  //     .then((res) => console.log(res));
  // };
  // const handleGallery = (e)=>{
  //   setGallery( [...gallery,e.target.files] )
  // }
  // const handleThumbnail =(e)=>{
  //   console.log(e.target.files);
  //   setThumbnail([...thumbnail,e.target.files])
  // }
  //  console.log(gallery);
  //  console.log(thumbnail);
  const handleEditor = (event, editor) => {
    setEditors(editor.getData());
  };
  return (
    <>
      <div
        className={`${
          (productsStyles.tcontainer, productsStyles.mt3)
        } container d-flex justify-between`}
      >
        <Typography
          variant="h6"
          component="div"
          className={`${productsStyles.fbold} container`}
        >
          {" "}
          مدیریت کالاها{" "}
        </Typography>
        <Button
          variant="contained"
          className={productsStyles.add}
          onClick={handleClick}
        >
          افزودن کالا
        </Button>
      </div>

      <div className={`${productsStyles.tcontainer} container`}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          rowHeight={100}
          className={productsStyles.table}
        />
      </div>
      {open ? (
        <div>
          <Modal
            title="افزودن کالا"
            change={handleChange}
            show={open}
            close={handleClose}
            submit={handleSubmit}
            submitForm={null}
            editor={handleEditor}
            data={null}
          />
        </div>
      ) : (
        ""
      )}

      {editModal ? (
        <div>
          <Modal
            title="ویرایش کالا"
            change={handleChangeedit}
            show={editModal}
            close={handleClose}
            submitForm={handleEditproduct}
            editor={handleEditor}
            data={editItem}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
