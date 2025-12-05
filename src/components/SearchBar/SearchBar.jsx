import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaLocationArrow } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [recent, setRecent] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecent(saved);
  }, []);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Save last 5 searches
  const saveSearch = (cityName) => {
    let updated = [cityName, ...recent.filter((c) => c !== cityName)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

  // Manual city search
  const handleSearch = () => {
    if (!city.trim()) return;
    onSearch(city.trim());
    saveSearch(city.trim());
    setCity("");
    setShowDropdown(false);
  };

  // Detect current location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onSearch({ lat: latitude, lon: longitude });
        setShowDropdown(false);
      },
      () => {
        alert("Unable to detect location. Check permissions.");
      }
    );
  };

  return (
    <div className="search-container" ref={dropdownRef}>
      <div className="search-box d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />

        {/* Search city button */}
        <button className="btn btn-primary ms-2" onClick={handleSearch}>
          <FaSearch />
        </button>

        {/* Detect location button */}
        <button
          className="btn btn-success ms-2"
          onClick={detectLocation}
          title="Use Current Location"
        >
          <FaLocationArrow />
        </button>
      </div>

      {/* Recent search dropdown */}
      {showDropdown && recent.length > 0 && (
        <div className="recent-dropdown shadow mt-2">
          <p className="recent-title">Recent Searches</p>
          {recent.map((r, i) => (
            <div
              key={i}
              className="recent-item d-flex justify-content-between align-items-center"
            >
              <span
                onClick={() => {
                  onSearch(r);
                  setShowDropdown(false);
                }}
              >
                {r}
              </span>

              <span
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const updated = recent.filter((c) => c !== r);
                  setRecent(updated);
                  localStorage.setItem(
                    "recentCities",
                    JSON.stringify(updated)
                  );
                }}
                style={{ cursor: "pointer", color: "red" }}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
