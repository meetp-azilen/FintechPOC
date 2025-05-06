# Fintech POC Application

A simple React Native proof-of-concept application demonstrating basic fintech functionalities like transaction tracking and budget management.

## Description

This application allows users to:
*   View a list of recent financial transactions fetched from a simulated API.
*   Set a monthly spending budget.
*   See a visual representation of their spending relative to the set budget, indicating whether they are under or over budget.

## Project Structure

```
/
├── src/         # Frontend React Native application code
│   └── assets/
│   └── modules/
│   └── navigation/
│   └── shared/
│   └── __tests__/
├── server/         # Backend Node.js API server
│   └── app.js      # Main server file
│   └── package.json
└── README.md
```

## Setup Instructions

### 1. Common Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn
*   Git

### 2. Clone the Repository

```bash
git clone https://github.com/meetp-azilen/FintechPOC.git
cd FintechPOC
```

### 3. Mobile App (React Native Client) Setup

**Prerequisites for Mobile App:**
    *   Expo CLI: `npm install -g expo-cli`

**Install Dependencies for Mobile App:**
Navigate to the client directory (if your React Native app is in a subdirectory like `client/` or `mobile/` - adjust if it's in the root). If your React Native app is in the project root, you can skip the `cd client` step.

Assuming your client app is in the root of `FintechPOC` as per the original README:
    ```bash
    npm install
    # or
    yarn install
    ```

### 4. Backend Server (Node.js) Setup

**Navigate to the server directory:**
(Assuming you are in the project root: `/FintechPOC/`)
```bash
cd server
```

**Install dependencies for the server:**
Install the server dependencies
```bash
npm install
```

## Running the Project

### 1. Start the Backend Server

Navigate to the server directory and start the server:
```bash
cd server
node app.js
```
By default, the server will start on `http://localhost:5000`. You should see a message in your console like:
`Transaction API server listening at http://0.0.0.0:5000`

The API endpoint for transactions will be available at `http://localhost:5000/api/transactions`.

### 2. Start the Mobile App (React Native Client)

Ensure you are in the project root directory (`/Users/meet.parabiya/Fintech_POC/FintechPOC/`) or your client app's root directory.
```bash
npx expo start
# or
yarn start
```
Follow the instructions in the terminal to open the app on:
*   An iOS simulator (requires Xcode)
*   An Android emulator (requires Android Studio)
*   A physical device using the Expo Go app.

## Running Tests

Execute the following command (typically from the client app's root directory or project root if tests are configured there):
    ```bash
npm test
# or
yarn test
```

## Notes
*   **Offline support is not yet implemented**. The app assumes network connectivity for fetching data (even though it's mocked).