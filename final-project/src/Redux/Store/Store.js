import { configureStore } from '@reduxjs/toolkit'
 import adminReducer from '../Reducer/Reducer'
 import dataReducer from '../Reducer/DataReducer'
export default configureStore({
  reducer: {
    admin: adminReducer,
    data : dataReducer,
  },
})
