import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet.heat';
import L from 'leaflet';

const HeatmapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data && data.length > 0) {
      const heatLayer = L.heatLayer(data, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
      }).addTo(map);

      // Clean up the layer when the component is unmounted or data changes
      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [data, map]);

  return null;
};

export default HeatmapLayer;
