import { createSlice } from "@reduxjs/toolkit";
const applicationSlice = createSlice({
    name:'application',
    initialState: {
        applicatns : [],
    },
    reducers:{
        setAllApplicants : (state,action)=>{
            state.applicatns = action.payload;
        }
    }
});
export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;