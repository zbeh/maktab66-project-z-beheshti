import React from "react";
import { useLocation } from "react-router-dom";
import payResultStyles from './payResultStyles.module.scss'
export default function PayResult() {
  const location = useLocation();
  const { from } = location.state;
  if (from === "successful") {
    localStorage.removeItem("items");
  }

  return (
    <div className={`conatiner ${payResultStyles.main}`}>
      {from === "successful" ? (
        <h1 className={payResultStyles.success}>پرداخت با موفقیت انجام شد. با سپاس از خرید شما</h1>
      ) : (
        <h1 className={payResultStyles.fail}>خطا در پرداخت.سفارش شما در انتظار پرداخت است</h1>
      )}
    </div>
  );
}
