import { configureStore } from '@reduxjs/toolkit'
 import adminReducer from '../Reducer/Reducer'
 import dataReducer from '../Reducer/DataReducer'
 import ordersReducer from '../Reducer/OrderReducer'
import CategoryReducer from '../Reducer/CategoryReducer'
import SubReducer from '../Reducer/SubReducer'
import TokenReducer from '../Reducer/TokenReducer'
import BasketReducer from '../Reducer/BasketReducer'
const loadPreloadedState =()=>{
  try{
    const serializedState =localStorage.getItem("state");
    if(!serializedState){
      return undefined;
    }
    return JSON.parse(serializedState)
  }
  catch{
    return undefined
  }
}
const saveData = (state)=>{
  try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state",serializedState)
  }
  catch{

  }
}
 const store =  configureStore({
  preloadedState:loadPreloadedState(),
  reducer: {
    admin: adminReducer,
    data : dataReducer,
    orders : ordersReducer,
    category:CategoryReducer,
    subCategory: SubReducer,
    token:TokenReducer,
    basket:BasketReducer,
  },
})
store.subscribe(()=>{
  saveData({token:store.getState().token})
})
export default store