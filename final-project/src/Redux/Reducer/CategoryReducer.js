import { createSlice } from '@reduxjs/toolkit'

export const catSlice = createSlice({
  name: 'category',
  initialState: {
    data : null,
  },
  reducers: {
    setCategory: (state,action) => {
       return  action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategory } = catSlice.actions

export default catSlice.reducer