#!/usr/bin/env node

/**
 * Development script for Electron app
 * Starts Vite dev server and waits for it before launching Electron
 */

import { spawn } from "child_process";
import { createServer } from "vite";

const VITE_PORT = 5173;

async function startDev() {
  console.log("🚀 Starting development environment...\n");

  // Start Vite dev server
  console.log("📦 Starting Vite dev server...");
  const viteServer = await createServer({
    server: { port: VITE_PORT },
  });

  await viteServer.listen();
  console.log(`✅ Vite dev server running at http://localhost:${VITE_PORT}\n`);

  // Start Electron
  console.log("⚡ Starting Electron...");
  const electron = spawn("electron", ["."], {
    stdio: "inherit",
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: `http://localhost:${VITE_PORT}`,
    },
  });

  electron.on("close", () => {
    viteServer.close();
    process.exit(0);
  });
}

startDev().catch((err) => {
  console.error("❌ Error starting development environment:", err);
  process.exit(1);
});
