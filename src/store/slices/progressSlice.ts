import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  currentStep: number;
  totalSteps: number;
  steps: {
    phoneVerification: boolean;
    fetchMutualFunds: boolean;
    kyc: boolean;
    pledgeMutualFunds: boolean;
    bankAccount: boolean;
    eSign: boolean;
  };
}

const initialState: ProgressState = {
  currentStep: 1,
  totalSteps: 6,
  steps: {
    phoneVerification: false,
    fetchMutualFunds: false,
    kyc: false,
    pledgeMutualFunds: false,
    bankAccount: false,
    eSign: false,
  },
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    completeStep: (state, action: PayloadAction<keyof ProgressState['steps']>) => {
      state.steps[action.payload] = true;
    },
    resetProgress: (state) => {
      Object.keys(state.steps).forEach((key) => {
        state.steps[key as keyof ProgressState['steps']] = false;
      });
      state.currentStep = 1;
    },
  },
});

export const { setCurrentStep, completeStep, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
