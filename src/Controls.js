import React from 'react';

const controlPanelStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '5px',
  zIndex: 1000,
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
};

const buttonStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer'
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#007bff',
  color: 'white',
  borderColor: '#007bff',
};

const Controls = ({ setClickMode, currentMode }) => {
  return (
    <div style={controlPanelStyle}>
      <h3>Crowd Simulation</h3>
      <p>Click a button, then click on the map.</p>
      
      <button 
        onClick={() => setClickMode('addSafeZone')}
        style={currentMode === 'addSafeZone' ? activeButtonStyle : buttonStyle}
      >
        Add Safe Zone
      </button>

      <button 
        onClick={() => setClickMode('addThreat')}
        style={currentMode === 'addThreat' ? activeButtonStyle : buttonStyle}
      >
        Inject Threat
      </button>
    </div>
  );
};

export default Controls;
