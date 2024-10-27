import React, { useState } from 'react';

interface Location {
  id: number;
  address: string;
}

const LocationCrud = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [address, setAddress] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const addLocation = () => {
    if (address.trim()) {
      setLocations([...locations, { id: Date.now(), address }]);
      setAddress('');
    }
  };

  const updateLocation = (id: number) => {
    setLocations(locations.map(loc => (loc.id === id ? { ...loc, address } : loc)));
    setAddress('');
    setEditId(null);
  };

  const deleteLocation = (id: number) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const startEdit = (location: Location) => {
    setAddress(location.address);
    setEditId(location.id);
  };

  return (
    <div>
      <h2>Location CRUD</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={editId ? () => updateLocation(editId) : addLocation}>
        {editId ? 'Update Location' : 'Add Location'}
      </button>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            {location.address}
            <button onClick={() => startEdit(location)}>Edit</button>
            <button onClick={() => deleteLocation(location.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationCrud;
