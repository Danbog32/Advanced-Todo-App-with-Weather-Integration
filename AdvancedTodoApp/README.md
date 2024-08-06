Advanced Todo App with Weather Integration

This is a React Native application built with Expo that features a simple Todo app with weather integration. The app includes user authentication, task management, and weather information for tasks based only in Tallinn, Estonia. (If you change it will still show tallinn, as it requires citycode, and it takes much more time to make it get it automatically, so right now it just dummy)

## Features

- **User Authentication**: Supports Admin and User roles with hardcoded credentials.
- **Task Management**:
  - Admin can add, edit, delete, and mark tasks as completed.
  - User can view tasks and mark them as completed.
  - Tasks are sorted by day.
  - Option to show/hide completed tasks.
- **Weather Integration**: Displays current weather information for Tallinn, Estonia.
- **Responsive UI**: Works well on both mobile and web.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (v18 or later)
- Expo CLI
- An emulator (Android Studio or Xcode) or a physical device with Expo Go installed.

### Installation

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd AdvancedTodoApp

   ```

2. **Install Dependencies**
   npm install

3. **Env tocen I store in the .env file(like constant), no need to use your own**

4. **You can run it as usual**
   npm start
   w(for web page)
   a(for android in the terminal to open the Android emulator or scan the QR code with Expo Go)
   i(for IOS in the terminal to open the iOS simulator or scan the QR code with Expo Go)

### Usage

## Login Credentials:

Admin: username: admin, password: admin123
User: username: user, password: user123
Navigating the App:

Login to access the task list.
Admin can add, edit, and delete tasks.
Users can only view tasks.

### Technologies Used

React Native with Expo
React Navigation for navigation
Axios for API requests
React Native Paper for UI components
TypeScript for static type checking
Day.js for date manipulation
