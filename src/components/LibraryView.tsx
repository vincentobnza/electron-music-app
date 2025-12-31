import { useState, useMemo } from "react";
import { usePlaylistStore } from "@/stores";
import { FaMusic, FaClock } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { formatTime } from "@/utils";
import { PlaylistCard } from "./PlaylistCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption =
  | "recently-added"
  | "name-asc"
  | "name-desc"
  | "tracks-asc"
  | "tracks-desc";

export const LibraryView = () => {
  const { playlists } = usePlaylistStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recently-added");

  const totalTracks = playlists.reduce(
    (sum, playlist) => sum + playlist.tracks.length,
    0
  );
  const totalDuration = playlists.reduce(
    (sum, playlist) =>
      sum +
      playlist.tracks.reduce((trackSum, track) => trackSum + track.duration, 0),
    0
  );

  const filteredAndSortedPlaylists = useMemo(() => {
    const filtered = playlists.filter((playlist) => {
      const query = searchQuery.toLowerCase();
      return (
        playlist.name.toLowerCase().includes(query) ||
        playlist.description?.toLowerCase().includes(query) ||
        playlist.tracks.some(
          (track) =>
            track.title.toLowerCase().includes(query) ||
            track.artist.toLowerCase().includes(query)
        )
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "recently-added":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "tracks-asc":
          return a.tracks.length - b.tracks.length;
        case "tracks-desc":
          return b.tracks.length - a.tracks.length;
        default:
          return 0;
      }
    });

    return sorted;
  }, [playlists, searchQuery, sortBy]);

  return (
    <div className="h-full overflow-y-auto bg-[#F7F7F7] px-6 py-6">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
              Your Library
            </h1>
            <div className="flex items-center gap-4 text-zinc-900 text-sm">
              <div className="flex items-center gap-2">
                <FaMusic className="w-4 h-4" />
                <span>{playlists.length} playlists</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="w-4 h-4" />
                <span>{formatTime(totalDuration)}</span>
              </div>
              <span>{totalTracks} songs</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-90">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-12 rounded-none bg-white"
              />
            </div>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-48 h-12! rounded-none bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recently-added">Recently added</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="tracks-asc">Tracks (Fewest)</SelectItem>
                <SelectItem value="tracks-desc">Tracks (Most)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* TAGS */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAndSortedPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            imageHeight="h-50"
            showPlayButton={false}
          />
        ))}
      </div>
      {filteredAndSortedPlaylists.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <p className="text-zinc-500 text-sm">
            {searchQuery ? "No playlists found" : "No playlists available"}
          </p>
        </div>
      )}
    </div>
  );
};
