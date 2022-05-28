import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import homeStyles from "./homeStyles.module.scss";
import { Card } from "../../../Components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function Home() {
  const [data, setData] = useState();
  const [men, setMen] = useState();
  const [cat, setCat] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3002/products?_start=0&_end=8&category=1")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3002/products?_start=0&_end=8&category=2")
      .then((res) => setMen(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3002/category")
      .then((res) => setCat(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={homeStyles.swiper}
      >
        <SwiperSlide className={homeStyles.swiperSlide}>
          <div className={homeStyles.fImage}></div>
        </SwiperSlide>
        <SwiperSlide className={homeStyles.swiperSlide}>
          <div className={homeStyles.sImage}></div>
        </SwiperSlide>
        <SwiperSlide className={homeStyles.swiperSlide}>
          <div className={homeStyles.tImage}></div>
        </SwiperSlide>
      </Swiper>
      <div className={`${homeStyles.homeContainer} container`}>
        {cat?.map((c) => (
          <>
            <Link
              to={`all-products/${c.id}`}
              className={homeStyles.link}
            >
              {c.name}
            </Link>
            <div className={`${homeStyles.cardConatiner} `}>
              {c.id == 1 ? (
                <div className={`${homeStyles.cardConatiner} `}>
                  {data?.map((d) => (
                    <>
                      <Card item={d} />
                    </>
                  ))}
                </div>
              ) : (
                <div className={`${homeStyles.cardConatiner} `}>
                  {men?.map((d) => (
                    <>
                      <Card item={d} />
                    </>
                  ))}
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
}
