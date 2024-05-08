import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
       name:'order',
       initialState:{
              order:null
       },
       reducers:{
              storeOrder:(state,action)=>{
                     state.order = action.payload
              }
       }
})

export const {storeOrder} = orderSlice.actions
export default orderSlice.reducer