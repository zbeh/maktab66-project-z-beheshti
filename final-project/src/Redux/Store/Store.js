import { configureStore } from '@reduxjs/toolkit'
 import adminReducer from '../Reducer/Reducer'
 import dataReducer from '../Reducer/DataReducer'
 import ordersReducer from '../Reducer/OrderReducer'
import CategoryReducer from '../Reducer/CategoryReducer'
import SubReducer from '../Reducer/SubReducer'
export default configureStore({
  reducer: {
    admin: adminReducer,
    data : dataReducer,
    orders : ordersReducer,
    category:CategoryReducer,
    subCategory: SubReducer
  },
})
