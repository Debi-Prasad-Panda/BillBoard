const fs = require('fs');

const path = 'src/app/marketplace/MarketplaceClient.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the layout merge conflict
const resolved = content
  .replace(/<<<<<<< HEAD[\s\S]*?=======\s*<div className=\"flex-1 flex flex-col lg:flex-row w-full h-\[calc\(100vh-64px\)\] min-h-\[600px\] relative mt-16 overflow-hidden\">/, '<div className=\"flex-1 flex flex-col lg:flex-row w-full h-[calc(100vh-64px)] min-h-[600px] relative mt-16 items-stretch overflow-hidden\">')
  .replace(/<section className=\"hidden lg:flex flex-\[0\.6\] h-full relative border-r border-outline-variant\/30 bg-surface-container-high\">/, '<section className=\"flex-none w-full h-[400px] lg:w-[60%] lg:h-auto relative border-b lg:border-b-0 lg:border-r border-outline-variant/30 z-0 bg-surface-container-high\">')
  .replace(/<<<<<<< HEAD[\s\S]*?=======\s*/g, '') // remove any other remaining HEAD to ======= blocks if any
  .replace(/>>>>>>> cc92fe98c672ce1b5abc9c6bf143add62d35ff04/g, '');

fs.writeFileSync(path, resolved);
console.log('Conflict fixed');
