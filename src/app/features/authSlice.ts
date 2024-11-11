import { createSlice } from '@reduxjs/toolkit';
import { AuthUser, UserRole } from '../../interfaces';
import  CookiesService  from '../../services/cookies';

interface AuthState {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    role: 'guest',
    isAuthenticated: false
};  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = 'guest';
      state.isAuthenticated = false;
      CookiesService.removeCookie('jwt');
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice;