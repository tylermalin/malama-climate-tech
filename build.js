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
fs.copyFileSync('malama_logo.png', 'dist/malama_logo.png');

console.log('Build complete! API key injected.');
