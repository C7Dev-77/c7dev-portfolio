const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const nextFilesDir = path.join(rootDir, 'Nextjs-files');

console.log('Organizing root repository...');

// 1. Remove nested .git directory in Nextjs-files if it exists
const nestedGitDir = path.join(nextFilesDir, '.git');
if (fs.existsSync(nestedGitDir)) {
    console.log('Removing nested .git folder...');
    fs.rmSync(nestedGitDir, { recursive: true, force: true });
}

// 2. Copy/move all items from Nextjs-files to rootDir
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('Copying files from Nextjs-files to root...');
const items = fs.readdirSync(nextFilesDir);
for (const item of items) {
    const srcPath = path.join(nextFilesDir, item);
    const destPath = path.join(rootDir, item);
    console.log(`Copying ${item} -> root`);
    copyRecursiveSync(srcPath, destPath);
}

console.log('Organize script completed successfully.');
