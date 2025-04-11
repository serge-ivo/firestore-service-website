# Firestore Client Test Suite Website

This project serves as a demonstration and test suite website for the [`@serge-ivo/firestore-client`](https://github.com/your-repo/firestore-client) library (v1.5.0). It uses React, Vite, TypeScript, and Firebase to showcase the client's functionality.

## Features

- Demonstrates usage of `@serge-ivo/firestore-client` for Firestore operations.
- Built with Vite for fast development and builds.
- Written in TypeScript for type safety.
- Uses React for the user interface.
- Integrates with Firebase Firestore.
- Includes basic styling with Tailwind CSS (inferred).

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- A Firebase project set up with Firestore enabled.

## Setup

1.  **Clone the repository (if you haven't already):**

    ```bash
    git clone <your-repository-url>
    cd firestore-service-website
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Firebase Configuration:**
    Create a `.env` file in the root directory (`firestore-service-website/.env`) and add your Firebase project configuration keys:
    ```dotenv
    VITE_FIREBASE_API_KEY=YOUR_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    VITE_FIREBASE_APP_ID=YOUR_APP_ID
    VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID # Optional
    ```
    Replace `YOUR_...` placeholders with your actual Firebase project credentials. You can find these in your Firebase project settings.

## Available Scripts

- **`npm run dev`**: Runs the app in development mode using Vite. Open [http://localhost:5173](http://localhost:5173) (or the port specified) to view it in the browser. The page will reload if you make edits.

- **`npm run build`**: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

- **`npm run lint`**: Lints the codebase using ESLint based on the configuration in `eslint.config.js`.

- **`npm run preview`**: Serves the production build locally for previewing.

## Basic Usage (`@serge-ivo/firestore-client`)

The core of the client library revolves around instantiating the `FirestoreService` with your initialized Firebase `db` instance.

```typescript
// Example: src/firebase.ts (Simplified)
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { FirestoreService } from "@serge-ivo/firestore-client";

// Firebase Config (loaded from .env)
const firebaseConfig = {
  /* ... */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Create a FirestoreService instance
const firestoreService = new FirestoreService(db);

// Now use the instance for operations
async function exampleFetch(docId: string) {
  try {
    // Assuming MyDataType is the interface for your document data
    const data = await firestoreService.getDocument<MyDataType>(
      `myCollection/${docId}`
    );
    if (data) {
      console.log("Fetched data:", data);
    } else {
      console.log("Document not found.");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// See components like src/components/FirestoreTest.tsx for more detailed usage.
```
