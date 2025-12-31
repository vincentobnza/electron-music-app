import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
} from "react-icons/fa";

export const PlayerControls = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    setCurrentTime,
    setVolume,
    togglePlay,
    nextTrack,
    previousTrack,
    seek,
  } = usePlayerStore();

  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume / 100;

      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });

      audioRef.current.addEventListener("ended", () => {
        nextTrack();
      });

      audioRef.current.addEventListener("loadedmetadata", () => {
        if (audioRef.current && currentTrack) {
          // For demo purposes, we'll simulate audio playback
          // In a real app, you'd set audioRef.current.src to the track's audioUrl
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // For demo: simulate playback by updating time
        // In production, you'd use: audioRef.current.play()
        const interval = setInterval(() => {
          if (audioRef.current && currentTrack) {
            const newTime = Math.min(
              audioRef.current.currentTime + 0.1,
              currentTrack.duration
            );
            setCurrentTime(newTime);
            audioRef.current.currentTime = newTime;

            if (newTime >= currentTrack.duration) {
              nextTrack();
            }
          }
        }, 100);

        return () => clearInterval(interval);
      } else {
        // audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, setCurrentTime, nextTrack]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      setCurrentTime(0);
      audioRef.current.currentTime = 0;
      // In production: audioRef.current.src = currentTrack.audioUrl || '';
      // For demo, we'll just simulate
    }
  }, [currentTrack, setCurrentTime]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !currentTrack) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * currentTrack.duration;
    seek(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setVolume(percentage * 100);
  };

  if (!currentTrack) {
    return (
      <div className="h-24 glass border-t border-white/20 flex items-center justify-center">
        <p className="text-zinc-500 text-sm">No track selected</p>
      </div>
    );
  }

  const progressPercentage = currentTrack
    ? (currentTime / currentTrack.duration) * 100
    : 0;

  return (
    <div className="h-24 glass  flex flex-col">
      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="h-1 bg-zinc-100 cursor-pointer hover:h-1.5 transition-all group"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-rose transition-colors rounded-r-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex-1 flex items-center justify-between px-6">
        {/* Track Info & Controls */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="size-10 bg-rose rounded-xl shrink-0 border border-zinc-100 flex justify-center items-center text-white text-xl font-bold">
            ♪
          </div>
          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-zinc-900 text-md font-medium truncate">
              {currentTrack.title}
            </p>
            <p className="text-zinc-600 text-xs truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={previousTrack}
            className="p-2 text-zinc-900 hover:text-zinc-900 transition-colors"
            title="Previous"
          >
            <FaStepBackward className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="p-2 bg-rose text-white rounded-full hover:scale-110 transition-transform w-10 h-10 flex items-center justify-center border border-zinc-100 hover:bg-[oklch(60%_0.246_16.439)]"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4 ml-0.5" />
            )}
          </button>
          <button
            onClick={nextTrack}
            className="p-2 text-zinc-900 hover:text-zinc-900 transition-colors"
            title="Next"
          >
            <FaStepForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {volume === 0 ? (
            <FaVolumeMute className="w-4 h-4 text-zinc-900" />
          ) : volume < 50 ? (
            <FaVolumeDown className="w-4 h-4 text-zinc-900" />
          ) : (
            <FaVolumeUp className="w-4 h-4 text-zinc-900" />
          )}
          <div
            className="w-24 h-1 bg-zinc-300 rounded-full cursor-pointer hover:bg-rose/20 transition-all group relative"
            onClick={handleVolumeClick}
          >
            <div
              className="h-full bg-rose rounded-full transition-colors"
              style={{ width: `${volume}%` }}
            />
          </div>
          <span className="text-zinc-900 text-xs w-10 text-right">
            {Math.round(volume)}%
          </span>
        </div>
      </div>
    </div>
  );
};
