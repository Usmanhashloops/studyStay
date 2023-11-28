import React, { useEffect } from "react";

const GoogleMap = ({ latitude, longitude }) => {
  useEffect(() => {
    const initializeMap = () => {
      const mapElement = document.getElementById("map");

      // Check if the map element exists
      if (!mapElement) {
        console.error("Map element not found.");
        return;
      }

      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      };

      const map = new window.google.maps.Map(mapElement, mapOptions);

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: "Your Location",
      });
    };

    // Check if the Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      // If not, set up a listener for the 'script' event
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC7Jz78vSl5-mHKv4eBOy1fRhmoph6loMA&libraries=places`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", initializeMap);
      document.head.appendChild(script);
    }
  }, [latitude, longitude]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default GoogleMap;
