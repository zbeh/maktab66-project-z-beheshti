import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  orderItems: localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [],
    total:''
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    AddToBasket: (state, action) => {
      const targetIndex = state.orderItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (targetIndex >= 0) {
        state.orderItems[targetIndex] = {
          ...action.payload,
        };
        toast.success("محصول ویرایش و به سبد خرید اضافه شد.");
      } else {
        let tempProductItem = { ...action.payload };
        state.orderItems.push(tempProductItem);
        toast.success("محصول به سبد خرید اضافه شد.");
      }
      localStorage.setItem("items", JSON.stringify(state.orderItems));
    },
    RemoveFromBasket: (state, action) => {
      const filterItems = state.orderItems.filter(item=>item.id!==action.payload.id);

      state.orderItems = filterItems;
      toast.error("محصول از سبد خرید حذف شد.");

      localStorage.setItem("items", JSON.stringify(state.orderItems));
      return state;
    },
    clearBasket(state, action) {
        state.orderItems = [];
        localStorage.removeItem("items");
    },
    AddTotal(state,action){
       state.total = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { AddToBasket, RemoveFromBasket, clearBasket ,AddTotal} = basketSlice.actions;

export default basketSlice.reducer;
