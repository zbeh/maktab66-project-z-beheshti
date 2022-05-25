import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data : [],
  },
  reducers: {
    setData: (state,action) => {
       return  action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setData } = dataSlice.actions

export default dataSlice.reducer