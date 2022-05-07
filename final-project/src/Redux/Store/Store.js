import { configureStore } from '@reduxjs/toolkit'
 import adminReducer from '../Reducer/Reducer'
export default configureStore({
  reducer: {
    admin: adminReducer,
  },
})
