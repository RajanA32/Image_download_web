import React, { useState } from "react";

const SearchBar = ({ setSelectedImage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    const API_KEY = "30635307-197cd5b289ec2a1731d15bba1"; // Pixabay API key
    const response = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        searchTerm
      )}&image_type=photo&per_page=8`
    );
    const data = await response.json();
    setImages(data.hits);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => setSelectedImage(image.largeImageURL)}
            />
            <button onClick={() => setSelectedImage(image.largeImageURL)}>
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
