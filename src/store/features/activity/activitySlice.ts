import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { IActivity, getActivity as getActivityApi } from '../../../api';
import { RootState } from '../../store';

interface ActivityState {
  activity: IActivity | null;
  isLoading: boolean;
  error: Error | SerializedError | null;
}

const initialState: ActivityState = {
  activity: null,
  isLoading: false,
  error: null,
};

export const getActivity = createAsyncThunk(
  'activity/getActivity',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActivityApi().then((data) => data);
      return response as IActivity;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getActivity.fulfilled,
        (state, action: PayloadAction<IActivity>) => {
          state.activity = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getActivity.pending, (state) => {
        state.activity = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getActivity.rejected, (state, action) => {
        state.activity = null;
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const selectIsLoading = (state: RootState) => state.activity.isLoading;
export const selectActivity = (state: RootState) => state.activity.activity;
export const selectError = (state: RootState) => state.activity.error;

export default activitySlice.reducer;
