const fs = require('fs');
const path = require('path');

const dir = 'src/app';

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove Nav component function block
      const navRegex = /\/\* ─── Scroll-aware Nav.*?\*\/[\s\S]*?function Nav\(\) \{[\s\S]*?<\/motion\.nav>\s*\);\s*\}/g;
      content = content.replace(navRegex, '');
      
      const backupNavRegex = /function Nav\(\) \{[\s\S]*?<\/motion\.nav>\s*\);\s*\}/g;
      content = content.replace(backupNavRegex, '');

      // Remove <Nav /> component
      content = content.replace(/<Nav \/>\n?\s*/g, '');

      // Remove Footer block
      const footerRegex = /\/\* ─── FOOTER.*?\*\/[\s\S]*?<footer[\s\S]*?<\/footer>/g;
      content = content.replace(footerRegex, '');

      const altFooterRegex = /<footer[\s\S]*?<\/footer>/g;
      content = content.replace(altFooterRegex, '');

      fs.writeFileSync(fullPath, content);
      console.log('Processed', fullPath);
    }
  }
}

processDir(dir);
