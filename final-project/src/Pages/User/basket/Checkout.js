import React, { useEffect, useState } from "react";
import checkoutStyles from "./checkoutStyles.module.scss";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { RemoveFromBasket ,AddTotal } from "../../../Redux/Reducer/BasketReducer";
export default function Checkout() {
  const [item, setItem] = useState([]);
   const dispatch = useDispatch()
  let products;

  console.log(products);
  const info =  useSelector((state) => state.basket.orderItems)

  let sum = 0;
  const handleDelete = (i) => {
    console.log(i);
    dispatch(RemoveFromBasket(i))
    // setItem(JSON.parse(localStorage.getItem('items')));
  };
  //  console.log(sum);
  return (
    <div className={`container ${checkoutStyles.main}`}>
      <h1>سبد خرید</h1>
      {/* {(JSON.parse(localStorage.getItem('items')) && JSON.parse(localStorage.getItem('items')).length>0)?  */}
      { info && info.length>0 ?
       (
        <>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "2rem", width: "60%" }}
          >
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ paddingLeft: "5rem" }}>
                    تصویر کالا
                  </TableCell>
                  <TableCell align="right">کالا</TableCell>
                  <TableCell align="right">قیمت </TableCell>
                  <TableCell align="right">تعداد</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {info?.map((i, index) => (
                  <>
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      
                      <TableCell align="right" component="th" scope="row">
                       <img src={`http://localhost:3002/files/${i.thumbnail}`} />
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {i.name}
                      </TableCell>
                      <TableCell align="right">
                        {i.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </TableCell>
                      <TableCell align="right">{i.quantity}</TableCell>
                      <TableCell align="right">
                        <DeleteIcon onClick={() => handleDelete(i)} />
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/product-details/${i.id}`}>
                          <EditIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={`d-flex ${checkoutStyles.priceContainer} `}>
            {info.map((i) => {
              sum += i.price * i.quantity;
              dispatch(AddTotal(sum))
            })}
            <h2 className={checkoutStyles.total}>
              جمع کل : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </h2>
            <Link to={`/Purchase`}>
              <Button className={checkoutStyles.btn}>
                نهایی کردن سبد خرید
              </Button>
            </Link>
          </div>
        </>
      ):<h1 className={checkoutStyles.warning}>سبد خرید خالی است.</h1>}
    </div>
  );
}
