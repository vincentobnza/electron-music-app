import { create } from 'zustand';
import type { Track, PlayerState } from '@/types';

interface PlayerStore extends PlayerState {
  // Actions
  setCurrentTrack: (track: Track | null) => void;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seek: (time: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Initial state
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  volume: 50,
  queue: [],
  currentIndex: -1,

  // Actions
  setCurrentTrack: (track) => set({ currentTrack: track, currentTime: 0 }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),

  setQueue: (tracks, startIndex = 0) => {
    set({
      queue: tracks,
      currentIndex: startIndex,
      currentTrack: tracks[startIndex] || null,
      currentTime: 0,
    });
  },

  nextTrack: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;

    const nextIndex = currentIndex < queue.length - 1 ? currentIndex + 1 : 0;
    set({
      currentIndex: nextIndex,
      currentTrack: queue[nextIndex],
      currentTime: 0,
    });
  },

  previousTrack: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
    set({
      currentIndex: prevIndex,
      currentTrack: queue[prevIndex],
      currentTime: 0,
    });
  },

  seek: (time) => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    set({ currentTime: Math.max(0, Math.min(time, currentTrack.duration)) });
  },
}));

