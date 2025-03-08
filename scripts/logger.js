const fs = require('fs');
const path = require('path');

// Configuration
const LOG_DIR = path.join(__dirname, '..', 'logs');
const ACTIVITY_LOG = path.join(LOG_DIR, 'activity.log');
const CHAT_LOG = path.join(LOG_DIR, 'chat.log');
const CODE_CHANGES_LOG = path.join(LOG_DIR, 'code_changes.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Initialize log files if they don't exist
[ACTIVITY_LOG, CHAT_LOG, CODE_CHANGES_LOG].forEach(logFile => {
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, `# Log initialized on ${new Date().toISOString()}\n\n`);
  }
});

/**
 * Log an activity
 * @param {string} activity - The activity to log
 */
function logActivity(activity) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${activity}\n`;
  fs.appendFileSync(ACTIVITY_LOG, logEntry);
  console.log(`Activity logged: ${activity}`);
}

/**
 * Log a chat message
 * @param {string} sender - Who sent the message
 * @param {string} message - The message content
 */
function logChat(sender, message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${sender}: ${message}\n`;
  fs.appendFileSync(CHAT_LOG, logEntry);
}

/**
 * Log a code change
 * @param {string} file - The file that was changed
 * @param {string} description - Description of the change
 * @param {string} diff - The diff of the change (optional)
 */
function logCodeChange(file, description, diff = '') {
  const timestamp = new Date().toISOString();
  let logEntry = `[${timestamp}] File: ${file}\n`;
  logEntry += `Description: ${description}\n`;
  
  if (diff) {
    logEntry += `Diff:\n${diff}\n`;
  }
  
  logEntry += '-----------------------------------\n';
  fs.appendFileSync(CODE_CHANGES_LOG, logEntry);
}

// Watch for file changes in the project
function watchForChanges(directory) {
  const ignoreDirs = ['node_modules', '.next', 'logs'];
  
  if (ignoreDirs.some(dir => directory.includes(dir))) {
    return;
  }
  
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      logActivity(`Error reading directory ${directory}: ${err.message}`);
      return;
    }
    
    files.forEach(file => {
      const fullPath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        watchForChanges(fullPath);
      } else if (file.isFile() && !file.name.startsWith('.')) {
        fs.watch(fullPath, (eventType, filename) => {
          if (eventType === 'change') {
            logActivity(`File changed: ${fullPath}`);
            logCodeChange(fullPath, 'File was modified');
          }
        });
      }
    });
  });
}

// Export the logging functions
module.exports = {
  logActivity,
  logChat,
  logCodeChange,
  watchForChanges
};

// If this script is run directly, start watching for changes
if (require.main === module) {
  const projectRoot = path.join(__dirname, '..');
  logActivity('Starting file watcher');
  watchForChanges(projectRoot);
  console.log('Logger initialized and watching for changes');
}
