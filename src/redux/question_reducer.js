import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const questionReducer = createSlice({
    name : "questions",
    initialState : {
        queue: [],
        answers: [],
        trace : 0
    },
    reducers : {
        startExamAction : (state, action) => {
            return {
                ...state,
                queue : action.payload
            }
        }
    }
})

/** export actions */
export const { startExamAction } = questionReducer.actions;

/** export reducer */
export default questionReducer.reducer;