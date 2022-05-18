import React from "react";
import { Header, Footer, SideBar } from "../Components";
export default function UserLayout(props) {
  const { sidebar } = props;
  if (sidebar) {
    return (
      <>
        <Header />
        <div className="d-flex container">
          <SideBar />
        {props.children}
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        {props.children}
        <Footer />
      </>
    );
  }
}
