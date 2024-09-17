import { create } from 'zustand';

const useEpisode = create((set) => ({
  episodes: [],
  info: {},
  setEpisodes: (episodes, info) => set({ episodes, info }),
}));

export default useEpisode;