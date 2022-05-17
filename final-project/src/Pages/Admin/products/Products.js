import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import productsStyles from "./productsStyles.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Products() {
  const token = localStorage.getItem("token");
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
  console.log(category);
  console.log(subCategory);
  const navigate = useNavigate();
  const [row, setRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState();
  const [editors, setEditors] = useState();
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState();
  const [value, setValue] = useState();
  // const [gallery,setGallery] = useState([])
  const [thumbnail, setThumbnail] = useState([]);
  const [newThumbnail, setNewThumbnail] = useState([]);
  useEffect(() => {
    data?.map((d) =>
      setRow((r) => [
        ...r,
        {
          id: d.id,
          image: "http://localhost:3002/files/" + d.thumbnail,
          name: d.name,
          category: category.find((i) => i.id == d.category).name,
        },
      ])
    );
  }, []);
  // +" /"+(subCategory.find(item=>item.id==d.category))
  console.log(data);
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
    axios
      .patch(`http://localhost:3002/products/${editItem.id}`, value, {
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
      });
  };

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
      // } else if(e.target.name == "images" ) {
      //   const data=(e.target.files)
      //   console.log(data);
      //   const len = data.length
      //   console.log("data",data[0]);
      //   console.log("data1",data[1]);
      //   var dstring = Object.values(data).map(d=> {
      //     return(d.name);
      // }).join(',')
      //   const formData = new FormData()
      //   // for (let x = 0; x < len; x++) {
      //   //   galleryData.append("images",e.target.files[x])
      //   // }
      //   console.log(dstring);
      //   formData.append("images",JSON.stringify(dstring))
      //   const fd = formData.get('images')
      //   console.log(fd)
      //   axios.post("http://localhost:3002/upload",formData,{ headers: { "Content-Type": "multipart/form-data" }}).then(res=>{
      //       console.log(res);
      //   })

      // getAll('images')

      // const {data:{filename}}=res
      // setGallery([...gallery,filename])
    } else {
      setInfo({
        ...info,
        [e.target.name]: e.target.value,
        description: editors,
      });
    }
  };
  console.log(info);
  console.log("t", thumbnail);
  // console.log("g",gallery);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form");
    const formData = new FormData();
    Object.entries(info)?.map((item) => formData.append(item[0], item[1]));
    formData.append("thumbnail", thumbnail);
    // formData.append('images',[...gallery])
    console.log(formData);
    axios
      .post("http://localhost:3002/products", formData)
      .then((res) => console.log(res));
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
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              افزودن کالا
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleSubmit}>
                <label className={productsStyles.label}>تصویر کالا:</label>
                <input
                  type="file"
                  accept="image"
                  name="thumbnail"
                  className={productsStyles.label}
                  onChange={handleChange}
                />
                <label className={productsStyles.label}>نام کالا</label>
                <input
                  type="text"
                  name="name"
                  className={productsStyles.label}
                  onChange={handleChange}
                />
                <label className={productsStyles.label}> قیمت(تومان)</label>
                <input
                  type="text"
                  name="price"
                  className={productsStyles.label}
                  onChange={handleChange}
                />
                <label className={productsStyles.label}>تعداد کالا</label>
                <input
                  type="number"
                  name="count"
                  className={productsStyles.label}
                  onChange={handleChange}
                />
                <label className={productsStyles.label}>دسته بندی</label>
                <select
                  onChange={handleChange}
                  className={productsStyles.label}
                  name="category"
                >
                  <option defaultValue>دسته بندی</option>
                  <option value="1">لباس زنانه</option>
                  <option value="2">لباس مردانه</option>
                </select>
                <label className={productsStyles.label}>زیر دسته بندی</label>
                <select
                  onChange={handleChange}
                  className={productsStyles.label}
                  name="subCategory"
                >
                  <option defaultValue>زیر دسته بندی</option>
                  {subCategory?.map((s, i) => (
                    <option value={s.id} key={i}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {/* <label className={productsStyles.label}> تصاویر گالری</label>
                <input
                  type="file"
                  accept="image"
                  name="images"
                  multiple
                  className={productsStyles.label}
                  onChange={ handleChange }
                /> */}

                <label>توضیحات</label>

                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    setEditors(editor.getData());
                  }}
                />
                <div className={productsStyles.btn}>
                  <Button
                    variant="contained"
                    className={productsStyles.add}
                    type="submit"
                    onClose={handleClose}
                  >
                    ذخیره
                  </Button>
                </div>
              </form>
            </DialogContent>
          </BootstrapDialog>
        </div>
      ) : (
        ""
      )}

      {editModal ? (
        <div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={editModal}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              ویرایش کالا
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleEditproduct}>
                <label className={productsStyles.label}>تصویر کالا:</label>
                <input
                  type="file"
                  accept="image"
                  name="thumbnail"
                  className={productsStyles.label}
                  onChange={handleChangeedit}
                />
                <div>
                  <img
                    src={`http://localhost:3002/files/${editItem.thumbnail}`}
                    width="70px"
                    height="70px"
                  />
                </div>

                <label className={productsStyles.label}>نام کالا</label>
                <input
                  type="text"
                  name="name"
                  className={productsStyles.label}
                  onChange={handleChangeedit}
                  // value={value}
                  defaultValue={editItem.name}
                />

                <label className={productsStyles.label}> قیمت(تومان)</label>
                <input
                  type="text"
                  name="price"
                  className={productsStyles.label}
                  onChange={handleChangeedit}
                  defaultValue={editItem.price}
                />
                <label className={productsStyles.label}>تعداد کالا</label>
                <input
                  type="text"
                  name="count"
                  className={productsStyles.label}
                  onChange={handleChangeedit}
                  defaultValue={editItem.count}
                />

                <label className={productsStyles.label}>دسته بندی</label>
                <select
                  onChange={handleChangeedit}
                  className={productsStyles.label}
                  name="category"
                  defaultValue={editItem.category}
                >
                  <option defaultValue>دسته بندی</option>
                  <option value="1">لباس زنانه</option>
                  <option value="2">لباس مردانه</option>
                </select>

                <label className={productsStyles.label}>زیر دسته بندی</label>
                <select
                  onChange={handleChangeedit}
                  className={productsStyles.label}
                  name="subCategory"
                  defaultValue={editItem.subCategory}
                >
                  <option defaultValue>زیر دسته بندی</option>
                  {subCategory?.map((s, i) => (
                    <option value={s.id} key={i}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <label className={productsStyles.label}> تصاویر گالری</label>
                <input
                  type="file"
                  accept="image"
                  name="images"
                  multiple
                  className={productsStyles.label}
                  onChange={handleChangeedit}
                />

                <label>توضیحات</label>

                <CKEditor
                  editor={ClassicEditor}
                  data={editItem.description}
                  onChange={(event, editor) => {
                    setEditors(editor.getData());
                  }}
                />
                <div className={productsStyles.btn}>
                  <Button
                    variant="contained"
                    className={productsStyles.add}
                    type="submit"
                    onClose={handleClose}
                  >
                    ذخیره
                  </Button>
                </div>
              </form>
            </DialogContent>
          </BootstrapDialog>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
