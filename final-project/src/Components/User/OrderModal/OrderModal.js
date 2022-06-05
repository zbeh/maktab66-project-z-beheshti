import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import orderModalStyles from "./orderModalStyles.module.scss";
import { DateObject } from "react-multi-date-picker";
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
export default function OrderModal(props) {
  const { show, close, order, date, submit } = props;
  //   const [value, setValue] = useState(
  //     new DateObject({ calendar: persian }).set("date")
  //   );
  return (
    <div>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={close}>
          نمایش سفارش
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div>
            <span>نام مشتری:</span>
            <span>{`${order.customerDetail.firstName} ${order.customerDetail.lastName}`}</span>
          </div>

          <div>
            <span>آدرس:</span>
            <span>{order.customerDetail.billingAddress}</span>
          </div>
          <div>
            <span>تلفن:</span>
            <span>{order.customerDetail.phone}</span>
          </div>
          <div>
            <span>زمان سفارش:</span>
            <span>{new Date(order.orderDate).toLocaleDateString("fa-IR")}</span>
          </div>

          <div>
            <div>
              <span>زمان تحویل:</span>
              <span>
                {new Date(order.delivery).toLocaleDateString("fa-IR")}
              </span>
            </div>
          </div>
          <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
            <Table sx={{ width: "500px" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right"> کالا</TableCell>
                  <TableCell align="right">قیمت </TableCell>
                  <TableCell align="right">تعداد</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.orderItems.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        textAlign:"right"
                      },
                    }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">{row.price}</TableCell>
                    <TableCell align="right"component="th" scope="row">{row.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={orderModalStyles.btn}>
            {date ? (
              <>
                <Button
                  variant="contained"
                  className={orderModalStyles.add}
                  type="submit"
                  onClick={submit}
                >
                  تحویل شد
                </Button>
              </>
            ) : (
              <>
                <span>زمان تحویل:</span>
                <span>
                  {new Date(order.deliveredAt).toLocaleDateString("fa-IR")}
                </span>
              </>
            )}
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
