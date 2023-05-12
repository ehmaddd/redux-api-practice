import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (thunkAPI) => {
    try {
      const resp = await axios.get('https://randomuser.me/api/?results=5');
      console.log(resp.data.results);
      return resp.data.results;
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const initialState = {
  users : []
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      });
    builder.addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;