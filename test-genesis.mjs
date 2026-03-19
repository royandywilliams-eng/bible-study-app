import fs from 'fs';

const content = fs.readFileSync('src/data/bibleData.ts', 'utf8');

// Find Genesis verses in OT section
const genesisOT = content.match(/\{ book: 'Genesis'[^}]*\}/g) || [];
console.log('Genesis verses found: ' + genesisOT.length);
genesisOT.slice(0, 3).forEach(v => console.log('  ' + v.substring(0, 100)));

// Find where NT_VERSE_MAPPINGS starts
const ntStart = content.indexOf('const NT_VERSE_MAPPINGS');
const otSection = content.substring(0, ntStart);
const ntSection = content.substring(ntStart);

console.log('\n---\n');
console.log('Genesis in OT section:', otSection.includes("{ book: 'Genesis'"));
console.log('Genesis in NT section:', ntSection.includes("{ book: 'Genesis'"));
console.log('Matthew in NT section:', ntSection.includes("{ book: 'Matthew'"));
console.log('Matthew in OT section:', otSection.includes("{ book: 'Matthew'"));
