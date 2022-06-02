import React from "react";
import bankPort from "../../../Assets/Images/pay.png";
import shaparakStyles from "./shaparakStyles.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
export default function Shaparak() {
  // window.location.replace("https://www.shaparak.com")
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate('/pay-result')
    navigate({
      pathname: "/pay-result",
      search: createSearchParams({
        status: "successful",
      }).toString(),
    });
  };
  const handleNavigate = () => {
    navigate({
      pathname: "/pay-result",
      search: createSearchParams({
        status: "fail",
      }).toString(),
    });
  };
  return (
    <div className={`container ${shaparakStyles.imgContainer}`}>
      <img src={bankPort} alt={"no image"} />
      <div className={`${shaparakStyles.btnContainer}`}>
        <Button className={shaparakStyles.btn} onClick={handleClick}>
          {" "}
          پرداخت{" "}
        </Button>
        <Button className={shaparakStyles.bttn} onClick={handleNavigate}>
          انصراف
        </Button>
      </div>
    </div>
  );
}
