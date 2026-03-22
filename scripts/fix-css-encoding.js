const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/app/globals.css');

try {
  const content = fs.readFileSync(cssPath, 'utf8');

  // Remove any non-UTF-8 safe characters that Turbopack can't handle
  // Keep all standard CSS characters, spaces, newlines, tabs
  const cleaned = content
    .replace(/[\u0080-\u009F]/g, '')   // Remove C1 control chars
    .replace(/\uFFFD/g, '')             // Remove replacement chars
    .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\uD7FF\uE000-\uFFFD]/g, '');

  if (content !== cleaned) {
    fs.writeFileSync(cssPath, cleaned, 'utf8');
    console.log('✅ globals.css cleaned — removed invalid characters');
  } else {
    console.log('✅ globals.css is clean');
  }
} catch (err) {
  console.error('Error cleaning CSS:', err);
  process.exit(1);
}
