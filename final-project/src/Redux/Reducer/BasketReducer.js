import { createSlice } from '@reduxjs/toolkit'
const initialState ={
    item :[]
}
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state,action) => {
        if(!state.item.find(item=>item.id===action.payload.id)){
            state.item.push({
                ...action.payload
            })
        }
        return {
            ...state,
            item:[...state.item]
        }
        
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBasket } = basketSlice.actions

export default basketSlice.reducer