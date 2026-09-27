import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Userdashboard.css";

// Fix Leaflet marker icons when using Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Demo status data.
// Later this will come from your backend + ML model.
const STATUS_TYPES = [
  {
    status: "Available",
    cash: "High",
    color: "green",
    description: "Cash is currently available",
  },
  {
    status: "Low Cash",
    cash: "Low",
    color: "orange",
    description: "Cash availability is running low",
  },
  {
    status: "Unavailable",
    cash: "Empty",
    color: "red",
    description: "Cash is currently unavailable",
  },
  {
    status: "Operational",
    cash: "Unknown",
    color: "blue",
    description: "ATM is operational",
  },
];

// Change map center when coordinates change
function MapCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, {
        duration: 1.2,
      });
    }
  }, [position, map]);

  return null;
}

function UserDashboard() {
  const [userLocation, setUserLocation] = useState(null);

  const [searchLocation, setSearchLocation] = useState("");

  const [mapCenter, setMapCenter] = useState([
    15.8281,
    78.0373
  ]); // Hyderabad fallback

  const [atms, setAtms] = useState([]);

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const [error, setError] = useState("");

  const [radius, setRadius] = useState(3000);

  const [selectedATM, setSelectedATM] = useState(null);

  const [searchPerformed, setSearchPerformed] = useState(false);

  const storedUser = localStorage.getItem("user");

let loggedInUser = null;

try {
  loggedInUser = storedUser
    ? JSON.parse(storedUser)
    : null;
} catch {
  loggedInUser = null;
}

const userName = loggedInUser?.name || "User";

  // ---------------------------------------
  // Get user's current location
  // ---------------------------------------
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const currentLocation = [latitude, longitude];

        setUserLocation(currentLocation);
        setMapCenter(currentLocation);

        await fetchATMs(latitude, longitude, radius);

        setLocationLoading(false);
      },
      (err) => {
        console.error(err);

        setLocationLoading(false);

        setError(
          "Unable to access your location. Please allow location permission or search for a city."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ---------------------------------------
  // Search location using OpenStreetMap
  // Nominatim geocoding
  // ---------------------------------------
  const searchPlace = async () => {
    if (!searchLocation.trim()) {
      setError("Please enter a location.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchLocation
        )}&limit=1`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Location search failed.");
      }

      const data = await response.json();

      if (!data.length) {
        setError("Location not found. Try another city or area.");
        setLoading(false);
        return;
      }

      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);

      const newLocation = [latitude, longitude];

      setMapCenter(newLocation);

      await fetchATMs(latitude, longitude, radius);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Unable to search this location. Please try again.");
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Fetch nearby ATMs from OpenStreetMap
  // Overpass API
  // ---------------------------------------
  const fetchATMs = async (latitude, longitude, selectedRadius) => {
    try {
      setLoading(true);
      setError("");

      const query = `
        [out:json];
        (
          node["amenity"="atm"](around:${selectedRadius},${latitude},${longitude});
          node["amenity"="bank"]["atm"="yes"](around:${selectedRadius},${latitude},${longitude});
        );
        out body;
      `;

      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("ATM search failed.");
      }

      const data = await response.json();

      const atmResults = data.elements.map((atm, index) => {
        const demoStatus = STATUS_TYPES[index % STATUS_TYPES.length];

        const distance = calculateDistance(
          latitude,
          longitude,
          atm.lat,
          atm.lon
        );

        return {
          id: atm.id,
          latitude: atm.lat,
          longitude: atm.lon,

          name:
            atm.tags?.name ||
            atm.tags?.operator ||
            `ATM ${index + 1}`,

          operator: atm.tags?.operator || "ATM Service",

          address:
            atm.tags?.["addr:street"] ||
            atm.tags?.["addr:full"] ||
            "Address information unavailable",

          distance,

          status: demoStatus.status,
          cash: demoStatus.cash,
          color: demoStatus.color,
          description: demoStatus.description,

          lastUpdated: "Demo data",
        };
      });

      atmResults.sort((a, b) => a.distance - b.distance);

      setAtms(atmResults);
      setSearchPerformed(true);

      if (atmResults.length === 0) {
        setError(
          "No ATMs were found in this area. Try increasing the search radius."
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load nearby ATMs. The OpenStreetMap service may be temporarily unavailable."
      );

      setAtms([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Calculate distance between coordinates
  // ---------------------------------------
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // ---------------------------------------
  // Search again when radius changes
  // ---------------------------------------
  const handleRadiusChange = async (event) => {
    const newRadius = Number(event.target.value);

    setRadius(newRadius);

    if (userLocation) {
      await fetchATMs(
        userLocation[0],
        userLocation[1],
        newRadius
      );
    } else {
      await fetchATMs(
        mapCenter[0],
        mapCenter[1],
        newRadius
      );
    }
  };

  // ---------------------------------------
  // Select ATM
  // ---------------------------------------
  const handleATMSelect = (atm) => {
    setSelectedATM(atm);

    setMapCenter([atm.latitude, atm.longitude]);
  };

  // ---------------------------------------
  // Status counts
  // ---------------------------------------
  const statusCounts = useMemo(() => {
    return {
      available: atms.filter(
        (atm) => atm.status === "Available"
      ).length,

      lowCash: atms.filter(
        (atm) => atm.status === "Low Cash"
      ).length,

      unavailable: atms.filter(
        (atm) => atm.status === "Unavailable"
      ).length,

      operational: atms.filter(
        (atm) => atm.status === "Operational"
      ).length,
    };
  }, [atms]);

  return (
    <div className="user-dashboard">

      
      {/* =====================================
          MAIN DASHBOARD
      ====================================== */}
      <main className="dashboard-main">

        <div className="dashboard-container">

          {/* Header */}
          <div className="dashboard-heading">

            <div>
              <span className="dashboard-eyebrow">
                USER DASHBOARD
              </span>

              <h1>
                Welcome , {userName} 👋
              </h1>

            <h2 className="dashboard-main-title">
                Find an ATM near you
            </h2>


              <p>
                Find nearby ATMs and check their current cash
                availability before you visit.
              </p>
            </div>

            <div className="dashboard-status-badge">
              <span className="status-dot"></span>
              ATM Network Online
            </div>

          </div>

          {/* =====================================
              SEARCH SECTION
          ====================================== */}
          <section className="atm-search-card">

            <div className="search-card-header">
              <div className="search-icon">
                <i className="bi bi-search"></i>
              </div>

              <div>
                <h2>Find Nearby ATMs</h2>

                <p>
                  Search using your current location or enter
                  an area manually.
                </p>
              </div>
            </div>

            <div className="search-controls">

              <div className="location-input-wrapper">

                <i className="bi bi-geo-alt"></i>

                <input
                  type="text"
                  placeholder="Enter city, area or location..."
                  value={searchLocation}
                  onChange={(e) =>
                    setSearchLocation(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchPlace();
                    }
                  }}
                />

              </div>

              <button
                className="search-button"
                onClick={searchPlace}
                disabled={loading}
              >
                <i className="bi bi-search"></i>

                {loading ? "Searching..." : "Search"}
              </button>

              <button
                className="location-button"
                onClick={getUserLocation}
                disabled={locationLoading}
              >
                <i className="bi bi-crosshair"></i>

                {locationLoading
                  ? "Locating..."
                  : "Use My Location"}
              </button>

            </div>

            <div className="search-options">

              <label>
                <i className="bi bi-broadcast"></i>

                Search radius
              </label>

              <select
                value={radius}
                onChange={handleRadiusChange}
              >
                <option value="1000">
                  1 km
                </option>

                <option value="2000">
                  2 km
                </option>

                <option value="3000">
                  3 km
                </option>

                <option value="5000">
                  5 km
                </option>

                <option value="10000">
                  10 km
                </option>
              </select>

            </div>

          </section>

          {/* Error */}
          {error && (
            <div className="dashboard-alert">

              <i className="bi bi-info-circle"></i>

              <span>{error}</span>

              <button
                onClick={() => setError("")}
              >
                ×
              </button>

            </div>
          )}

          {/* =====================================
              STATISTICS
          ====================================== */}
          <section className="atm-statistics">

            <div className="stat-card">

              <div className="stat-icon available-icon">
                <i className="bi bi-check-circle"></i>
              </div>

              <div>
                <span>Cash Available</span>
                <strong>{statusCounts.available}</strong>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon low-icon">
                <i className="bi bi-exclamation-circle"></i>
              </div>

              <div>
                <span>Low Cash</span>
                <strong>{statusCounts.lowCash}</strong>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon unavailable-icon">
                <i className="bi bi-x-circle"></i>
              </div>

              <div>
                <span>Unavailable</span>
                <strong>{statusCounts.unavailable}</strong>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon operational-icon">
                <i className="bi bi-activity"></i>
              </div>

              <div>
                <span>Operational</span>
                <strong>{statusCounts.operational}</strong>
              </div>

            </div>

          </section>

          {/* =====================================
              MAP + ATM LIST
          ====================================== */}
          <section className="dashboard-content-grid">

            {/* MAP */}
            <div className="map-card">

              <div className="map-header">

                <div>
                  <h2>
                    ATM Locations
                  </h2>

                  <p>
                    OpenStreetMap
                  </p>
                </div>

                <div className="map-live-indicator">
                  <span></span>
                  Live Map
                </div>

              </div>

              <div className="map-wrapper">

                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="atm-map"
                >

                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MapCenter position={mapCenter} />

                  {userLocation && (
                    <Circle
                      center={userLocation}
                      radius={150}
                      pathOptions={{
                        color: "#0d6efd",
                        fillColor: "#0d6efd",
                        fillOpacity: 0.15,
                      }}
                    />
                  )}

                  {userLocation && (
                    <Marker position={userLocation}>
                      <Popup>
                        <strong>Your Location</strong>
                        <br />
                        ATM search is centered here.
                      </Popup>
                    </Marker>
                  )}

                  {atms.map((atm) => (
                    <Marker
                      key={atm.id}
                      position={[
                        atm.latitude,
                        atm.longitude,
                      ]}
                      eventHandlers={{
                        click: () =>
                          handleATMSelect(atm),
                      }}
                    >

                      <Popup>

                        <div className="map-popup">

                          <h3>{atm.name}</h3>

                          <p>
                            {atm.address}
                          </p>

                          <div
                            className={`popup-status ${atm.color}`}
                          >
                            <span></span>
                            {atm.status}
                          </div>

                          <strong>
                            Cash: {atm.cash}
                          </strong>

                          <p>
                            {atm.distance.toFixed(2)} km away
                          </p>

                        </div>

                      </Popup>

                    </Marker>
                  ))}

                </MapContainer>

                {/* Map legend */}
                <div className="map-legend">

                  <div>
                    <span className="legend-dot green"></span>
                    Available
                  </div>

                  <div>
                    <span className="legend-dot orange"></span>
                    Low Cash
                  </div>

                  <div>
                    <span className="legend-dot red"></span>
                    Unavailable
                  </div>

                </div>

              </div>

            </div>

            {/* ATM LIST */}
            <div className="atm-list-card">

              <div className="atm-list-header">

                <div>
                  <h2>
                    Nearby ATMs
                  </h2>

                  <p>
                    {atms.length} ATM
                    {atms.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <i className="bi bi-three-dots"></i>

              </div>

              <div className="atm-list">

                {loading ? (
                  <div className="empty-state">

                    <div className="loading-spinner"></div>

                    <p>
                      Finding nearby ATMs...
                    </p>

                  </div>
                ) : atms.length === 0 ? (
                  <div className="empty-state">

                    <div className="empty-icon">
                      <i className="bi bi-bank"></i>
                    </div>

                    <h3>
                      Find an ATM
                    </h3>

                    <p>
                      Use your location or search for an
                      area to see nearby ATMs.
                    </p>

                  </div>
                ) : (
                  atms.slice(0, 10).map((atm) => (
                    <div
                      key={atm.id}
                      className={`atm-list-item ${
                        selectedATM?.id === atm.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleATMSelect(atm)}
                    >

                      <div className="atm-small-icon">
                        <i className="bi bi-credit-card"></i>
                      </div>

                      <div className="atm-info">

                        <h3>
                          {atm.name}
                        </h3>

                        <p>
                          <i className="bi bi-geo-alt"></i>

                          {atm.distance.toFixed(2)} km away
                        </p>

                        <div
                          className={`atm-status ${atm.color}`}
                        >
                          <span></span>

                          {atm.status}
                        </div>

                      </div>

                      <i className="bi bi-chevron-right atm-arrow"></i>

                    </div>
                  ))
                )}

              </div>

            </div>

          </section>

          {/* =====================================
              SELECTED ATM DETAILS
          ====================================== */}
          {selectedATM && (
            <section className="selected-atm-card">

              <div className="selected-atm-top">

                <div className="selected-atm-title">

                  <div className="selected-atm-icon">
                    <i className="bi bi-bank"></i>
                  </div>

                  <div>

                    <span>
                      SELECTED ATM
                    </span>

                    <h2>
                      {selectedATM.name}
                    </h2>

                  </div>

                </div>

                <button
                  className={`large-status ${selectedATM.color}`}
                >
                  <span></span>
                  {selectedATM.status}
                </button>

              </div>

              <div className="selected-atm-details">

                <div>
                  <span>
                    <i className="bi bi-geo-alt"></i>
                    Location
                  </span>

                  <strong>
                    {selectedATM.address}
                  </strong>
                </div>

                <div>
                  <span>
                    <i className="bi bi-signpost-2"></i>
                    Distance
                  </span>

                  <strong>
                    {selectedATM.distance.toFixed(2)} km
                  </strong>
                </div>

                <div>
                  <span>
                    <i className="bi bi-cash-stack"></i>
                    Cash Status
                  </span>

                  <strong>
                    {selectedATM.cash}
                  </strong>
                </div>

                <div>
                  <span>
                    <i className="bi bi-clock"></i>
                    Last Updated
                  </span>

                  <strong>
                    {selectedATM.lastUpdated}
                  </strong>
                </div>

              </div>

              <div className="prediction-placeholder">

                <div className="prediction-icon">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>

                <div>

                  <strong>
                    AI Cash Prediction
                  </strong>

                  <p>
                    Future ML predictions for cash
                    availability will appear here.
                  </p>

                </div>

                <span>
                  Coming Soon
                </span>

              </div>

            </section>
          )}

          {/* =====================================
              FUTURE ML SECTION
          ====================================== */}
          <section className="future-feature-card">

            <div className="future-feature-icon">
              <i className="bi bi-stars"></i>
            </div>

            <div>

              <span>
                COMING IN THE NEXT PHASE
              </span>

              <h2>
                Smart ATM Cash Prediction
              </h2>

              <p>
                ATMSmart will use historical withdrawal patterns,
                ATM location, time, day, holidays and other
                factors to predict future cash availability.
              </p>

            </div>

            <div className="future-feature-arrow">
              <i className="bi bi-arrow-right"></i>
            </div>

          </section>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="dashboard-footer">

        <div className="dashboard-container">

          <div>
            <strong>ATMSmart</strong>

            <span>
              Smart ATM availability prediction system
            </span>
          </div>

          <span>
            OpenStreetMap data © OpenStreetMap contributors
          </span>

        </div>

      </footer>

    </div>
  );
}

export default UserDashboard;