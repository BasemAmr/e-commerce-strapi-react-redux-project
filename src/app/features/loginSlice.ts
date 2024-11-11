import { AuthUser, UserRole } from './../../interfaces/index';
import { toaster } from './../../components/ui/toaster';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios.config';
import CookiesService from '../../services/cookies';
import { IErrorResponse } from '../../interfaces';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


interface LoginResponse {
    jwt: string;
    user: AuthUser;
    
}

interface AuthState {
  user: AuthUser | null;
  role: UserRole;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  role: 'guest',
  status: 'idle',
  isAuthenticated: false,
  error: null
};


export const login = createAsyncThunk(
  'auth/login',
  async (data: { identifier: string; password: string }, { rejectWithValue }) => {
    try {
      console.log(data);
        const response = await instance.post(`/api/auth/local`, data);
        return response.data as LoginResponse
    } catch (error) {
        const errorResponse = error as IErrorResponse;
        return rejectWithValue(errorResponse.error.message || 'An error occurred');
    }   
  }
);

        

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = 'guest';
      state.isAuthenticated = false;
      state.status = 'idle';
      CookiesService.removeCookie('jwt');
    },
    updateUserRole: (state, action: PayloadAction<UserRole>
     ) => {
      if (state.user) {
        state.user.role = action.payload;
        state.role = action.payload;
      }
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
        state.error = null;

      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.isAuthenticated = true;
        state.error = null;

        // Set JWT cookie
        const EXPIRE_IN = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        CookiesService.setCookie('jwt', action.payload.jwt, {
          expires: EXPIRE_IN,
          path: '/'
        });

        toaster.create({
          description: 'Login successful',
          type: 'success',
          duration: 2000
        });

       setTimeout(() => {
          window.location.href = action.payload.user.role === 'admin' 
            ? '/admin' 
            : '/';
        }, 1000);


      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.isAuthenticated = false;
        state.status = 'failed';
        toaster.create({
          description: action.error.message || 'An error occurred',
          duration: 2000,
          type: 'error',
        })
      })
    }
});

// Configure persistence
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'role', 'isAuthenticated']
};

export const { logout, updateUserRole } = loginSlice.actions;
export const persistedAuthReducer = persistReducer(persistConfig, loginSlice.reducer);
export default persistedAuthReducer;
