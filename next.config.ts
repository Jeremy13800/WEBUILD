import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Le dossier utilisateur (racine du repo git englobant) contient un autre
  // package-lock.json, ce qui fait que Next.js déduit mal la racine du
  // workspace. On la fixe explicitement à ce projet.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
