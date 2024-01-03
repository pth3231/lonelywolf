import { create } from 'zustand';

export const useGlobalStorage = create((set) => ({
    steps: 0,
    aggregatedSteps: {},

    setSteps: (steps) => set(() => ({ steps: steps })),
    setAggregatedSteps: (aggregatedSteps) => set(() => ({ aggregatedSteps: aggregatedSteps }))
}));