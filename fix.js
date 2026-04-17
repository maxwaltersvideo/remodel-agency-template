const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix backtick-single-quote mismatch like `Close menu'
    content = content.replace(/\`([^\`\']*)\'/g, (match, p1) => {
        // Only if it doesn't contain a template variable
        if (p1.includes('${')) return match;
        return `'${p1}'`;
    });
    
    // Fix single-quote-backtick mismatch like 'hidden`
    content = content.replace(/\'([^\`\']*)`/g, (match, p1) => {
        if (p1.includes('${')) return match;
        return `'${p1}'`;
    });

    fs.writeFileSync(filePath, content);
    console.log("Fixed: " + filePath);
  } catch (e) {
    console.error(e);
  }
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(walk(file));
            }
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(f => replaceInFile(f));
