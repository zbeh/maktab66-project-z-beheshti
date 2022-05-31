import { createSlice } from '@reduxjs/toolkit'

export const updateSlice = createSlice({
  name: 'update',
  initialState: {
    data :false,
  },
  reducers: {
    update: (state,action) => {
        state.data=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { update } = updateSlice.actions

export default updateSlice.reducer