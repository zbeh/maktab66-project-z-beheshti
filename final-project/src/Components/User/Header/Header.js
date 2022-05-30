import React from "react";
import { Link } from "react-router-dom";
import headerStyles from "./headerStyles.module.scss";
import logo from "../../../Assets/Images/3f1a34dc4b430a8d6dd2545659cb722d-removebg-preview.png";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Badge from "@mui/material/Badge";
export default function Header() {
  const orders = JSON.parse(localStorage.getItem('items')).length
  console.log(orders);
  return (
    <header
      className={`${headerStyles.containerFluid} d-flex justify-between align-center`}
    >
      <div
        className={`${headerStyles.logoContainer} d-flex justify-between align-center`}
      >
        <Link to="/" className={`${headerStyles.logo} d-flex`}>
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
        <Link to="/admin-panel">
          <h3 style={{ color: "white" }}>مدیریت </h3>
        </Link>
        <div className="d-flex align-center">
          <Link to="/checkout">
            <Badge badgeContent={orders} color="primary">
              <LocalGroceryStoreIcon className={headerStyles.icon} />
            </Badge>
          </Link>
          <h3 style={{ color: "white" }}>سبد خرید </h3>
        </div>
      </nav>
    </header>
  );
}
