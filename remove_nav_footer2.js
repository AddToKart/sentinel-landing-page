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
      
      // Remove any Nav component
      const navRegex = /\/\* ─── Nav.*?\*\/[\s\S]*?function Nav\(\) \{[\s\S]*?<\/nav>\s*\);\s*\}/g;
      content = content.replace(navRegex, '');
      
      const backupNavRegex = /function Nav\(\) \{[\s\S]*?<\/nav>\s*\);\s*\}/g;
      content = content.replace(backupNavRegex, '');

      // Remove any <Nav /> usage
      content = content.replace(/<Nav \/>\n?\s*/g, '');

      fs.writeFileSync(fullPath, content);
      console.log('Processed', fullPath);
    }
  }
}

processDir(dir);
