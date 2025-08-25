import {configureStore} from "@reduxjs/toolkit"
                                            //importing configureStore from redux
import empReducers from './slices/empSlices';
import authReducer from './slices/authSlices';
                                            //importing tasksReducers from empSlices file

{/*employees state managed by tasksReducers*/}
export const store = configureStore({
    reducer:{
        employees: empReducers,
        auth: authReducer
    }
})