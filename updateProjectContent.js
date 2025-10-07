#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// This script helps you update project content
// Usage: node updateProjectContent.js [project-id] [content-file]

const projectId = process.argv[2];
const contentFile = process.argv[3];

if (!projectId || !contentFile) {
  console.log('Usage: node updateProjectContent.js [project-id] [content-file]');
  console.log('');
  console.log('Available projects:');
  console.log('- fede-casabona');
  console.log('- ninjas');
  console.log('- collective');
  console.log('- travel-assistant');
  console.log('- ai-brain');
  console.log('- sportify');
  console.log('- marine-chartering');
  console.log('- 11fs');
  console.log('- bytes');
  console.log('- greed');
  console.log('- enter');
  console.log('- observer');
  console.log('- casa');
  console.log('- magic-places');
  console.log('');
  console.log('Example: node updateProjectContent.js ninjas content/projects/ninjas.txt');
  process.exit(1);
}

// Read the content file
const contentPath = path.resolve(contentFile);
if (!fs.existsSync(contentPath)) {
  console.error(`❌ Content file not found: ${contentPath}`);
  process.exit(1);
}

const newContent = fs.readFileSync(contentPath, 'utf8');

// Read the current project content JSON
const projectContentPath = path.join(__dirname, 'data', 'projectContent.json');
const projectContent = JSON.parse(fs.readFileSync(projectContentPath, 'utf8'));

// Update the content
projectContent[projectId] = newContent;

// Write back to JSON file
fs.writeFileSync(projectContentPath, JSON.stringify(projectContent, null, 2), 'utf8');

console.log(`✅ Successfully updated content for project: ${projectId}`);
console.log(`📁 Content loaded from: ${contentPath}`);
console.log('');
console.log('💡 To see the changes, restart your development server or refresh the page.');
