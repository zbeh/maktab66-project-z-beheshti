import React from "react";
import cardStyles from "./cardStyles.module.scss";
import { Link } from "react-router-dom";
export default function Card(props) {
  const { item } = props;
  return (
    <div className={cardStyles.card}>
      <Link to={`/product-details/${item.id}`}>
        <div className={cardStyles.imgContainer}>
          <img src={`http://localhost:3002/files/${item.images[0]}`} alt="مشکل در نمایش تصویر"/>
        </div>
        <div className={cardStyles.contentContainer}>
          <p>{item.name}</p>
        </div>
        <div className={cardStyles.contentContainer}>
          <p>{item.price} تومان</p>
        </div>
      </Link>
    </div>
  );
}
