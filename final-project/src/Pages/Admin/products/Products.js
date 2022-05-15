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
          <DeleteIcon onClick={handleDelete} style={{ padding: "0 1rem" }} />
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
  const [row, setRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState();
  const [editors, setEditors] = useState();
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState();
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
    setEditItem(selectedItem);
    setEditModal(true);
    // const filteredItems=data.filter(item=>item.id!==id)
    // const selectedItem = data.find(item=>item.id===id)
    // console.log(selectedItem);
  };
  console.log(editItem);
  const handleDelete = () => {
    axios.delete(`http://localhost:3002/products/${editItem.id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditModal(false);
  };

  console.log(editors);
  console.log(info);

  const handleChange = (e) => {
    if (e.target.name !== "thumbnail") {
      setInfo({
        ...info,
        [e.target.name]: e.target.value,
        description: editors,
      });
    } else {
      setInfo({ ...info, [e.target.name]: e.target.files[0] });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form");
    const formData = new FormData();
    Object.entries(info)?.map((item) => formData.append(item[0], item[1]));
    console.log(formData);
    axios
      .post("http://localhost:3002/products", formData)
      .then((res) => console.log(res));
  };
  const handleEditproduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(info).map((item) => formData.append(item[0], item[1]));
    console.log(formData.get("name"));
    axios
      .put(`http://localhost:3002/products/${editItem.id}`, Object.fromEntries(formData) )
      .then((res) => console.log(res));
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
                  onChange={handleChange}
                />
                <label className={productsStyles.label}>نام کالا</label>
                <input
                  type="text"
                  name="name"
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
    </>
  );
}
