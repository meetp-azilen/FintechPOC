# Fintech POC App

A simple React Native proof-of-concept application demonstrating basic fintech functionalities like transaction tracking and budget management.

## Description

This application allows users to:
*   View a list of recent financial transactions fetched from a simulated API.
*   Set a monthly spending budget.
*   See a visual representation of their spending relative to the set budget, indicating whether they are under or over budget.

## Setup Instructions

1.  **Prerequisites**:
    *   Node.js (LTS version recommended)
    *   npm or Yarn
    *   Expo CLI: `npm install -g expo-cli`
    *   Git

2.  **Clone the Repository**:
    ```bash
    git clone https://github.com/meetp-azilen/FintechPOC.git
    cd FintechPOC
    ```

3.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Project

1.  **Start the Development Server**:
    ```bash
    npx expo start
    # or
    yarn start
    ```
2.  Follow the instructions in the terminal to open the app on:
    *   An iOS simulator (requires Xcode)
    *   An Android emulator (requires Android Studio)
    *   A physical device using the Expo Go app.

## Running Tests

Execute the following command to run the unit tests:
```bash
npm test
# or
yarn test
```

## Notes

*   This application currently uses **mocked data** and does not connect to a real backend API.
*   Budget persistence is simulated in the mock API layer.
*   **Offline support is not yet implemented**. The app assumes network connectivity for fetching data (even though it's mocked).