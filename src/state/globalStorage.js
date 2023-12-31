import { create } from 'zustand';

export const useGlobalStorage = create((set) => ({
    steps: 0,

    setSteps: (steps) => set(() => ({ steps: steps }))
}));