import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { TitleBar } from "@/components/TitleBar";
import { PlayerControls } from "@/components/PlayerControls";
import { HomePage, SearchPage, LibraryPage, PlaylistPage } from "@/pages";
import { usePlaylistStore } from "@/stores";
import { usePreferencesStore } from "@/stores";
import { NavigationProvider } from "@/contexts/NavigationContext";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const { playlists, setCurrentPlaylist } = usePlaylistStore();
  const { theme } = usePreferencesStore();

  // Apply theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Handle navigation
  const handleNavigate = (view: string) => {
    setCurrentView(view);

    // If navigating to a playlist, set it as current
    if (view.startsWith("playlist-")) {
      const playlistId = view.replace("playlist-", "");
      const playlist = playlists.find((p) => p.id === playlistId);
      if (playlist) {
        setCurrentPlaylist(playlist);
      }
    } else if (view === "liked") {
      const likedPlaylist = playlists.find((p) => p.name === "Liked Songs");
      if (likedPlaylist) {
        setCurrentPlaylist(likedPlaylist);
        setCurrentView(`playlist-${likedPlaylist.id}`);
      }
    }
  };

  // Render current page
  const renderPage = () => {
    if (currentView.startsWith("playlist-")) {
      const playlistId = currentView.replace("playlist-", "");
      return <PlaylistPage playlistId={playlistId} />;
    }

    const pageMap = {
      home: <HomePage />,
      search: <SearchPage />,
      library: <LibraryPage />,
    } as const;

    return pageMap[currentView as keyof typeof pageMap] || <HomePage />;
  };

  return (
    <NavigationProvider navigate={handleNavigate}>
      <div className="h-screen w-screen bg-[#F7F7F7] text-zinc-900 flex flex-col overflow-hidden">
        {/* Custom Title Bar */}
        <TitleBar />
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <Sidebar onNavigate={handleNavigate} currentView={currentView} />
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Bar */}
            <TopBar />
            {/* Content Area */}
            <div className="flex-1 overflow-hidden">{renderPage()}</div>
          </div>
        </div>
        {/* Player Controls */}
        <PlayerControls />
      </div>
    </NavigationProvider>
  );
}

export default App;
