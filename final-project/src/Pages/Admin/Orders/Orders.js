import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import orderStyles from "./orderStyles.module.scss";
import { useSelector } from "react-redux";
import persian from "react-date-object/calendars/persian";
import { useNavigate } from "react-router-dom";
import { DateObject } from "react-multi-date-picker";
import { OrderModal } from "../../../Components";
import toast, { Toaster } from "react-hot-toast";
export default function Orders() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [row, setRow] = useState([]);
  const [newRow, setNewRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [order, setOrder] = useState();
  const [selectedValue, setSelectedValue] = useState("b");
  const [edit, setEdit] = useState(false);
  const [newOrder, setNewOrder] = useState([]);
  const data = useSelector((state) => state.orders);
  // console.log(data);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    data &&
      data[0] &&
      data.map(
        (d) =>
          d.orderStatus == 2 &&
          setRow((r) => [
            ...r,
            {
              id: d.id,
              name:
                d.customerDetail.firstName + " " + d.customerDetail.lastName,
              purchaseTotal: d.purchaseTotal,
              orderDate: new Date(d.orderDate).toLocaleDateString("fa-IR"),
              orderStatus: d.orderStatus,
            },
          ])
      );
    data &&
      data[0] &&
      data.map(
        (d) =>
          d.orderStatus == 1 &&
          setNewRow((r) => [
            ...r,
            {
              id: d.id,
              name:
                d.customerDetail.firstName + " " + d.customerDetail.lastName,
              purchaseTotal: d.purchaseTotal,
              orderDate: new Date(d.orderDate).toLocaleDateString("fa-IR"),
              orderStatus: d.orderStatus,
            },
          ])
      );
  }, [data]);
  useEffect(() => {
    if (edit) {
      axios
        .get("http://localhost:3002/orders", { headers: { token: token } })
        .then((res) => setNewOrder(res.data));
      setRow([]);
      setNewRow([]);
    }
  }, [edit]);
  console.log(newOrder);
  useEffect(() => {
    newOrder?.map(
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
    newOrder?.map(
      (d) =>
        d.orderStatus == 1 &&
        setNewRow((r) => [
          ...r,
          {
            id: d.id,
            name: d.customerDetail.firstName + " " + d.customerDetail.lastName,
            purchaseTotal: d.purchaseTotal,
            orderDate: new Date(d.orderDate).toLocaleDateString("fa-IR"),
            orderStatus: d.orderStatus,
          },
        ])
    );
    setEdit(false);
  }, [newOrder]);
  // console.log(data);
  console.log(row);
  console.log(newRow);
  // console.log(value.unix);
  const handleClick = (event, param) => {
    event.stopPropagation();
    const selectedItem = param.row;
    console.log(selectedItem);
    if (newOrder.length > 0) {
      const findEditOrder = newOrder.find((n) => n.id == selectedItem.id);
      setOrder(findEditOrder);
    } else {
      const targetItem = data.find((o) => o.id == selectedItem.id);
      setOrder(targetItem);
    }

    if (selectedValue === "b") {
      setOpen(true);
    } else {
      setNewModal(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setNewModal(false);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:3002/orders/${order.id}`,
        { orderStatus: 1, deliveredAt: Date.now()},
        { headers: { token: token } }
      )
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        toast.error('عملیات با خطا مواجه شد.')
        console.log(err);
        console.log(token);
      });
    setEdit(true);
    setOpen(false);
    toast.success('اطلاعات با موفقیت ثبت شد.')
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
        <Toaster position="top-center" reverseOrder={false} />
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
              <>
                <OrderModal
                  show={open}
                  close={handleClose}
                  date={true}
                  order={order}
                  submit={handelSubmit}
                />
                
              </>
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
            {newModal ? (
              <OrderModal
                show={newModal}
                close={handleClose}
                date={false}
                order={order}
              />
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
