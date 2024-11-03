import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginSlice'
import cartSlice from './features/cartSlice'
import globalSlice from './features/globalSlice'


export const store = configureStore({
  reducer: {
    // Add the generated apiSlice reducer
    auth: loginSlice.reducer,
    cart: cartSlice.reducer,  
    global: globalSlice.reducer,  
  },

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch