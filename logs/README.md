# Password Generator Project Logs

This directory contains logs of development activities, chat history, and code changes for the Password Generator project.

## Log Types

1. **activity.log** - Records general development activities and events
2. **chat_history.log** - Records conversations about the project
3. **code_changes.log** - Records specific code changes with descriptions
4. **current_session.log** - A comprehensive log of the current development session

## How to Use the Logging System

### Creating a Session Log

To create a comprehensive log of the current session:

```bash
npm run log:create
```

This will generate a detailed log including:
- System information
- Recent Git commits
- Project structure
- Chat history summary
- Code changes summary

### Watching for Changes

To automatically log file changes as they happen:

```bash
npm run log:watch
```

This will start a file watcher that monitors the project directory and logs any file changes to the activity log and code changes log.

## Log Format

All logs include timestamps in ISO format for easy tracking and sorting. The logs are designed to be human-readable and can be viewed in any text editor.

## Maintenance

Log files may grow large over time. Consider archiving or cleaning up old logs periodically to maintain performance.

---

*Last updated: March 8, 2025*
