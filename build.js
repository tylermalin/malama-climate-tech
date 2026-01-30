const fs = require('fs');

// Read the template file
const template = fs.readFileSync('table.html', 'utf8');

// Replace the placeholder with the environment variable
const apiKey = process.env.GEMINI_API_KEY || '';
const output = template.replace(
  'const DEFAULT_API_KEY = "";',
  `const DEFAULT_API_KEY = "${apiKey}";`
);

// Write to the output directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

fs.writeFileSync('dist/index.html', output);
console.log('✓ Wrote dist/index.html');

// Copy logo
if (fs.existsSync('malama_logo.png')) {
  fs.copyFileSync('malama_logo.png', 'dist/malama_logo.png');
  console.log('✓ Copied malama_logo.png to dist/');
} else {
  console.error('✗ ERROR: malama_logo.png not found in source!');
}

// Copy hero background
if (fs.existsSync('hero_bg.png')) {
  fs.copyFileSync('hero_bg.png', 'dist/hero_bg.png');
  console.log('✓ Copied hero_bg.png to dist/');
} else {
  console.error('✗ ERROR: hero_bg.png not found in source!');
}

console.log('Build complete! API key injected.');
