import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../Helper/USeFetch";
import productDetailStyles from "./productDetailStyles.module.scss";
import { Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3002/products?id=${id}`
  );
  console.log(data);

  if (error) {
    return (
      <>
        <Typography variant="body1">ERROR - Typography Body1</Typography>
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
                <img
                  src={`http://localhost:3002/files/${data.data[0].images[0]}`}
                />
                <div className={productDetailStyles.info}>
                  <p>{data.data[0].name}</p>
                  <p>{data.data[0].price}تومان</p>
                  <div className="d-flex">
                    <input
                      type="number"
                      name="count"
                      min="1"
                      max={`${data.data[0].count}`}
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
