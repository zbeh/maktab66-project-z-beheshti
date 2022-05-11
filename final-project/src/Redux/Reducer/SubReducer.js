import { createSlice } from '@reduxjs/toolkit'

export const subSlice = createSlice({
  name: 'subCategory',
  initialState: {
    data : null,
  },
  reducers: {
    setSub: (state,action) => {
       return  action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSub } = subSlice.actions

export default subSlice.reducer