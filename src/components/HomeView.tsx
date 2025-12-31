import { useState } from "react";
import { usePlaylistStore, usePlayerStore } from "@/stores";
import { TrackList } from "./TrackList";
import { PlaylistCard } from "./PlaylistCard";
import { getGreetings } from "@/helpers/getGreetings";

export const HomeView = () => {
  const { playlists } = usePlaylistStore();
  const { setQueue, setCurrentTrack, play } = usePlayerStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get all tracks from all playlists for "Recently Played"
  const allTracks = playlists.flatMap((playlist) => playlist.tracks);

  const handlePlayAll = (tracks: typeof allTracks) => {
    if (tracks.length > 0) {
      setQueue(tracks, 0);
      setCurrentTrack(tracks[0]);
      play();
    }
  };

  // Get active linear color based on hovered index
  const getActiveColor = () => {
    if (hoveredIndex === null) return "rose-50";
    const colors = ["rose-50", "indigo-50", "yellow-50"];
    return colors[hoveredIndex % 3];
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="w-full px-6 py-6 relative">
        {/* Overlay linears with opacity transitions */}
        <div
          className={`absolute inset-0 bg-linear-to-b from-rose-50 to-transparent pointer-events-none transition-opacity duration-700 ease-in-out ${
            getActiveColor() === "rose-50" ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 bg-linear-to-b from-indigo-50 to-transparent pointer-events-none transition-opacity duration-700 ease-in-out ${
            getActiveColor() === "indigo-50" ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 bg-linear-to-b from-yellow-50 to-transparent pointer-events-none transition-opacity duration-700 ease-in-out ${
            getActiveColor() === "yellow-50" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-6 tracking-tight">
            {getGreetings()}
          </h1>
          {/* Quick Access Playlists */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-8">
            {playlists.slice(0, 6).map((playlist, index) => (
              <div
                key={playlist.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <PlaylistCard
                  playlist={playlist}
                  imageHeight="h-40"
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Played */}
      {allTracks.length > 0 && (
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Recently Played
            </h2>
            <button
              onClick={() => handlePlayAll(allTracks)}
              className="text-zinc-900 hover:text-zinc-900 text-sm font-semibold transition-colors"
            >
              Show all
            </button>
          </div>
          <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
            <TrackList tracks={allTracks.slice(0, 10)} />
          </div>
        </div>
      )}

      {/* Made for You */}
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">
          Made for You
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {playlists.map((playlist, index) => (
            <div
              key={playlist.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <PlaylistCard
                playlist={playlist}
                imageHeight="h-40"
                variant="compact"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
