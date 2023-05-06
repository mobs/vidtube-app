import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    mode:'light',
    uiColor:'#ff4040',
    theme:{
        color:'#565360',
        backgroundColor:'#f2f5f5'
    },
    nonThemeColor:'#1C2520'
};

const themeSlice=createSlice({
    name:'theme',
    initialState:initialThemeState,
    reducers:{
        changeThemeColor(state,action){
            state.theme.color=action.payload;
        },
        toggleMode(state){
            if(state.mode==='light'){
                state.mode='dark';
                state.theme.color='#f2f5f5';
                state.theme.backgroundColor='#1C2520';
                state.nonThemeColor='white';
            }
            else{
                state.mode='light';
                state.theme=initialThemeState.theme;
                state.nonThemeColor='#1C2520';
            }
        }
    }
});
const store=configureStore({
    reducer:themeSlice.reducer
});

export const themeActions=themeSlice.actions;
export default store;