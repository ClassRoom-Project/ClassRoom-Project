import { CurrentType } from '@/types/user';
import { create } from 'zustand';

const currentStore = create<CurrentType>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set(() => ({ currentStep: step })),
  retryCount: 0,
  incrementRetryCount: () => set((state) => ({ retryCount: state.retryCount + 1 })),
  resetRetryCount: () => set(() => ({ retryCount: 0 }))
}));

export default currentStore;
