import { create } from 'zustand';

interface useModalState {
  isOpen: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<useModalState>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen }))
}));
