import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import payResultStyles from "./payResultStyles.module.scss";
import { clearBasket } from "../../../Redux/Reducer/BasketReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
export default function PayResult() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const orders = JSON.parse(localStorage.getItem("orders"));
  const [searchParams, setSearchParams] = useSearchParams();
  const payStaus = searchParams.get("status") === "successful";
  const dispatch = useDispatch();
  useEffect(() => {
    if (payStaus && orders) {
      axios
        .post("http://localhost:3002/orders", orders, {
          headers: { token: token },
        })
        .then((res) => {
          console.log(res);
          toast.success("سفارش شما با موفقیت ثبت شد.");
          dispatch(clearBasket(true));
          localStorage.removeItem("orders");
        })
        .catch((err) => {
          if (err.response.status == 401) {
            localStorage.removeItem("token");
            navigate("/login");
          }
          toast.error("عملیات با خطا مواجه شد.");
        });
    } 
  }, []);

  return (
    <div className={`conatiner ${payResultStyles.main}`}>
      {payStaus  ? (
        <h1 className={`${payResultStyles.success} container`}>
          پرداخت با موفقیت انجام شد. با سپاس از خرید شما
        </h1>
      ) : (
        <h1 className={`${payResultStyles.fail} container`}>
          خطا در پرداخت. سفارش شما در انتظار پرداخت است.
        </h1>
      )}
    </div>
  );
}
