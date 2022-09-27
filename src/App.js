import './App.css';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import Draggable from './component/Draggable';
import PolygonTry from './component/PolygonTry';
import GetLatlng from './component/GetLatlng';
import MouseCoordinates from './component/GetMouseLatlng';

function App() {
  const center = [-6.23363948370361, 106.8215857154487]
  return (
    <div>
      <MapContainer center={center} zoom={11} scrollWheelZoom={true} maxZoom={18} minZoom={2}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <MouseCoordinates/>
          <Draggable />
          <GetLatlng/>
        </LayersControl>
        <PolygonTry />
      </MapContainer>
    </div>
  );
}

export default App;
