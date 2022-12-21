import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Label, LabelAPI, CreateLabelReq} from '../api/label';
import {addSuccess, addFailure} from './notifications';


interface LabelsState {
    items: Label[],
    status: string
    error: string | undefined
}

export const getLabels = createAsyncThunk('labels/getLabels', async () => {
  // TODO: substitute this with client that has no exception handling
  return await LabelAPI.getLabels();
});

export const createLabel = createAsyncThunk('labels/createLabel',
  async (label: CreateLabelReq, thunkAPI) => {
    const response = await LabelAPI.createLabel(label);
    if ('error' in response) {
      thunkAPI.dispatch(addFailure(response.error));
    } else {
      thunkAPI.dispatch(addSuccess(response.message));
    }
    return response;
  });


const initialState: LabelsState = {
  items: [],
  status: 'idle',
  error: undefined,
};

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLabels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLabels.fulfilled, (state, action) => {
        if ('error' in action.payload) {
          state.status = 'failed';
          state.error = action.payload.error;
        } else {
          state.status = 'succeeded';
          state.items = action.payload.labels;
        }
      })
      .addCase(getLabels.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createLabel.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createLabel.fulfilled, (state, action) => {
        if ('error' in action.payload) {
          state.status = 'failed';
          state.error = action.payload.error;
        } else {
          state.status = 'succeeded';
        }
      })
      .addCase(createLabel.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export default labelsSlice.reducer;
