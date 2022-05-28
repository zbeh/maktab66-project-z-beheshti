import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../Helper/USeFetch";
import productDetailStyles from "./productDetailStyles.module.scss";
import {
  Button,
  Typography,
  CircularProgress,
  ListItemSecondaryAction,
} from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper";

export default function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState();
  const { data, loading, error } = useFetch(
    `http://localhost:3002/products?id=${id}`
  );
  useEffect(() => {
    axios
      .get(`http://localhost:3002/products?id=${id}`)
      .then((res) => setItem(res.data));
  }, []);
  console.log(data);

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
                        <img src={`http://localhost:3002/files/${i}`} alt="مشکل در نمایش تصویر" />
                      </SwiperSlide>
                    ))}
                </Swiper>

                <div className={productDetailStyles.info}>
                  <p>{data.data[0].name}</p>
                  <p>{data.data[0].price}تومان</p>
                  <div className="d-flex">
                    <input
                      type="number"
                      name="count"
                      min="1"
                      max={`${data.data[0].count}`}
                      placeholder="1"
                    />
                    <Button className={productDetailStyles.btn}>
                      افزودن به سبد خرید
                    </Button>
                  </div>

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
