import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchVal : "i",
    category : "i"
}

const searchSlice = createSlice({
    name : "SearchUser",
    initialState,
    reducers : {
        addData : (state,action)=>{
            state.searchVal = action.payload.searchVal,
            state.category = action.payload.category
        }

    }
});

export const {addData} = searchSlice.actions 

export default searchSlice.reducer