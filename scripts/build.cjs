const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const rootDir = path.resolve(__dirname, "..")

// 1. Ensure index.html has the source entry point for Vite
console.log("Preparing index.html for Vite compilation...")
fs.copyFileSync(path.join(rootDir, "index.src.html"), path.join(rootDir, "index.html"))

// 2. Run vite build
console.log("Running vite build...")
execSync("npx vite build", { stdio: "inherit", cwd: rootDir })

// 3. Mirror dist bundle to root for direct GitHub Pages branch root serving
console.log("Mirroring dist bundle to repository root...")
fs.copyFileSync(path.join(rootDir, "dist", "index.html"), path.join(rootDir, "index.html"))

// Copy dist/assets to root assets
const distAssets = path.join(rootDir, "dist", "assets")
const rootAssets = path.join(rootDir, "assets")
if (!fs.existsSync(rootAssets)) fs.mkdirSync(rootAssets, { recursive: true })
const assetFiles = fs.readdirSync(distAssets)
for (const file of assetFiles) {
  fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, file))
}

// Copy dist/images to root images
const distImages = path.join(rootDir, "dist", "images")
const rootImages = path.join(rootDir, "images")
if (!fs.existsSync(rootImages)) fs.mkdirSync(rootImages, { recursive: true })
if (fs.existsSync(distImages)) {
  const imageFiles = fs.readdirSync(distImages)
  for (const file of imageFiles) {
    fs.copyFileSync(path.join(distImages, file), path.join(rootImages, file))
  }
}

console.log("Build and root bundle mirroring complete!")
