import { configureStore } from '@reduxjs/toolkit'

// state
const initialState = {
    userIsLogged: false,
    token : ""
  };

export const store = configureStore({
    reducer: {
      
    },
  })

  store.subscribe(() => {
    console.log("Nouveau state:");
    console.log(store.getState());
});