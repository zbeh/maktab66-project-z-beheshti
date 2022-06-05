import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import purchaseStyles from "./purchaseStyles.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
export default function Purchase() {
  const [value, setValue] = useState();
  // new DateObject({ calendar: persian })
  let date = new DateObject({ calendar: persian });
  let min = date.day + 7;
  console.log(min);
  const [order, setOrder] = useState();
  const [send, setSend] = useState(false);
  const info = useSelector((state) => state.basket.orderItems);
  const purchaseTotal = useSelector((state) => state.basket.total);
  console.log(info);
  console.log(purchaseTotal);
  useEffect(() => {
    if (send) {
      localStorage.setItem("orders", JSON.stringify(order));
      toast.success("اطلاعات با موفقیت ثبت شد.");
      window.location.replace(
        "http://127.0.0.1:5500/final-project/public/Shaparak.html"
      );
    }
    setSend(false);
    setOrder(null);
  }, [send]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "نام کمتر از سه کلمه نمی تواند باشد.")
        .required("این فیلد نمی تواند خالی باشد."),
      lastName: Yup.string()
        .max(20, "نام خانوادگی بیشتر از 20 کاراکتر نمی تواند باشد.")
        .required("این فیلد نمی تواند خالی باشد."),
      address: Yup.string().required("این فیلد نمی تواند خالی باشد."),
      phone: Yup.number()
        .min(11, "شماره تلفن همراه کمتر از 11 عدد نمی تواند باشد.")
        .required("این فیلد نمی تواند خالی باشد."),
    }),
    onSubmit: (values) => {
      if (value.day < min) {
        toast.error("تاریخ وارد شده صحیح نمی باشد.");
      } else {
        setOrder({
          customerDetail: {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            address: values.address,
          },
          orderStatus: 2,
          delivery: value.toUnix() * 1000,
          orderDate: Date.now(),
          orderItems: info,
          purchaseTotal: purchaseTotal,
          orderNumber: Math.floor(Math.random() * 1000) + 1,
        });
        setSend(true);
      }
    },
  });
  console.log(order);
  // console.log(value.toUnix());
  // let now = new Date(1655450122000).toLocaleDateString("fa-IR");
  // console.log(now);
  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>نهایی کردن خرید</h1>
      <div className={`container`}>
        <form
          onSubmit={formik.handleSubmit}
          className={`${purchaseStyles.form} `}
        >
          <TextField
            id="firstName"
            name="firstName"
            label="نام"
            type="text"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            sx={{ width: "100%", mb: "1rem" }}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null}

          <TextField
            id="lastName"
            label="نام خانوادگی"
            name="lastName"
            type="text"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            sx={{ width: "100%", mb: "1rem" }}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error">{formik.errors.lastName}</div>
          ) : null}

          <TextField
            id="address"
            label="آدرس"
            name="address"
            type="text"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            sx={{ width: "100%", mb: "1rem", direction: "rtl" }}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error">{formik.errors.address}</div>
          ) : null}

          <TextField
            id="phone"
            label="تلفن همراه"
            name="phone"
            type="text"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            sx={{ width: "100%", mb: "1rem" }}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error">{formik.errors.phone}</div>
          ) : null}
          <div className={purchaseStyles.datePicker}>
            <label className={purchaseStyles.label} htmlFor="delivery">
              {" "}
              تاریخ تحویل
            </label>

            <DatePicker
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={value}
              minDate={new DateObject({ calendar: persian }).set("day", min)}
              onChange={setValue}
              placeholder="زمان مورد نظر را انتخاب کنید."
            />
          </div>
          <div className={purchaseStyles.btn}>
            <Button type="submit">پرداخت</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
