import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
       name:'ticket',
       initialState:{
              ticket:null
       },
       reducers:{
              storeOrder:(state,action)=>{
                     state.ticket = action.payload
              }
       }
})

export const {storeOrder} = orderSlice.actions
export default orderSlice.reducer