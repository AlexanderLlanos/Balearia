import create from 'zustand/vanilla';

export const useStep = create(() => ({
  type: '',
  tab: '',
  step: 0,
}));
