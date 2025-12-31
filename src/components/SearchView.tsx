import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { usePlaylistStore, usePlayerStore } from "@/stores";
import { TrackList } from "./TrackList";
import { PlaylistCard } from "./PlaylistCard";
import { formatTime } from "@/utils";
import type { Track } from "@/types";

export const SearchView = () => {
  const { playlists } = usePlaylistStore();
  const { setQueue, setCurrentTrack, play, currentTrack, isPlaying } =
    usePlayerStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Top searches this week
  const topSearches = [
    "The Weeknd",
    "Dua Lipa",
    "Harry Styles",
    "Olivia Rodrigo",
    "Lil Nas X",
    "Drake",
    "Taylor Swift",
    "Billie Eilish",
    "Ed Sheeran",
    "Post Malone",
    "Ariana Grande",
    "The Kid LAROI",
  ];

  // Get all tracks from all playlists
  const allTracks = playlists.flatMap((playlist) => playlist.tracks);

  // Recently played tracks (showing first 10 tracks)
  const recentlyPlayedTracks = allTracks.slice(0, 10);

  const handleTrackClick = (track: Track) => {
    const trackIndex = allTracks.findIndex((t) => t.id === track.id);
    if (trackIndex !== -1) {
      setQueue(allTracks, trackIndex);
      setCurrentTrack(track);
      play();
    }
  };

  // Filter tracks based on search query
  const filteredTracks = allTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylists = playlists.filter(
    (playlist) =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto bg-[#F7F7F7] px-6 py-6">
      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5 z-10 pointer-events-none" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-4 glass rounded-full text-lg text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[oklch(64.5%_0.246_16.439)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Top Searches This Week */}
      {!searchQuery && (
        <div className="mb-8">
          <h2 className="text-xl font-medium text-zinc-900 mb-4 tracking-tight">
            Top searches this week
          </h2>
          <div className="flex flex-wrap gap-2">
            {topSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(search)}
                className="px-4 py-2 bg-white border border-zinc-100 rounded-full text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recently Played Music */}
      {!searchQuery && recentlyPlayedTracks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-medium text-zinc-900 mb-4 tracking-tight">
            Recently Played Music
          </h2>
          <div className="space-y-2">
            {recentlyPlayedTracks.map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackClick(track)}
                  className="group w-full bg-white border border-zinc-100 rounded-xl p-4 flex items-center gap-4 hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  {/* Album Art Placeholder */}
                  <div className="w-16 h-16 bg-rose rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white text-3xl font-semibold">♪</span>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-base font-semibold truncate ${
                        isCurrent ? "text-rose" : "text-zinc-900"
                      }`}
                    >
                      {track.title}
                    </h3>
                    <p className="text-sm text-zinc-600 truncate">
                      {track.artist}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {track.album}
                    </p>
                  </div>

                  {/* Play Button / Duration */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrackClick(track);
                      }}
                      className="w-10 h-10 bg-rose rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 border border-zinc-100"
                    >
                      {isCurrent && isPlaying ? (
                        <FaPause className="w-4 h-4 text-white" />
                      ) : (
                        <FaPlay className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>
                    <span className="text-sm text-zinc-500 w-12 text-right">
                      {formatTime(track.duration)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {searchQuery ? (
        <>
          {/* Search Results */}
          {filteredTracks.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
                Songs
              </h2>
              <div className="glass-card rounded-2xl overflow-hidden">
                <TrackList tracks={filteredTracks} />
              </div>
            </div>
          )}

          {filteredPlaylists.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
                Playlists
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    imageHeight="h-40"
                    showPlayButton={false}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredTracks.length === 0 && filteredPlaylists.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <p className="text-zinc-500 text-lg">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
