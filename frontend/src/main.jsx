import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { clerkPublishableKey } from "./utils/constaints.js";
import AppProvider from "./contexts/AppProvider.jsx";

if (!clerkPublishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">
    <AppProvider>
      <App />
    </AppProvider>
  </ClerkProvider>
);
