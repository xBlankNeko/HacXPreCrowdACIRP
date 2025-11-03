import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './icon'; // Fix for default marker icon
import HeatmapLayer from './HeatmapLayer';

// Component to handle map clicks
const MapClickHandler = ({ clickMode, setSafeZones, setThreat, setClickMode, onSimulate }) => {
  useMapEvents({
    click(e) {
      if (!clickMode) return;

      if (clickMode === 'addSafeZone') {
        setSafeZones(prev => [...prev, e.latlng]);
      }
      
      if (clickMode === 'addThreat') {
        setThreat(e.latlng);
        // Trigger the simulation immediately after placing the threat
        onSimulate(e.latlng);
      }
      // After a click, reset the mode.
      setClickMode(null); 
    },
  });
  return null;
}

const MapComponent = ({ 
  heatmapData, 
  safeZones, 
  setSafeZones, 
  threat, 
  setThreat, 
  clickMode, 
  setClickMode, 
  onSimulate 
}) => {
  const position = [1.291, 103.765]; // West Coast Park

  return (
    <MapContainer center={position} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <HeatmapLayer data={heatmapData} />

      <MapClickHandler 
        clickMode={clickMode}
        setSafeZones={setSafeZones}
        setThreat={setThreat}
        setClickMode={setClickMode}
        onSimulate={onSimulate}
      />

      {/* Display Safe Zone Markers */}
      {safeZones.map((pos, idx) => 
        <Marker key={`safezone-${idx}`} position={pos}>
          <Popup>Safe Zone {idx + 1}</Popup>
        </Marker>
      )}

      {/* Display Threat Marker */}
      {threat && (
        <Marker position={threat}>
          <Popup>Threat Location</Popup>
        </Marker>
      )}

    </MapContainer>
  );
};

export default MapComponent;
