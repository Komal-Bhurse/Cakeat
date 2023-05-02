import { createSlice} from "@reduxjs/toolkit";

const user = localStorage.getItem("userInfo") !== null ? JSON.parse(localStorage.getItem("userInfo")):null


const userSlice = createSlice({
    name: "User",
    initialState:{
        data: user,
        isUser:false
    },
   reducers:{
      userInfo: (state,action)=>{
        state.data = action.payload;
        localStorage.setItem("userInfo",JSON.stringify(action.payload))
      },
      setUser: (state,action)=>{
        state.isUser = action.payload;
      }
   }
})

export const  {userInfo,setUser} = userSlice.actions;
export default userSlice.reducer;