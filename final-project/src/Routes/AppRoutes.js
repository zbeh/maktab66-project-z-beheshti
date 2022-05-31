import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../Layout/UserLayout";
import AdminLayout from "../Layout/AdminLayout";
import {
  Login,
  Checkout,
  Purchase,
  Home,
  Panel,
  AllProducts,
  ProductDetail,
  Products,
  Quantity,
  Orders,
  ProtectedRoute,
  PrivateRoute,
  PageNotFound,
  Shaparak,
} from "../Pages";
export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/product-details/:id"
          element={
            <UserLayout>
              <ProductDetail />
            </UserLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserLayout>
              <Checkout />
            </UserLayout>
          }
        />
        <Route path="/shaparak" element={<Shaparak />} />
        <Route
          path="/purchase"
          element={
            <UserLayout>
              <Purchase />
            </UserLayout>
          }
        />
        <Route
          path="/all-products/:categoryId"
          element={
            <UserLayout sidebar={true}>
              <AllProducts />
            </UserLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Panel />
              </AdminLayout>
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<Products />} />
          <Route path="quantity" element={<Quantity />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
