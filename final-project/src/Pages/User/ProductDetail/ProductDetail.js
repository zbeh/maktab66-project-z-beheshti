import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../Helper/USeFetch";
import productDetailStyles from "./productDetailStyles.module.scss";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { Button, Typography, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper";
import { useDispatch } from "react-redux";
import { AddToBasket } from "../../../Redux/Reducer/BasketReducer";
export default function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState();
  const { data, loading, error } = useFetch(
    `http://localhost:3002/products?id=${id}`
  );
  console.log(data);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  console.log(quantity);
  console.log(data?.data[0].count);
  // let total = data?.data[0].count
  const handleClick = () => {
    let total = data.data[0].count
    console.log(total);
    
   if(Number(quantity) > Number(total)){
      toast.error("تعداد وارد شده بیشتر از موجودی محصول می باشد.");
   }
    else if (!quantity) {
      toast.error("تعداد وارد شده صحیح نمی باشد.");
    } 
    else {
      let newItem = {
        id: data.data[0].id,
        name: data.data[0].name,
        price: data.data[0].price,
        quantity: quantity,
        thumbnail: data.data[0].thumbnail,
      };
      dispatch(AddToBasket(newItem));
    }
  };
  console.log(item);
  if (error) {
    return (
      <>
        <Typography variant="body1">خطایی پیش آمده</Typography>
      </>
    );
  }
  return (
    <>
      <div className={productDetailStyles.proContainer}>
        {loading ? (
          <div
            className={`${productDetailStyles.center} d-flex justify-center`}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="container">
              <div className={`${productDetailStyles.container} d-flex`}>
                <Swiper
                  effect={"flip"}
                  grabCursor={true}
                  pagination={true}
                  navigation={true}
                  modules={[EffectFlip, Pagination, Navigation]}
                  className={productDetailStyles.swiper}
                >
                  {data.data[0] &&
                    data.data[0].images[0] &&
                    data?.data[0].images.map((i) => (
                      <SwiperSlide className={productDetailStyles.SwiperSlide}>
                        <img
                          src={`http://localhost:3002/files/${i}`}
                          alt="مشکل در نمایش تصویر"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>

                <div className={productDetailStyles.info}>
                  <p>{data.data[0].name}</p>
                  <p>
                    {data.data[0].price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    تومان
                  </p>
                  {data.data[0].count > 0 ? (
                    <div className="d-flex">
                      <input
                        type="number"
                        name="count"
                        min="1"
                        // max={`${data.data[0].count}`}
                        placeholder="0"
                        onChange={handleChange}
                      />
                      <Button
                        className={productDetailStyles.btn}
                        onClick={handleClick}
                      >
                        افزودن به سبد خرید
                      </Button>
                    </div>
                  ) : (
                    <p>متاسفانه محصول موجود نمی باشد.</p>
                  )}

                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.data[0].description,
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
