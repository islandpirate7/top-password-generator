const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const LOG_DIR = path.join(__dirname, '..', 'logs');
const CURRENT_SESSION_LOG = path.join(LOG_DIR, 'current_session.log');
const CHAT_HISTORY_LOG = path.join(LOG_DIR, 'chat_history.log');
const CODE_CHANGES_LOG = path.join(LOG_DIR, 'code_changes.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Get current timestamp
const timestamp = new Date().toISOString();

// Create the session log header
let sessionLog = `# Password Generator Project - Session Log\n`;
sessionLog += `# Generated: ${timestamp}\n\n`;

// Add system information
sessionLog += `## System Information\n\n`;
try {
  const nodeVersion = execSync('node --version').toString().trim();
  const npmVersion = execSync('npm --version').toString().trim();
  
  sessionLog += `- Node.js Version: ${nodeVersion}\n`;
  sessionLog += `- NPM Version: ${npmVersion}\n`;
  sessionLog += `- Operating System: ${process.platform}\n`;
  sessionLog += `- Timestamp: ${timestamp}\n\n`;
} catch (error) {
  sessionLog += `Error getting system information: ${error.message}\n\n`;
}

// Add git commit history
sessionLog += `## Recent Git Commits\n\n`;
try {
  const gitLog = execSync('git log --pretty=format:"%h - %an, %ar : %s" -n 10').toString();
  sessionLog += gitLog + '\n\n';
} catch (error) {
  sessionLog += `Error getting git history: ${error.message}\n\n`;
}

// Add recent file changes
sessionLog += `## Recent File Changes\n\n`;
try {
  const recentChanges = execSync('git diff --name-status HEAD~5 HEAD').toString();
  sessionLog += '```\n' + recentChanges + '\n```\n\n';
} catch (error) {
  sessionLog += `Error getting recent changes: ${error.message}\n\n`;
}

// Add current project structure
sessionLog += `## Project Structure\n\n`;
try {
  const projectStructure = execSync('dir /s /b /a-d').toString().replace(/\\/g, '/');
  const files = projectStructure.split('\n')
    .filter(file => !file.includes('node_modules') && !file.includes('.next') && file.trim() !== '')
    .map(file => file.replace(process.cwd().replace(/\\/g, '/'), ''));
  
  sessionLog += '```\n' + files.join('\n') + '\n```\n\n';
} catch (error) {
  sessionLog += `Error getting project structure: ${error.message}\n\n`;
}

// Add chat history (placeholder - would need actual chat history)
sessionLog += `## Chat History\n\n`;
sessionLog += `This is a record of our conversation about the Password Generator project.\n`;
sessionLog += `We've been working on fixing mobile UI width issues and Firefox-specific styling problems.\n\n`;
sessionLog += `Recent improvements include:\n`;
sessionLog += `- Fixed title text color in Firefox\n`;
sessionLog += `- Improved tab highlighting consistency\n`;
sessionLog += `- Enhanced mobile layout and responsiveness\n`;
sessionLog += `- Ensured consistent widths across all sections\n\n`;

// Add code changes summary
sessionLog += `## Code Changes Summary\n\n`;
sessionLog += `### Recent Changes:\n\n`;
sessionLog += `1. Modified password-generator.tsx:\n`;
sessionLog += `   - Centered the logo and title\n`;
sessionLog += `   - Fixed title text color for cross-browser compatibility\n\n`;
sessionLog += `2. Enhanced globals.css:\n`;
sessionLog += `   - Added Firefox-specific fixes\n`;
sessionLog += `   - Improved mobile responsiveness\n`;
sessionLog += `   - Fixed tab highlighting consistency\n\n`;
sessionLog += `3. Restructured pattern-section.tsx and mnemonic-section.tsx:\n`;
sessionLog += `   - Ensured consistent widths across components\n`;
sessionLog += `   - Improved layout for mobile devices\n\n`;

// Write the session log
fs.writeFileSync(CURRENT_SESSION_LOG, sessionLog);
console.log(`Session log created at: ${CURRENT_SESSION_LOG}`);

// Create a simple chat history log
const chatHistory = `# Password Generator Project - Chat History\n\n`;
fs.writeFileSync(CHAT_HISTORY_LOG, chatHistory);
console.log(`Chat history log created at: ${CHAT_HISTORY_LOG}`);

// Create a code changes log
const codeChanges = `# Password Generator Project - Code Changes Log\n\n`;
fs.writeFileSync(CODE_CHANGES_LOG, codeChanges);
console.log(`Code changes log created at: ${CODE_CHANGES_LOG}`);
