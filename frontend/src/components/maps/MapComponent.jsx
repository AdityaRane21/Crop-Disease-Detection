import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ data }) => {
  return (
    <div className="mt-6 h-[500px]">
      <MapContainer center={[23.0, 78.0]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((point, idx) => (
          <Marker
            key={idx}
            position={[point.lat, point.lon]}
          >
            <Popup>
              <strong>{point.filename}</strong><br />
              Status: <span style={{ color: point.status === 'Diseased' ? 'red' : 'green' }}>
                {point.status}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
