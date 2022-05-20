import React from "react";
import cardStyles from './cardStyles.module.scss'
export default function Card(props) {
  const {item} = props
  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.imgContainer}>
        <img src={`http://localhost:3002/files/${item.images[0]}`} />
      </div>
      <div className={cardStyles.contentContainer}>
        <p>{item.name}</p>
      </div>
      <div className={cardStyles.contentContainer}>
        <p>{item.price} تومان</p>
      </div>
    </div>
  );
}
