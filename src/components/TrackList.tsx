import type { Track } from "@/types";
import { usePlayerStore } from "@/stores";
import { FaPlay, FaPause } from "react-icons/fa";
import { formatTime } from "@/utils";
import { useState } from "react";

interface TrackListProps {
  tracks: Track[];
  onTrackClick?: (track: Track) => void;
}

export const TrackList = ({ tracks, onTrackClick }: TrackListProps) => {
  const { currentTrack, isPlaying, setQueue, setCurrentTrack, play } =
    usePlayerStore();
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const handleTrackClick = (track: Track, index: number) => {
    setQueue(tracks, index);
    setCurrentTrack(track);
    play();
    onTrackClick?.(track);
  };

  const isCurrentTrack = (track: Track) => {
    return currentTrack?.id === track.id;
  };

  if (tracks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-zinc-500 text-sm">No tracks available</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div className="space-y-1">
        {tracks.map((track, index) => {
          const isCurrent = isCurrentTrack(track);
          const isHovered = hoveredTrack === track.id;

          return (
            <div
              key={track.id}
              className="group grid grid-cols-[32px_1fr_1fr_60px] md:grid-cols-[32px_1fr_1fr_1fr_60px] gap-4 px-4 py-2 rounded-xl hover:bg-white/40 transition-all cursor-pointer items-center"
              onMouseEnter={() => setHoveredTrack(track.id)}
              onMouseLeave={() => setHoveredTrack(null)}
              onClick={() => handleTrackClick(track, index)}
            >
              {/* Track Number / Play Button */}
              <div className="flex items-center justify-center">
                {isHovered || isCurrent ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackClick(track, index);
                    }}
                    className="text-rose-400 hover:scale-110 transition-transform"
                  >
                    {isCurrent && isPlaying ? (
                      <FaPause className="w-4 h-4" />
                    ) : (
                      <FaPlay className="w-4 h-4" />
                    )}
                  </button>
                ) : (
                  <span className="text-zinc-500 text-sm group-hover:text-zinc-900">
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Track Info */}
              <div className="min-w-0">
                <p
                  className={`text-sm truncate ${
                    isCurrent
                      ? "text-[oklch(64.5%_0.246_16.439)] font-semibold"
                      : "text-zinc-900"
                  }`}
                >
                  {track.title}
                </p>
                <p className="text-zinc-900 text-sm truncate">{track.artist}</p>
              </div>

              {/* Album */}
              <div className="hidden md:block min-w-0">
                <p className="text-zinc-900 text-sm truncate">{track.album}</p>
              </div>

              {/* Duration */}
              <div className="text-right">
                <span className="text-zinc-500 text-sm">
                  {formatTime(track.duration)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
