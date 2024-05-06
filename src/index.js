import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from "./contexts/FiltersContext";
import { ArtistContextProvider } from "./contexts/ArtistContext";
import { ReleaseProvider } from "./contexts/ReleaseContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { CollectionsContextProvider } from "./contexts/CollectionsContext";
import { PlayedTracksProvider } from "./contexts/PlayedTracksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <CollectionsContextProvider>
        <FiltersProvider>
          <ArtistContextProvider>
            <ReleaseProvider>
              <PlayedTracksProvider>
                <App />
              </PlayedTracksProvider>
            </ReleaseProvider>
          </ArtistContextProvider>
        </FiltersProvider>
      </CollectionsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
