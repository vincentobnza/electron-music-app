# 🎵 Electron Music Player

A modern, cross-platform desktop music player application built with Electron, React, and TypeScript. Enjoy a beautiful, responsive interface for managing your music library, playlists, and tracks.

## ✨ Features

- 🎼 **Music Library Management** - Organize and browse your music collection with ease
- 📋 **Playlist Support** - Create, manage, and play custom playlists
- 🔍 **Search Functionality** - Quickly find your favorite tracks and playlists
- 🎮 **Player Controls** - Full-featured audio playback controls
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS

## 🛠️ Tech Stack

### Core Technologies

- **[Electron](https://www.electronjs.org/)** - Cross-platform desktop app framework
- **[React](https://react.dev/)** 19 - Modern UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vite.dev/)** 7 - Next-generation frontend build tool

### State Management

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Clone the Repository

```bash
git clone <repository-url>
cd electron-app
```

### Install Dependencies

```bash
npm install
```

## 🚀 Development

### Start Development Server

Run the application in development mode with hot-reload:

```bash
npm run dev:electron
```

This command will:

- Start the Vite development server on `http://localhost:5173`
- Launch the Electron application
- Enable hot module replacement for instant updates

### Available Scripts

```bash
# Start development server
npm run dev

# Start Electron in development mode
npm run dev:electron

# Build for production
npm run build

# Build for Windows
npm run build:win

# Build for macOS
npm run build:mac

# Build for Linux
npm run build:linux

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## 🏗️ Building for Production

The application uses Electron Builder to create distributable packages for all major platforms.

### Windows

```bash
npm run build:win
```

Creates an NSIS installer in the `release/` directory.

### macOS

```bash
npm run build:mac
```

Creates a DMG file in the `release/` directory.

### Linux

```bash
npm run build:linux
```

Creates AppImage and DEB packages in the `release/` directory.

## 📁 Project Structure

```
electron-app/
├── electron/              # Electron main process files
│   ├── main.ts           # Main Electron process
│   └── preload.ts        # Preload script for secure IPC
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── HomeView.tsx
│   │   ├── LibraryView.tsx
│   │   ├── PlaylistView.tsx
│   │   ├── SearchView.tsx
│   │   ├── PlayerControls.tsx
│   │   └── ...
│   ├── pages/           # Page components
│   ├── stores/          # Zustand state stores
│   │   ├── playerStore.ts
│   │   ├── playlistStore.ts
│   │   └── preferencesStore.ts
│   ├── types/           # TypeScript type definitions
│   ├── helpers/         # Utility functions
│   └── App.tsx          # Main React component
├── dist/                # Built frontend assets
├── dist-electron/       # Built Electron main process
├── release/             # Built application packages
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies and scripts
```

## 🔧 Configuration

### Electron Configuration

Electron Builder configuration is located in `package.json` under the `build` key. You can customize:

- App ID and product name
- Build directories
- Platform-specific targets
- Icons and assets

### Vite Configuration

The Vite configuration (`vite.config.ts`) includes:

- React plugin with React Compiler
- Tailwind CSS integration
- Path aliases (`@/` → `src/`)
- Development server settings

## 🎨 UI Components

The application uses a custom component library built on top of Radix UI primitives, following the shadcn/ui pattern. Components are located in `src/components/ui/` and include:

- Button
- Card
- Dialog
- Input
- Select
- Checkbox

## 🔐 Security

- **Context Isolation** - Enabled for secure communication between main and renderer processes
- **Node Integration** - Disabled in the renderer process
- **Preload Script** - Secure IPC bridge between processes

## 📝 License

This project is private and proprietary.

## 👤 Author

Your Name

---

**Built with ❤️ using Electron, React, and TypeScript**
