import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sideBarStyles from "./sideBarStyles.module.scss";
export default function SideBar() {
  const [cat, setCat] = useState();
  const [sub, setSub] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3002/category")
      .then((res) => setCat(res.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:3002/subCategory")
      .then((res) => setSub(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    // <div className='container'>
    <aside className={`${sideBarStyles.sideContainer}`}>
      <div className={sideBarStyles.title}>
        {cat
          ?.filter((e, i) => i === 0)
          .map((option, i) => (
            <Link to={`/all-products/${option.id}`} key={option.id}>
              {option.name}
            </Link>
          ))}
        <div className={sideBarStyles.sub}>
          {sub?.map((s) => (
            <p key={s.id}>{s.name}</p>
          ))}
        </div>
      </div>
      <div className={sideBarStyles.title}>
        {cat
          ?.filter((e, i) => i === 1)
          .map((option, i) => (
            <Link to={`/all-products/${option.id}`} key={option.id}>
              {option.name}
            </Link>
          ))}
        <div className={sideBarStyles.sub}>
          {sub?.map((s) => (
            <p key={s.id}>{s.name}</p>
          ))}
        </div>
      </div>
    </aside>
    // </div>
  );
}
