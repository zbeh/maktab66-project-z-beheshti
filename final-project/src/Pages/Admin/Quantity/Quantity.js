import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import quantityStyles from "./quantityStyles.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Quantity() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  const [change, setChange] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newList, setNewList] = useState([]);
  const columns = [
    // { field: "_id", hide: true },
    { field: "name", headerName: "نام کالا", width: 130, sortable: false },
    { field: "price", headerName: "قیمت (تومان)", width: 130, editable: true },
    {
      field: "count",
      headerName: "موجودی",
      width: 130,
      sortable: false,
      editable: true,
    },
  ];
  const data = useSelector((state) => state.data);
  const [row, setRow] = useState([]);
  useEffect(() => {
    data &&
      data.length > 0 &&
      data.map((d) =>
        setRow((row) => [
          ...row,
          { id: d.id, name: d.name, price: d.price, count: d.count },
        ])
      );
  }, [data]);
  console.log(row);
  useEffect(() => {
    if (edit) {
      axios
        .get("http://localhost:3002/products")
        .then((res) => setNewList(res.data));
      setRow([]);
    }
  }, [edit]);
  console.log(newList);
  useEffect(() => {
    newList?.map((d) =>
      setRow((ro) => [
        ...ro,
        { id: d.id, name: d.name, price: d.price, count: d.count },
      ])
    );
    setEdit(false);
  }, [newList]);
  const handleEditquantity = (params, event) => {
    event.stopPropagation();
    console.log(params.value);
    console.log(params.row);
    setChange([...change, params.row]);
  };
  console.log(change);
  const handleClick = () => {
    change.map(
      (item) => (
        console.log(item),
        axios
          .patch(`http://localhost:3002/products/${item.id}`, item, {
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
      )
    );
    setEdit(true);
  };

  return (
    <>
      <div
        className={`${quantityStyles.container} container d-flex justify-between`}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {" "}
          مدیریت موجودی و قیمت ها{" "}
        </Typography>
        <Button
          variant="contained"
          className={quantityStyles.btn}
          onClick={handleClick}
        >
          ذخیره
        </Button>
      </div>
      <div className={`${quantityStyles.tcontainer} container`}>
        <DataGrid
          rows={row}
          columns={columns}
          // getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[10]}
          sx={{ fontSize: "medium", fontWeight: "bold", textAlign: "center" }}
          onCellFocusOut={handleEditquantity}
        />
      </div>
    </>
  );
}
