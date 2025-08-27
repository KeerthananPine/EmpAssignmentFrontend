import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const BASE_URL = 'https://test.pineappleai.cloud/api/auth/'

const user = JSON.parse(localStorage.getItem('user')); //gets the user data from browser local storage
const token = localStorage.getItem('token'); //gets the token from browser local storage

const initialState = {
  user: user ? user : null, //checks if user is in or not in local storage
  token: token ? token : null,  //checks if JWT token is in or not in local storage
  isLoading: false, // if loggin or resgistering is on process chnages into true
  isError: false, // if error comes it will change to true
  message: ''   //to store error msgs
};

export const register = createAsyncThunk(
  'auth/register',  //used in extraReducers
  async (userData, {rejectWithValue}) => {
  try {
    const res = await fetch(BASE_URL + 'register', {  //send the entered data to backend register API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  //data format is json 
      },
      body: JSON.stringify(userData)    //converts the json string for transmission
    });
    const data = await res.json(); //data have have the js obj from server 
    if (!res.ok) throw new Error(data.message || 'Registration failed'); // checks if the returned data is valid or not
    return data;
  } catch (error) {
    return rejectWithValue(error.message); //response for rejected action
  }
});

export const login = createAsyncThunk(
  'auth/login',  //used in extraReducers
  async (userData, {rejectWithValue}) => {
  try {
    const res = await fetch(BASE_URL + 'login', { //send the entered data to backend login API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  //data format is json 
      },
      body: JSON.stringify(userData)   //converts the json string for transmission
    });
    const data = await res.json();  //data have have the js obj from server 
    if (!res.ok) throw new Error(data.message || 'Login failed'); // checks if the returned data is valid or not
    return data;
  } catch (error) {
    return rejectWithValue(error.message); //response for rejected action
  }
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    resetAuthState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;

