import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pins the workspace root to this directory. Without it, Next 15 walks up
  // looking for the nearest lockfile and can land on an unrelated ancestor
  // (e.g. a parent user directory), which is harmless but noisy.
  outputFileTracingRoot: __dirname
};

export default nextConfig;
