import './App.css';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import Draggable from './component/Draggable';
import { DraggablePathDrag } from './component/DraggablePathDrag';

function App() {
  const center = [-6.23363948370361, 106.8215857154487]
  // const center = [39.63563779557324, -104.99234676361085]
  return (
    <div>
      <MapContainer center={center} zoom={11} scrollWheelZoom={true} maxZoom={18} minZoom={2}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <Draggable />
          {/* <DraggablePathDrag /> */}
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default App;
