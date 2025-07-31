import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Helper component to recenter map on location update
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15); // Zoom level 15
    }
  }, [position, map]);
  return null;
};

const LiveTracking = () => {
  const [currentPos, setCurrentPos] = useState(null);

  // Update location every 10 seconds
  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPos({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        { enableHighAccuracy: true }
      );
    };

    updatePosition(); // initial position fetch
    const interval = setInterval(updatePosition, 10000); // every 10 sec

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="w-full h-full" style={{ height: '100%' }}>
      <MapContainer
        center={currentPos || [22.0, 88.0]}
        zoom={13}
        className="w-full h-full z-0"
        zoomControl={false} // disable default zoom control
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentPos && (
          <>
            <Marker position={currentPos} />
            <MapUpdater position={currentPos} />
          </>
        )}
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
