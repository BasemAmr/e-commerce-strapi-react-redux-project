import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios/axios.config';
import CookiesService from '../../services/cookies';
import { IErrorResponse } from '../../interfaces';


interface LoginResponse {
    jwt: string;
    user: {
        id: number;
        documentId: string;
        username: string;
        email: string;
    };
}

interface IInitialState {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState :IInitialState = {
  status: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
};


export const login = createAsyncThunk(
  'auth/login',
  async (data: { identifier: string; password: string }, { rejectWithValue }) => {
    try {
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
},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';

      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;

        const IN_DAYS = 1
        const EXPIRE_IN = new Date(new Date().getTime() + IN_DAYS * 24 * 60 * 60 * 1000);
        const options = { expire: EXPIRE_IN, path: '/' };
        CookiesService.setCookie('jwt', action.payload.jwt, options);

        // Redirect to home page
        window.location.href = '/';

      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
    }
});

export default loginSlice;
