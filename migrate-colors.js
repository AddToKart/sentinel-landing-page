const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
      results.push(filePath);
    }
  }
  return results;
}

const files = walk("src");

const replacements = [
  { regex: /bg-white\/\[0\.02\]/g, replacement: "bg-bg2" },
  { regex: /bg-white\/\[0\.03\]/g, replacement: "bg-bg3" },
  { regex: /bg-white\/\[0\.04\]/g, replacement: "bg-border-dim" },
  { regex: /bg-white\/\[0\.05\]/g, replacement: "bg-border-dim" },
  { regex: /bg-white\/\[0\.06\]/g, replacement: "bg-border-dim2" },
  { regex: /border-white\/\[0\.03\]/g, replacement: "border-border-dim" },
  { regex: /border-white\/\[0\.04\]/g, replacement: "border-border-dim" },
  { regex: /border-white\/\[0\.05\]/g, replacement: "border-border-dim" },
  { regex: /border-white\/\[0\.06\]/g, replacement: "border-border-dim" },
  { regex: /border-white\/\[0\.08\]/g, replacement: "border-border-dim2" },
  { regex: /border-white\/\[0\.1\]/g, replacement: "border-border-dim2" },
  { regex: /border-white\/\[0\.12\]/g, replacement: "border-border-dim2" },
  { regex: /border-white\/5/g, replacement: "border-border-dim" },
  { regex: /border-white\/10/g, replacement: "border-border-dim2" },
  { regex: /border-white\/15/g, replacement: "border-border-dim2" },
  { regex: /border-white\/20/g, replacement: "border-border-dim2" },
  { regex: /text-white\/10/g, replacement: "text-muted-text" },
  { regex: /text-white\/\[0\.03\]/g, replacement: "text-muted-text/30" },
  { regex: /text-white\/\[0\.06\]/g, replacement: "text-muted-text/50" },
  { regex: /bg-black\/\[0\.02\]/g, replacement: "bg-border-dim" },
  { regex: /bg-black\/\[0\.03\]/g, replacement: "bg-border-dim2" },
  { regex: /bg-black\/10/g, replacement: "bg-border-dim2" },
  { regex: /dark:bg-white\/\[0\.03\]/g, replacement: "" },
  { regex: /dark:hover:bg-white\/\[0\.03\]/g, replacement: "" },
  { regex: /dark:scrollbar-thumb-white\/10/g, replacement: "" },
  { regex: /text-\[\#fbbf24\]/g, replacement: "text-amber-400" },
  { regex: /text-\[\#a78bfa\]/g, replacement: "text-purple-400" },
  { regex: /text-\[\#f97316\]/g, replacement: "text-orange-500" },
  { regex: /text-\[\#60a5fa\]/g, replacement: "text-blue-400" },
  { regex: /bg-\[\#f87171\]\/80/g, replacement: "bg-red-400/80" },
  { regex: /bg-\[\#fbbf24\]\/80/g, replacement: "bg-amber-400/80" },
  { regex: /bg-\[\#4ade80\]\/80/g, replacement: "bg-green-400/80" }
];

let changedCount = 0;

for (const file of files) {
  const originalContent = fs.readFileSync(file, "utf8");
  let content = originalContent;
  
  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, replacement);
  }
  
  // Clean up any double spaces created by empty replacements
  content = content.replace(/\s\s+/g, (match) => {
    // Only collapse spaces inside class names (not indents at start of line)
    if (match.indexOf('\n') === -1) return ' ';
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, "utf8");
    changedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`\nUpdated ${changedCount} files.`);
