import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import Draggable from './component/Draggable';

function App() {
  const center = [-6.23363948370361, 106.8215857154487]
  return (
    <div>
      <MapContainer center={center} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Draggable />
      </MapContainer>
    </div>
  );
}

export default App;
