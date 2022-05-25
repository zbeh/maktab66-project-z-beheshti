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
import first from '../../../Assets/Images/1.jpg';
import second from '../../../Assets/Images/2.jpg';
import third from '../../../Assets/Images/3.jpeg';
import forth from '../../../Assets/Images/4.jpg';
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
  const handleClick = (e) => {
    console.log(e.target);
  };
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
        <SwiperSlide className={homeStyles.swiperSlide}><div className={homeStyles.fImage}></div></SwiperSlide>
        <SwiperSlide className={homeStyles.swiperSlide}><div className={homeStyles.sImage}></div></SwiperSlide>
        <SwiperSlide className={homeStyles.swiperSlide}><div className={homeStyles.tImage}></div></SwiperSlide>
        {/* <SwiperSlide className={homeStyles.swiperSlide}><img src={forth}/></SwiperSlide> */}
        
      </Swiper>
      <div className={`${homeStyles.homeContainer} container`}>
        <Link
          to="/all-products"
          state={{ from: `${1}` }}
          onClick={handleClick}
          className={homeStyles.link}
        >
          {cat?.find((c) => c.id == 1).name}
        </Link>
        <div className={`${homeStyles.cardConatiner} `}>
          {data?.map((d) => (
            <>
              <Card item={d} />
            </>
          ))}
        </div>
        <Link
          to="/all-products"
          state={{ from: `${2}` }}
          className={homeStyles.link}
        >
          {cat?.find((c) => c.id == 2).name}
        </Link>
        <div className={`${homeStyles.cardConatiner} `}>
          {men?.map((d) => (
            <>
              <Card item={d} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
