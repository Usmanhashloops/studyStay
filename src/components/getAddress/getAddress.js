import React, { useState, useEffect } from "react";
import axios from "axios";

const GeocodeAddress = ({ latitude, longitude, apiKey }) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAddress() {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);

        if (response.data.status === "OK") {
          // Extract the first result's formatted address
          const result = response.data.results[0];
          setAddress(result.formatted_address);
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        setAddress("Error fetching address");
      } finally {
        setLoading(false);
      }
    }

    getAddress();
  }, [latitude, longitude, apiKey]);

  return <div>{loading ? <p>Loading...</p> : <p>{address}</p>}</div>;
};

export default GeocodeAddress;
