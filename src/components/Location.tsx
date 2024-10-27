import React, { useState, useEffect } from 'react';

interface LocationIQResponse {
  display_name: string;
}

interface Suggestion {
  lat: string;
  lon: string;
  display_name: string;
}

const Location = () => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [directions, setDirections] = useState('');

  const apiKey = 'pk.e461260bdeac51f783898d40a141096a';

  useEffect(() => {
    fetchCoordinates();
  }, []);

  const fetchCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const showPosition = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const response = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`);
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      const data: LocationIQResponse = await response.json();
      setAddress(data.display_name);

      const mapUrl = `https://maps.locationiq.com/v2/staticmap?key=${apiKey}&center=${lat},${lon}&zoom=14&size=800x600&format=png&markers=icon:large-red-cutout|${lat},${lon}`;
      document.getElementById("mapholder")!.innerHTML = `<img src="${mapUrl}" alt="Map showing your location">`;
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAddressSuggestions = async () => {
    const inputElement = document.getElementById("searchInput") as HTMLInputElement;
    const query = inputElement.value;
    if (query.length > 2) {
      try {
        const response = await fetch(`https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }
        const data: Suggestion[] = await response.json();
        setSuggestions(data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const showDirections = async (lat: string, lon: string, address: string) => {
    try {
      const userPosition = await getCurrentPosition();
      const userLat = (userPosition as GeolocationPosition).coords.latitude;
      const userLon = (userPosition as GeolocationPosition).coords.longitude;
      const directionsUrl = `https://maps.locationiq.com/v2/staticmap?key=${apiKey}&center=${lat},${lon}&zoom=14&size=800x600&format=png&markers=icon:large-red-cutout|${userLat},${userLon}|${lat},${lon}`;

      setDirections(`<h3>Directions to ${address}</h3><img src="${directionsUrl}" alt="Directions to ${address}">`);
    } catch (err) {
      setError(err.message);
    }
  };

  const getCurrentPosition = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const showError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setError('The request to get user location timed out.');
        break;
      default:
        setError('An unknown error occurred.');
    }
  };

  return (
    <div>
      <h2>LOCATION</h2>
      <div id="location">{address ? `Address: ${address}` : 'Loading location...'}</div>
      <div id="mapholder">Loading map...</div>
      {error && <p>Error: {error}</p>}
      <footer>
        <h2>Search Location</h2>
        <input type="text" id="searchInput" placeholder="Enter an address" onInput={fetchAddressSuggestions} />
        <div id="suggestions">
          {suggestions.map((item, index) => (
            <div key={index} className="suggestion-item" onClick={() => showDirections(item.lat, item.lon, item.display_name)}>
              {item.display_name}
            </div>
          ))}
        </div>
        <div id="directions" dangerouslySetInnerHTML={{ __html: directions }}></div>
      </footer>
    </div>
  );
};

export default Location;
