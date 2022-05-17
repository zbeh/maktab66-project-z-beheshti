import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import orderStyles from "./orderStyles.module.scss";
import { useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { DateObject } from "react-multi-date-picker"
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

export default function Orders() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [row, setRow] = useState([]);
  const [newRow, setNewRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState();
  const [selectedValue, setSelectedValue] = useState("b");
  const [value, setValue] = useState(new DateObject({ calendar: persian }).set("date", ));
  const data = useSelector((state) => state.orders);
  console.log(data);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    data?.map(
      (d) =>
        d.orderStatus == 2 &&
        setRow((r) => [
          ...r,
          {
            id: d.id,
            name: d.customerDetail.firstName + " " + d.customerDetail.lastName,
            purchaseTotal: d.purchaseTotal,
            orderDate: new Date(d.orderDate).toLocaleDateString("fa-IR"),
          },
        ])
    );
    data?.map(
      (d) =>
        d.orderStatus == 1 &&
        setNewRow((r) => [
          ...r,
          {
            id: d.id,
            name: d.customerDetail.firstName + " " + d.customerDetail.lastName,
            purchaseTotal: d.purchaseTotal,
            orderDate: new Date(d.orderDate).toLocaleDateString("fa-IR"),
          },
        ])
    );
  }, []);

  console.log(data);
  console.log(row);
  console.log(value.unix);
  const handleClick = (event, param) => {
    event.stopPropagation();
    const selectedItem = param.row;
    console.log(selectedItem);
    const targetItem = data.find((o) => o.id == selectedItem.id);
    setOrder(targetItem);
    if (selectedValue === "b") {
      setOpen(true);
    }
    if (selectedValue === "a") {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
 
  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:3002/orders/${order.id}`,
        { orderStatus: 1, deliveredAt: value.unix },
        { headers: { "Content-Type": "application/json", token: token } }
      )
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
  const columns = [
    { field: "name", headerName: "نام کاربر", width: 130, sortable: false },
    {
      field: "purchaseTotal",
      headerName: "مجموع مبلغ (تومان)",
      width: 130,
      sortable: false,
    },
    { field: "orderDate", headerName: "زمان ثبت سفارش", width: 130 },
    {
      field: "orderChecking",
      headerName: "",
      width: 130,
      sortable: false,
      renderCell: (cellValues) => (
        <Button
          variant="contained"
          className={orderStyles.add}
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
        >
          بررسی سفارش
        </Button>
      ),
    },
  ];
  return (
    <>
      <div
        className={`${
          (orderStyles.tcontainer, orderStyles.mt3)
        } container d-flex justify-between`}
      >
        <Typography
          variant="h6"
          component="div"
          className={`${orderStyles.fbold} container`}
        >
          {" "}
          مدیریت سفارش ها{" "}
        </Typography>
        <div className={orderStyles.radio}>
          <Radio
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
          />
          <label>سفارش های تحویل شده</label>

          <Radio
            checked={selectedValue === "b"}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            inputProps={{ "aria-label": "B" }}
          />
          <label>سفارش های در انتظار ارسال</label>
        </div>
      </div>

      <div className={`${orderStyles.tcontainer} container`}>
        {selectedValue === "b" ? (
          <>
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10]}
              rowHeight={100}
              className={orderStyles.table}
            />
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
                      <span>
                        {new Date(order.orderDate).toLocaleDateString("fa-IR")}
                      </span>
                    </div>

                    <div>
                      <span>زمان تحویل:</span>
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        value={value}
                        minDate={new DateObject({ calendar: persian })}
                        onChange={setValue}
                      />
                    </div>
                    <TableContainer
                      component={Paper}
                      sx={{ marginTop: "2rem" }}
                    >
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
                                },
                              }}
                            >
                              <TableCell
                                align="right"
                                component="th"
                                scope="row"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="right">
                                {row.quantity}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className={orderStyles.btn}>
                      <Button
                        variant="contained"
                        className={orderStyles.add}
                        type="submit"
                        onClose={handleClose}
                        onClick={handelSubmit}
                      >
                        {" "}
                        تحویل شد
                      </Button>
                    </div>
                  </DialogContent>
                </BootstrapDialog>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {selectedValue === "a" ? (
          <>
            <DataGrid
              rows={newRow}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10]}
              rowHeight={100}
              className={orderStyles.table}
            />
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
                      <span>
                        {new Date(order.orderDate).toLocaleDateString("fa-IR")}
                      </span>
                    </div>

                    <div>
                      <span>زمان تحویل:</span>
                      <sapn>
                        {new Date(order.delivery).toLocaleDateString("fa-IR")}
                      </sapn>
                    </div>
                    <TableContainer
                      component={Paper}
                      sx={{ marginTop: "2rem" }}
                    >
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
                                },
                              }}
                            >
                              <TableCell
                                align="right"
                                component="th"
                                scope="row"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="right">
                                {row.quantity}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className={orderStyles.btn}>
                      <span>زمان تحویل:</span>
                      <sapn>
                        {new Date(order.deliveredAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </sapn>
                    </div>
                  </DialogContent>
                </BootstrapDialog>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
