# Task Manager App

## Overview

Task Manager is a mobile application built with React Native that helps users manage their daily tasks efficiently. The app allows users to create, edit, and delete tasks, set priorities with different flags, and organize tasks with deadlines.

## Features

- **Task Management**: Create, edit, and delete tasks
- **Priority Flags**: Mark tasks as "Urgent" or "Optional"
- **Deadlines**: Set date and time limits for tasks
- **Swipe Actions**: Swipe left to edit and right to delete tasks
- **Search Functionality**: Filter tasks with the search bar

## Tech Stack

- React Native
- Expo
- React Context API for state management
- React Native Gesture Handler for swipeable actions
- AsyncStorage for local data persistence
- React Native Community DateTimePicker for date and time selection

## Installation

```bash
# Clone the repository
git clone [https://github.com/Jose-Alison-da-Silva/Todo-List-React-Native.git]

# Navigate to the project directory
cd Todo-List-React-Native

# Install dependencies
npm install

# Start the project
npx expo start
```

## Usage

### Creating a Task

1. Click the "+" button to open the task creation modal
2. Fill in the task title and description
3. Set a deadline date and time
4. Select a priority flag (Urgent or Optional)
5. Click the checkmark to save

### Managing Tasks

- **Edit**: Swipe left on a task to enter edit mode
- **Delete**: Swipe right on a task to delete it
- **Search**: Use the search bar at the top to filter tasks

## Future Improvements

- User authentication
- Cloud synchronization
- Categories and tags for better organization
- Recurring tasks
- Notifications and reminders

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
