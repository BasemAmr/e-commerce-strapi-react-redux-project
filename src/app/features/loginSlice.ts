import { AuthUser, UserRole } from './../../interfaces/index';
import { toaster } from './../../components/ui/toaster';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios.config';
import { IErrorResponse } from '../../interfaces';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CookiesService from '../../services/cookies';

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



// New thunk for fetching user role
export const fetchUserRole = createAsyncThunk(
  'auth/fetchUserRole',
  async (token: string) => {
    const response = await instance.get('/api/users/me?populate=*', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.role.type as UserRole;
  }
);


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
      CookiesService.removeCookie('jwt');
      state.user = null;
      state.role = 'guest';
      state.isAuthenticated = false;
      state.status = 'idle';

      toaster.create({
        description: 'Logged out',
        type: 'success',
        duration: 2000
      });
      
    },
    // updateUserRole: (state, action: PayloadAction<UserRole>
    //  ) => {
    //   if (state.user) {
    //     state.user.role = action.payload;
    //     state.role = action.payload;
    //   }
    // } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
        state.error = null;

      })
      .addCase(login.fulfilled, (state, action) => {
        CookiesService.setCookie('jwt', action.payload.jwt, { path: '/' });
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
          state.role =  action.payload;
          window.location.href = '/admin';
      })
      .addCase(fetchUserRole.rejected, (state) => {
        state.role = state.user ? 'authenticated' : 'guest'; 
        window.location.href = '/';

      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
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

export const { logout, } = loginSlice.actions;
export const persistedAuthReducer = persistReducer(persistConfig, loginSlice.reducer);
export default persistedAuthReducer;
