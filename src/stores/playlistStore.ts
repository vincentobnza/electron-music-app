import { create } from "zustand";
import type { Playlist, Track } from "@/types";

interface PlaylistStore {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  addPlaylist: (playlist: Playlist) => void;
  removePlaylist: (id: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
}

// Demo playlists with sample tracks
const demoPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Liked Songs",
    description: "Your favorite tracks",
    coverArt:
      "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/thisisv3/49tQo2QULno7gxHutgccqF/ar",
    tracks: [
      {
        id: "t1",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200,
      },
      {
        id: "t2",
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        duration: 174,
      },
      {
        id: "t3",
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: 203,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Chill Vibes",
    description: "Relaxing music for your day",
    coverArt: "https://i1.sndcdn.com/artworks-lCSUDlCb8ctR-0-t500x500.jpg",
    tracks: [
      {
        id: "t4",
        title: "Good 4 U",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        duration: 178,
      },
      {
        id: "t5",
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        album: "F*CK LOVE 3",
        duration: 141,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Workout Mix",
    description: "High energy tracks",
    coverArt:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqvxYHBleYU_OSIBWGNumxazTRrm0EdwZNiA&s",
    tracks: [
      {
        id: "t6",
        title: "Industry Baby",
        artist: "Lil Nas X & Jack Harlow",
        album: "MONTERO",
        duration: 212,
      },
      {
        id: "t7",
        title: "Heat Waves",
        artist: "Glass Animals",
        album: "Dreamland",
        duration: 238,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Indie Pop Hits",
    description: "Best of indie pop",
    coverArt:
      "https://i.pinimg.com/736x/54/0b/79/540b79b3d7df3982fe76b3fd4d47df0a.jpg",
    tracks: [
      {
        id: "t8",
        title: "As It Was",
        artist: "Harry Styles",
        album: "Harry's House",
        duration: 167,
      },
      {
        id: "t9",
        title: "About Damn Time",
        artist: "Lizzo",
        album: "Special",
        duration: 191,
      },
      {
        id: "t10",
        title: "Running Up That Hill",
        artist: "Kate Bush",
        album: "Hounds of Love",
        duration: 298,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "R&B Essentials",
    description: "Smooth R&B vibes",
    coverArt:
      "https://cdn-images.dzcdn.net/images/artist/c29ff56d78f7a5246c7fbd5221e46723/1900x1900-000000-80-0-0.jpg",
    tracks: [
      {
        id: "t11",
        title: "Peaches",
        artist: "Justin Bieber ft. Daniel Caesar & Giveon",
        album: "Justice",
        duration: 198,
      },
      {
        id: "t12",
        title: "Leave The Door Open",
        artist: "Bruno Mars, Anderson .Paak, Silk Sonic",
        album: "An Evening With Silk Sonic",
        duration: 242,
      },
      {
        id: "t13",
        title: "Essence",
        artist: "WizKid ft. Tems",
        album: "Made In Lagos",
        duration: 247,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Rock Classics",
    description: "Timeless rock anthems",
    coverArt:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    tracks: [
      {
        id: "t14",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        duration: 355,
      },
      {
        id: "t15",
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        album: "Led Zeppelin IV",
        duration: 482,
      },
      {
        id: "t16",
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Appetite for Destruction",
        duration: 356,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Electronic Dance",
    description: "EDM bangers",
    coverArt:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500",
    tracks: [
      {
        id: "t17",
        title: "One More Time",
        artist: "Daft Punk",
        album: "Discovery",
        duration: 320,
      },
      {
        id: "t18",
        title: "Titanium",
        artist: "David Guetta ft. Sia",
        album: "Nothing but the Beat",
        duration: 245,
      },
      {
        id: "t19",
        title: "Levels",
        artist: "Avicii",
        album: "Levels",
        duration: 202,
      },
    ],
    createdAt: new Date(),
  },
];

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: demoPlaylists,
  currentPlaylist: null,

  setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),

  addPlaylist: (playlist) =>
    set((state) => ({
      playlists: [...state.playlists, playlist],
    })),

  removePlaylist: (id) =>
    set((state) => ({
      playlists: state.playlists.filter((p) => p.id !== id),
      currentPlaylist:
        state.currentPlaylist?.id === id ? null : state.currentPlaylist,
    })),

  addTrackToPlaylist: (playlistId, track) =>
    set((state) => ({
      playlists: state.playlists.map((p) =>
        p.id === playlistId ? { ...p, tracks: [...p.tracks, track] } : p
      ),
      currentPlaylist:
        state.currentPlaylist?.id === playlistId
          ? {
              ...state.currentPlaylist,
              tracks: [...state.currentPlaylist.tracks, track],
            }
          : state.currentPlaylist,
    })),

  removeTrackFromPlaylist: (playlistId, trackId) =>
    set((state) => ({
      playlists: state.playlists.map((p) =>
        p.id === playlistId
          ? { ...p, tracks: p.tracks.filter((t) => t.id !== trackId) }
          : p
      ),
      currentPlaylist:
        state.currentPlaylist?.id === playlistId
          ? {
              ...state.currentPlaylist,
              tracks: state.currentPlaylist.tracks.filter(
                (t) => t.id !== trackId
              ),
            }
          : state.currentPlaylist,
    })),
}));
