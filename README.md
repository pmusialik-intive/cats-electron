# Cat Facts Notification App

This Electron app keeps you up-to-date with the latest cat facts! Receive notifications directly on your desktop and never miss out on fun and interesting cat facts again.

## Features

- **Regular Updates:** Get notified about new cat facts at your preferred frequency.
- **Customizable Notifications:** Choose how often you'd like to be notified about new cat facts.
- **Interactive UI:** A user-friendly interface lets you easily manage your notification settings and explore cat facts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the latest version of Node.js and npm installed. This project relies on the Node.js runtime, and npm (Node Package Manager) is essential for managing the project's dependencies.

### Installing

1. Clone the repository to your local machine.
2. Install the dependencies:

   ```bash
   npm install
   ```

   **Important for Windows Users:** Before running npm install, first delete the package-lock.json file. If you encounter issues during the installation, also delete the node_modules directory and then run npm install again.

3. Start the application:

   ```bash
   npm start
   ```

## Usage

Once the application is started, navigate through the UI to set your preferences for receiving cat facts notifications. You can adjust fetching and notification frequencies under the settings tab.

Additionally, you can add your favorite cat facts to a favorites list. Simply click the start icon next to a cat fact to save it to your favorites for easy access later.

Make sure to enable system notifications from Electron to receive push notifications!
![image](https://github.com/pmusialik-intive/cats-electron/assets/115072317/58fa0197-5b45-444e-9165-b469aef4d6c2)

## External API Usage

This app leverages the Cat Fact API to fetch interesting facts about cats.

### API Details

- **Base URL**: `https://cat-fact.herokuapp.com/facts`
- **Documentation and Endpoints**:
  - Main Page: [https://cat-fact.herokuapp.com/](https://cat-fact.herokuapp.com/)
  - API Documentation: [https://alexwohlbruck.github.io/cat-facts/docs/endpoints/facts.html](https://alexwohlbruck.github.io/cat-facts/docs/endpoints/facts.html)

### API Availability

The Cat Fact API is a free resource and I cannot guarantee the API's availability or uptime.

## Demo

https://github.com/pmusialik-intive/cats-electron/assets/115072317/d4017d72-0ee3-48d8-b805-6a44c314ae54

## Would do differently if I had more time

- expand testing coverage, particularly focusing on React components,
- remove unnecessary automatically generated code,
- add more validation,
- improve the user interface,
- improve error handling, provide clearer and more informative messages for users,
- consider renaming the autogenerated 'ui' directory for better organization,
- review the code deeply to unify naming conventions for better clarity and consistency,
- consider using react-query or Redux instead of contexts,
- store API url in .env,
- create more testing utils and mocks.
