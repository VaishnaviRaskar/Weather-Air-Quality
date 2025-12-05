import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [recent, setRecent] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecent(saved);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const saveSearch = (cityName) => {
    let updated = [cityName, ...recent.filter((c) => c !== cityName)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

  const handleSearch = () => {
    if (!city.trim()) return;
    onSearch(city.trim());
    saveSearch(city.trim());
    setCity("");
    setShowDropdown(false);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onSearch({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setShowDropdown(false);
      },
      () => alert("Unable to fetch location")
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
        <button className="btn btn-primary ms-2" onClick={handleSearch}><FaSearch /></button>
      </div>

      {showDropdown && recent.length > 0 && (
        <div className="recent-dropdown shadow mt-2">
          <p className="recent-title">Recent Searches</p>
          {recent.map((r, i) => (
            <div key={i} className="recent-item d-flex justify-content-between align-items-center">
              <span onClick={() => { onSearch(r); setShowDropdown(false); }}>{r}</span>
              <span
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const updated = recent.filter((c) => c !== r);
                  setRecent(updated);
                  localStorage.setItem("recentCities", JSON.stringify(updated));
                }}
                style={{ cursor: "pointer", color: "red" }}
              >×</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
