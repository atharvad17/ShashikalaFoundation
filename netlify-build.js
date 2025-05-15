#!/usr/bin/env node

/**
 * This script is used to build the client-side only for Netlify deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Ensure dist folder exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

if (!fs.existsSync('dist/client')) {
  fs.mkdirSync('dist/client');
}

// Run vite build with specific output directory
console.log('Building client for Netlify...');
execSync('npx vite build --outDir ../dist/client', { 
  stdio: 'inherit',
  cwd: './client'
});

// Create _redirects file for SPA routing
fs.writeFileSync('dist/client/_redirects', '/* /index.html 200');

console.log('Client build complete! Files are in dist/client');