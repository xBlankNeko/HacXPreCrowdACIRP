import React, { useState } from 'react';
import MapComponent from './MapComponent';
import Controls from './Controls';

// Let's start with some generated baseline footfall data.
// In a real app, you would fetch this from your backend.
const generateInitialData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push([
      1.291 + (Math.random() - 0.5) * 0.01,  // latitude
      103.765 + (Math.random() - 0.5) * 0.02, // longitude
      Math.random() * 0.8 // intensity
    ]);
  }
  return data;
};


function App() {
  const [heatmapData, setHeatmapData] = useState(generateInitialData());
  const [safeZones, setSafeZones] = useState([]);
  const [threat, setThreat] = useState(null);
  // 'addSafeZone' or 'addThreat'
  const [clickMode, setClickMode] = useState(null); 

  // This function simulates the API call to your backend
  const handleSimulateThreat = (newThreat) => {
    console.log("Simulating threat at:", newThreat);
    console.log("With safe zones at:", safeZones);
    
    // --- Backend Logic (simulated here) ---
    // Your backend would take the heatmapData, newThreat, and safeZones
    // and calculate the new population distribution.
    // The logic: people move away from the threat and towards the nearest safe zone.
    const newHeatmapData = heatmapData.map(([lat, lng, intensity]) => {
      const threatDistance = Math.hypot(lat - newThreat.lat, lng - newThreat.lng);
      
      let nearestSafeZoneDist = Infinity;
      if (safeZones.length > 0) {
        safeZones.forEach(sz => {
          const dist = Math.hypot(lat - sz.lat, lng - sz.lng);
          if (dist < nearestSafeZoneDist) {
            nearestSafeZoneDist = dist;
          }
        });
      }

      // Simple model: new position is a move away from threat and towards safe zone
      // A real model would be much more complex, this is just for front-end visualization.
      const moveFactor = 0.005 / (threatDistance + 0.001); // Move more if closer to threat
      const newLat = lat - (lat - newThreat.lat) * moveFactor + (safeZones.length > 0 ? (safeZones[0].lat - lat) * (moveFactor / nearestSafeZoneDist) * 0.001 : 0);
      const newLng = lng - (lng - newThreat.lng) * moveFactor + (safeZones.length > 0 ? (safeZones[0].lng - lng) * (moveFactor / nearestSafeZoneDist) * 0.001 : 0);
      
      return [newLat, newLng, intensity];
    });
    // --- End of Backend Logic ---

    // Update the frontend with the new data from the backend
    setHeatmapData(newHeatmapData);
  };


  return (
    <div className="App">
      <Controls 
        setClickMode={setClickMode} 
        currentMode={clickMode}
      />
      <MapComponent
        heatmapData={heatmapData}
        safeZones={safeZones}
        setSafeZones={setSafeZones}
        threat={threat}
        setThreat={setThreat}
        clickMode={clickMode}
        setClickMode={setClickMode}
        onSimulate={handleSimulateThreat}
      />
    </div>
  );
}

export default App;
