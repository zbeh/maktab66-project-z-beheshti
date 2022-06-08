import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import headerStyles from "./headerStyles.module.scss";
import logo from "../../../Assets/Images/3f1a34dc4b430a8d6dd2545659cb722d-removebg-preview.png";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Badge from "@mui/material/Badge";
export default function Header() {
  const info = useSelector((state) => state.basket.orderItems);
  // console.log(info);

  let orders = info ? info.length : 0;
  const location = window.location;
  let show;
  console.log(location.href);
  if (location.href === "http://localhost:3000/pay-result?status=successful") {
    show = true;
  }

  return (
    <header
      className={`${headerStyles.containerFluid} d-flex justify-between align-center`}
    >
      <div
        className={`${headerStyles.logoContainer} d-flex justify-between align-center`}
      >
        <Link to="/" className={`${headerStyles.logo} d-flex align-center`}>
          <img src={logo} className={headerStyles.image} />
          <h1 style={{ color: "white" }}>مای استایل </h1>
        </Link>
        <a href="/" className={headerStyles.home}>
          صفحه اصلی
        </a>
      </div>
      <nav
        className={`${headerStyles.navContainer} d-flex justify-between align-center`}
      >
        <Link to="/login">
          <h3 >مدیریت </h3>
        </Link>
        {show ? (
          <></>
        ) : (
          <div className="d-flex align-center">
            <Link to="/checkout" className="d-flex align-center">
              <Badge badgeContent={orders} color="primary">
                <LocalGroceryStoreIcon className={headerStyles.icon} />
              </Badge>
              <h3 >سبد خرید </h3>
            </Link>
            
          </div>
        )}
      </nav>
    </header>
  );
}
