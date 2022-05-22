import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from '@mui/material/DialogActions';
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
import { Typography, Button } from "@mui/material";
import modalStyles from './modalStyles.module.scss'
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
export default function Modal(props) {
 const  {show,change,close,submit,title,editor,data,submitForm} = props
 const subCategory = useSelector((state) => state.subCategory);
  return (
    <div>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={close}
        >
         {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={data ?submitForm :submit}>
            <label className={modalStyles.label}>تصویر کالا:</label>
            <input
              type="file"
              accept="image"
              name="thumbnail"
              className={modalStyles.label}
              onChange={change}
            />
            {data?
            <div>
                  <img
                    src={`http://localhost:3002/files/${data.thumbnail}`}
                    width="70px"
                    height="70px"
                  />
            </div>:""}
            <label className={modalStyles.label}>نام کالا</label>
            <input
              type="text"
              name="name"
              className={modalStyles.label}
              onChange={change}
              defaultValue={data ?data.name :""}
            />
            <label className={modalStyles.label}> قیمت(تومان)</label>
            <input
              type="text"
              name="price"
              className={modalStyles.label}
              onChange={change}
              defaultValue={data ?data.price :""}
            />
            <label className={modalStyles.label}>تعداد کالا</label>
            <input
              type="number"
              name="count"
              className={modalStyles.label}
              onChange={change}
              defaultValue={data ?data.count :""}
            />
            <label className={modalStyles.label}>دسته بندی</label>
            <select
              onChange={change}
              className={modalStyles.label}
              name="category"
              defaultValue={data ?data.category :""}
            >
              <option defaultValue>دسته بندی</option>
              <option value="1">لباس زنانه</option>
              <option value="2">لباس مردانه</option>
            </select>
            <label className={modalStyles.label}>زیر دسته بندی</label>
            <select
              onChange={change}
              className={modalStyles.label}
              name="subCategory"
              defaultValue={data ?data.subCategory :""}
            >
              <option defaultValue>زیر دسته بندی</option>
              {subCategory?.map((s, i) => (
                <option value={s.id} key={i}>
                  {s.name}
                </option>
              ))}
            </select>
            {/* <label className={modalStyles.label}> تصاویر گالری</label>
                <input
                  type="file"
                  accept="image"
                  name="images"
                  multiple
                  className={modalStyles.label}
                  onChange={ handleChange }
                /> */}

            <label>توضیحات</label>

            <CKEditor
              editor={ClassicEditor}
              onChange={editor}
              data={data ?data.description :""}
            />
            <div className={modalStyles.btn}>
              <Button
                variant="contained"
                className={modalStyles.add}
                type="submit"
                // onClick={close}
              >
                ذخیره
              </Button>
            </div>
          </form>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close}>
            بستن
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
