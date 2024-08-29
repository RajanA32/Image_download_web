import React, { useState } from "react";
import SearchBar from "./component/SearchBar";
import AddCaptionPage from "./component/AddCaptionPage";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <h1>Image Search and Edit App</h1>
      {!selectedImage ? (
        <SearchBar setSelectedImage={setSelectedImage} />
      ) : (
        <AddCaptionPage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </div>
  );
}

export default App;
