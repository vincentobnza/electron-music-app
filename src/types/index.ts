// Music and playlist types
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverArt?: string;
  audioUrl?: string; // For demo purposes, we'll use placeholder URLs
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArt?: string;
  tracks: Track[];
  createdAt: Date;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  volume: number; // 0-100
  queue: Track[];
  currentIndex: number;
}
