import { configureStore } from '@reduxjs/toolkit'
 import adminReducer from '../Reducer/Reducer'
 import dataReducer from '../Reducer/DataReducer'
 import ordersReducer from '../Reducer/OrderReducer'
export default configureStore({
  reducer: {
    admin: adminReducer,
    data : dataReducer,
    orders : ordersReducer,
  },
})
