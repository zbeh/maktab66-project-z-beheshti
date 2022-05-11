import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data : null,
  },
  reducers: {
    addOrders: (state,action) => {
       return  action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrders } = ordersSlice.actions

export default ordersSlice.reducer